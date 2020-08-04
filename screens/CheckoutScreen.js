import React, { Component } from "react";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

import {
  ScrollView,
  ActivityIndicator,
  TextInput,
  Text as TextNative
} from "react-native";

import {
  Screen,
  ListView,
  Subtitle,
  View,
  Button,
  Row,
  Divider,
  Image,
  Icon,
  NavigationBar,
  Caption,
  Text
} from "@shoutem/ui";

import BTClient from "react-native-braintree-xplat";

class CheckoutScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.state = {
      cartItems: [],
      cartItemsCount: 0,
      animating: true,
      token: null
    };
  }

  componentWillMount() {
    this.setState({ animating: true });

    fetch("https://api.myjson.com/bins/15daas")
      .then(res => res.json())
      .then(data => {
        this.setState({
          cartItems: data,
          cartItemsCount: data.length,
          animating: false
        });
      });
  }

  renderRow(cartItem) {
    return (
      <View style={styles.cartItemCenter}>
        <Image
          style={styles.cartItemImage}
          styleName="medium-wide"
          source={{ uri: cartItem.image_url }}
        />
      </View>
    );
  }

  handleCardPayPress = async () => {
    const paymentsTokenResponse = await fetch(
      "https://api.getsuperez.com/payments/token"
    );

    if (paymentsTokenResponse.ok) {
      const result = await paymentsTokenResponse.json();

      if (result && result.token) {
        BTClient.setup(result.token);

        const options = {
          bgColor: "#FFF",
          tintColor: "orange",
          callToActionText: "Save",
          threeDSecure: {
            amount: 10.0
          }
        };

        const nonce = await BTClient.showPaymentViewController(options);

        const paymentsCheckoutResponse = await fetch(
          "https://api.getsuperez.com/payments/checkout",
          {
            method: "POST",
            body: JSON.stringify({
              payment_method_nonce: nonce,
              amount: options.threeDSecure.amount
            }),
            headers: new Headers({
              "Content-Type": "application/json"
            })
          }
        );

        if (paymentsCheckoutResponse.ok) {
          await paymentsCheckoutResponse.json();

          this.props.navigation.navigate("OrderConfirmation");
        }
      }
    }
  };

  render() {
    const { cartItems, cartItemsCount, animating } = this.state;

    const saved =
      cartItems.length > 0
        ? cartItems
          .map(c => (c.discount ? c.discount * c.quantity : 0.0))
          .reduce((a, b) => a + b)
          .toFixed(2)
        : 0.0;

    const deliveryPickupFeePrice =
      this.props.navigation.getParam("deliveryPickupFeePrice", null) ||
      Number(0.0).toFixed(2);
    const deliveryPickupFeeSchedule = this.props.navigation.getParam(
      "deliveryPickupFeeSchedule",
      null
    );
    const deliveryPickupFeeType =
      this.props.navigation.getParam("deliveryPickupFeeType", null) || "";

    const taxesFee = Number(2.0).toFixed(2);

    const subTotal = this.props.navigation.getParam("totalOrder", null)
      ? (
        this.props.navigation.getParam("totalOrder", null) -
          deliveryPickupFeePrice -
          taxesFee
      ).toFixed(2)
      : cartItems.length > 0
        ? cartItems
          .map(
            c =>
              c.discount
                ? (c.price - c.discount) * c.quantity
                : c.price * c.quantity
          )
          .reduce((a, b) => a + b)
          .toFixed(2)
        : 0.0;

    const storeName =
      this.props.navigation.getParam("storeName", null) || "Bravo Supermarket";
    const storePhoneNumber =
      this.props.navigation.getParam("storePhoneNumber", null) ||
      "+1 718-731-6280";
    const totalOrder =
      this.props.navigation.getParam("totalOrder", null) ||
      Number(subTotal) + Number(deliveryPickupFeePrice) + Number(taxesFee);

    return (
      <Screen>
        <NavigationBar
          centerComponent={
            <View style={styles.navigatorBarView}>
              <TextNative style={styles.navigatorBarText}>Checkout</TextNative>
            </View>
          }
          styleName="inline"
          leftComponent={
            <Icon
              color="#FF5801"
              onPress={() => this.props.navigation.goBack()}
              name="back"
            />
          }
        />
        <Divider styleName="line" />
        {animating ? (
          <View style={styles.container}>
            <ActivityIndicator
              size="large"
              animating={animating}
              color="#FF5801"
            />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Row>
              <View styleName="vertical">
                <View
                  styleName="horizontal v-center space-between"
                  style={styles.cartItemList}
                >
                  <View styleName="horizontal v-center">
                    <MaterialIconsIcon
                      style={styles.icon}
                      size={24}
                      name="info-outline"
                    />
                    <Subtitle>Basic information</Subtitle>
                  </View>
                </View>
                <View styleName="horizontal v-center space-between">
                  <Text>Store</Text>
                  <Text>{storeName}</Text>
                </View>
                <View styleName="horizontal v-center space-between">
                  <Text>Phone number</Text>
                  <Text>{storePhoneNumber}</Text>
                </View>
              </View>
            </Row>
            <Divider />
            <Row>
              <View styleName="vertical">
                <View styleName="horizontal v-center space-between">
                  <View styleName="horizontal v-center">
                    <EntypoIcon
                      style={styles.icon}
                      size={20}
                      name="shopping-bag"
                    />
                    <Subtitle>{cartItemsCount} Items</Subtitle>
                  </View>
                  <Button
                    styleName="tight"
                    onPress={() =>
                      this.props.navigation.navigate("EzSmart", {
                        storeName: storeName,
                        storePhoneNumber: storePhoneNumber,
                        totalOrder: totalOrder
                      })
                    }
                  >
                    <Caption style={styles.actionCaption}>TRY EZ SMART</Caption>
                  </Button>
                </View>
                <Divider styleName="line" />
                <ListView
                  horizontal={true}
                  data={cartItems}
                  renderRow={this.renderRow}
                />
              </View>
            </Row>
            <Divider />
            <Row>
              <View styleName="vertical">
                <View styleName="horizontal v-center space-between">
                  <View styleName="horizontal v-center">
                    <EntypoIcon
                      style={styles.icon}
                      size={20}
                      name="time-slot"
                    />
                    <Subtitle>
                      {deliveryPickupFeeType == "delivery"
                        ? "Delivery time"
                        : deliveryPickupFeeType == "pickup"
                          ? "Pickup time"
                          : "Delivery or Pickup time"}
                    </Subtitle>
                  </View>
                  <Button
                    styleName="tight clear"
                    onPress={() => this.props.navigation.navigate("ChooseTime")}
                  >
                    <Caption style={styles.actionCaption}>CHOOSE TIME</Caption>
                  </Button>
                </View>
                {deliveryPickupFeeSchedule && deliveryPickupFeePrice ? (
                  <View>
                    <Divider styleName="line" />
                    <View styleName="horizontal v-center space-between">
                      <Text>{deliveryPickupFeeSchedule}</Text>
                      <Text>${deliveryPickupFeePrice}</Text>
                    </View>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </Row>
            <Divider />
            <Row>
              <View styleName="vertical">
                <View styleName="horizontal v-center space-between">
                  <View styleName="horizontal v-center">
                    <FontAwesomeIcon
                      style={styles.icon}
                      size={20}
                      name="address-card-o"
                    />
                    <Subtitle>
                      {deliveryPickupFeeType == "delivery"
                        ? "Delivery address"
                        : deliveryPickupFeeType == "pickup"
                          ? "Pickup address"
                          : "Delivery or Pickup address"}
                    </Subtitle>
                  </View>
                  <Button
                    styleName="tight clear"
                    onPress={() =>
                      this.props.navigation.navigate("ChooseAddress")
                    }
                  >
                    <Caption style={styles.actionCaption}>CHANGE</Caption>
                  </Button>
                </View>
                {deliveryPickupFeeType == "delivery" ? (
                  <View>
                    <Divider styleName="line" />
                    <Text>Eddy Fidel</Text>
                    <Text>24 Cortelyou Road, Brooklyn, NY 11421</Text>
                    <Divider />
                    <Text>(999) 999-9999</Text>
                  </View>
                ) : deliveryPickupFeeType == "pickup" ? (
                  <View>
                    <Divider styleName="line" />
                    <Text>24 Cortelyou Road, Brooklyn, NY 11421</Text>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </Row>
            <Divider />
            <Row>
              <View styleName="vertical">
                <View styleName="horizontal v-center space-between">
                  <View styleName="horizontal v-center">
                    <MaterialIconsIcon
                      style={styles.icon}
                      size={26}
                      name="payment"
                    />
                    <Subtitle>Payment method</Subtitle>
                  </View>
                  <Button
                    styleName="tight clear"
                    onPress={() =>
                      this.props.navigation.navigate("ChoosePaymentMethod")
                    }
                  >
                    <Caption style={styles.actionCaption}>CHANGE</Caption>
                  </Button>
                </View>
                <Divider styleName="line" />
                <Text>Eddy Fidel</Text>
                <View styleName="horizontal v-center">
                  <FontAwesomeIcon
                    style={styles.icon}
                    size={18}
                    name="cc-mastercard"
                  />
                  <Text>MasterCard ending in 8230</Text>
                </View>
                <Divider />
                <Text>Billing address</Text>
                <Text>24 Cortelyou Road, Brooklyn, NY 11421</Text>
              </View>
            </Row>
            <Divider />
            <Row>
              <View styleName="vertical">
                <View styleName="horizontal v-center space-between">
                  <View styleName="horizontal v-center">
                    <SimpleLineIconsIcon
                      style={styles.icon}
                      size={20}
                      name="note"
                    />
                    <Subtitle>Instructions</Subtitle>
                  </View>
                </View>
                <Divider styleName="line" />
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  maxLength={200}
                  placeholder="Add notes for this order"
                />
                <Divider />
              </View>
            </Row>
            <Divider />
            <Row>
              <View styleName="vertical">
                <View styleName="horizontal v-center space-between">
                  <View styleName="horizontal v-center">
                    <MaterialCommunityIconsIcon
                      style={styles.icon}
                      size={26}
                      name="cash-usd"
                    />
                    <Subtitle>Subtotal</Subtitle>
                  </View>
                  <Subtitle>${subTotal}</Subtitle>
                </View>
                <Divider styleName="line" />
                <View styleName="horizontal v-center space-between">
                  <Text>Delivery</Text>
                  <Text>${deliveryPickupFeePrice}</Text>
                </View>
                <View styleName="horizontal v-center space-between">
                  <Text>Taxes</Text>
                  <Text>${taxesFee}</Text>
                </View>
                <Divider />
                <Divider styleName="line" />
                <View styleName="horizontal v-center space-between">
                  <Subtitle>Total</Subtitle>
                  <Subtitle>${totalOrder}</Subtitle>
                </View>
                <View styleName="horizontal v-center space-between">
                  <Subtitle style={styles.offerCaption}>You saved</Subtitle>
                  <Subtitle style={styles.offerCaption}>${saved}</Subtitle>
                </View>
              </View>
            </Row>
          </ScrollView>
        )}
        <Divider styleName="line" />
        <View styleName="horizontal">
          <Button
            styleName="full-width secondary"
            style={styles.placeOrderButton}
            onPress={this.handleCardPayPress}
            // onPress={() => this.props.navigation.navigate('OrderConfirmation')}
          >
            <Text>PLACE ORDER</Text>
          </Button>
        </View>
      </Screen>
    );
  }
}

export default CheckoutScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  cartItemCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  cartItemImage: {
    width: 48,
    height: 48
  },
  placeOrderButton: {
    backgroundColor: "#FF5801",
    borderColor: "#FF5801"
  },
  cartItemsBackground: {
    backgroundColor: "#FFF",
    borderColor: "#FFF"
  },
  offerCaption: {
    color: "red"
  },
  actionCaption: {
    color: "#FF5801"
  },
  icon: {
    marginRight: 6
  },
  cartItemList: {
    marginBottom: 13
  },
  navigatorBarView: {
    flexDirection: "row"
  },
  navigatorBarText: {
    flexWrap: "wrap",
    textAlign: "center"
  }
};
