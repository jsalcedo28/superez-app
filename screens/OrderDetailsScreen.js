import React, { Component } from "react";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

import {
  ScrollView,
  TextInput,
  Text as TextNative
} from "react-native";

import {
  Screen,
  ListView,
  Subtitle,
  View,
  Row,
  Divider,
  Image,
  Icon,
  NavigationBar,
  Caption,
  Text,
  TouchableOpacity
} from "@shoutem/ui";

class OrderDetailsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(product) {
    const order = this.props.navigation.getParam("order", null);

    const lastProduct = order.products.slice(-1)[0];

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate("ProductDetails", {
        product: product
      })}>
        <Row>
          <Image
            style={styles.orderProductImage}
            styleName="medium-wide"
            source={{ uri: product.image_url }}
          />
          <View styleName="horizontal v-center space-between">
            <View styleName="vertical">
              <Subtitle>{product.product_name}</Subtitle>
              <Text>{product.size}</Text>
              <View styleName="horizontal v-center space-between">
                {
                  !product.discount ? (<Subtitle styleName="md-gutter-right">
                    ${product.retail_price.toFixed(2)}
                  </Subtitle>) : (<View styleName="horizontal">
                    <Subtitle styleName="md-gutter-right">
                      ${Number(product.price - product.discount).toFixed(2)}
                    </Subtitle>
                    <Caption styleName="line-through">
                      ${product.retail_price.toFixed(2)}
                    </Caption>
                  </View>)
                }
              </View>
              <Divider />
            </View>
            <View styleName="horizontal">
              <Subtitle style={styles.quantitySubtitle}>{product.quantity}</Subtitle>
            </View>
          </View>
        </Row>
        {
          product == lastProduct
            ? (<View />)
            : (<Divider styleName="line" />)
        }
      </TouchableOpacity>
    );
  }

  render() {
    const order = this.props.navigation.getParam("order", null);

    const subTotal = order.products.length > 0
      ? order.products.map(c => c.discount
        ? (c.price - c.discount) * c.quantity
        : c.price * c.quantity)
        .reduce((a, b) => a + b)
        .toFixed(2)
      : 0.00;

    const saved = order.products.length > 0
      ? order.products.map(c => c.discount
        ? c.discount * c.quantity
        : 0.00)
        .reduce((a, b) => a + b)
        .toFixed(2)
      : 0.00;

    const deliveryFee = Number(0.00).toFixed(2);

    const taxesFee = Number(2.00).toFixed(2);

    return (
      <Screen>
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>Order details</TextNative>
          </View>}
          styleName="inline"
          leftComponent={<Icon
            color='#FF5801'
            onPress={() => this.props.navigation.goBack()}
            name="back"
          />}
        />
        <Divider styleName="line" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Row>
            <View styleName="vertical">
              <View
                styleName="horizontal v-center space-between">
                <View styleName='horizontal v-center'>
                  <MaterialIconsIcon
                    style={styles.icon}
                    size={24}
                    name='info-outline'
                  />
                  <Subtitle>Basic information</Subtitle>
                </View>
              </View>
              <Divider styleName="line" />
              <View styleName="horizontal v-center space-between">
                <Text>Order date</Text>
                <Text>{order.order_date}</Text>
              </View>
              <View styleName="horizontal v-center space-between">
                <Text>Order #</Text>
                <Text>{order.order_no}</Text>
              </View>
              <View styleName="horizontal v-center space-between">
                <Text>Order total</Text>
                <Text>${Number(subTotal) + Number(deliveryFee) + Number(taxesFee)} ({order.products.length} items)</Text>
              </View>
            </View>
          </Row>
          <Divider />
          <Row>
            <View styleName="vertical">
              <View styleName="horizontal v-center space-between">
                <View styleName='horizontal v-center'>
                  <MaterialIconsIcon
                    style={styles.icon}
                    size={24}
                    name='local-shipping'
                  />
                  <Subtitle>Shipment details</Subtitle>
                </View>
              </View>
              <Divider styleName="line" />
              <View styleName="horizontal v-center space-between">
                <View styleName="horizontal">
                  {
                    order.status == "Expected Delivery" || order.status == "Available to Pickup"
                      ? (<Subtitle
                        style={styles.statusOrangeSubtitle}
                        styleName="md-gutter-right"
                      >
                        {order.status}
                      </Subtitle>)
                      : order.status == "Cancelled"
                        ? (<Subtitle
                          style={styles.statusRedSubtitle}
                          styleName="md-gutter-right"
                        >
                          {order.status}
                        </Subtitle>)
                        : order.status == "Delivered" || order.status == "Delivered on Pickup"
                          ? (<Subtitle
                            style={styles.statusGreenSubtitle}
                            styleName="md-gutter-right"
                          >
                            {order.status}
                          </Subtitle>)
                          : (<View></View>)
                  }
                </View>
              </View>
              {
                order.status == "Available to Pickup"
                  ? (<View></View>)
                  : (<Caption>{order.delivery_date}</Caption>)
              }
              <ListView
                showsVerticalScrollIndicator={false}
                data={order.products}
                renderRow={this.renderRow}
              />
            </View>
          </Row>
          <Divider />
          <Row>
            <View styleName="vertical">
              <View styleName="horizontal v-center space-between">
                <View styleName='horizontal v-center'>
                  <FontAwesomeIcon
                    style={styles.icon}
                    size={20}
                    name='address-card-o'
                  />
                  {
                    order.status == "Available to Pickup"
                      || order.status == "Delivered on Pickup"
                      ? (<Subtitle>Pickup address</Subtitle>)
                      : (<Subtitle>Delivery address</Subtitle>)
                  }
                </View>
              </View>
              <Divider styleName="line" />
              {
                order.status == "Available to Pickup"
                  || order.status == "Delivered on Pickup"
                  ? (<View>
                    <Text>{order.pickup_address}</Text>
                  </View>)
                  : (
                    <View>
                      <Text>Eddy Fidel</Text>
                      <Text>24 Cortelyou Road, Brooklyn, NY 11421</Text>
                      <Divider />
                      <Text>(999) 999-9999</Text>
                    </View>
                  )
              }
            </View>
          </Row>
          <Divider />
          <Row>
            <View styleName="vertical">
              <View styleName="horizontal v-center space-between">
                <View styleName='horizontal v-center'>
                  <MaterialIconsIcon
                    style={styles.icon}
                    size={26}
                    name='payment'
                  />
                  <Subtitle>Payment method</Subtitle>
                </View>
              </View>
              <Divider styleName="line" />
              <Text>Eddy Fidel</Text>
              <View styleName="horizontal v-center">
                <FontAwesomeIcon style={styles.icon} size={18} name='cc-mastercard' />
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
                <View styleName='horizontal v-center'>
                  <SimpleLineIconsIcon
                    style={styles.icon}
                    size={20}
                    name='note'
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
                <View styleName='horizontal v-center'>
                  <MaterialCommunityIconsIcon
                    style={styles.icon}
                    size={26}
                    name='cash-usd'
                  />
                  <Subtitle>Order summary</Subtitle>
                </View>
              </View>
              <Divider styleName="line" />
              <View styleName="horizontal v-center space-between">
                <Text>Delivery</Text>
                <Text>${deliveryFee}</Text>
              </View>
              <View styleName="horizontal v-center space-between">
                <Text>Taxes</Text>
                <Text>${taxesFee}</Text>
              </View>
              <Divider />
              <Divider styleName="line" />
              <View styleName="horizontal v-center space-between">
                <Subtitle>Total</Subtitle>
                <Subtitle>${Number(subTotal) + Number(deliveryFee) + Number(taxesFee)}</Subtitle>
              </View>
              <View styleName="horizontal v-center space-between">
                <Subtitle style={styles.offerCaption}>You saved</Subtitle>
                <Subtitle style={styles.offerCaption}>${saved}</Subtitle>
              </View>
            </View>
          </Row>
        </ScrollView>
      </Screen>
    );
  }
}

export default OrderDetailsScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  orderProductCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  orderProductImage: {
    width: 64,
    height: 64
  },
  placeOrderButton: {
    backgroundColor: "#FF5801",
    borderColor: "#FF5801"
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
  orderProductList: {
    marginBottom: 13
  },
  navigatorBarView: {
    flexDirection: "row"
  },
  navigatorBarText: {
    flexWrap: "wrap",
    textAlign: "center"
  },
  statusRedSubtitle: {
    color: "red"
  },
  statusOrangeSubtitle: {
    color: "orange"
  },
  statusGreenSubtitle: {
    color: "green"
  }
};
