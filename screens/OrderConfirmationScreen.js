import React, { Component } from "react";

import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  ScrollView,
  Text as TextNative,
  Dimensions
} from "react-native";

import {
  Screen,
  View,
  Icon,
  Divider,
  Row,
  Button,
  NavigationBar,
  Text,
  Title
} from "@shoutem/ui";

var { width } = Dimensions.get("window");

class OrderConfirmationScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Screen styleName="paper">
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>Order confirmation</TextNative>
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
            <View style={styles.itemCenter}>
              <MaterialCommunityIconsIcon
                color='#4cb928'
                size={112} name='check-circle'
              />
            </View>
          </Row>
          <Row>
            <View styleName="vertical h-center">
              <Title>Thank you for your order</Title>
              <Text style={styles.orderConfirmationText}>Your order was placed successfully. We received your order and will begin processing it soon. You will be receiving updates of your order.</Text>
            </View>
          </Row>
          <Row>
            <View styleName="vertical h-center">
              <Button
                style={styles.continueButton}
                styleName="secondary"
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Text>CONTINUE SHOPPING</Text>
              </Button>
            </View>
          </Row>
        </ScrollView>
      </Screen>
    );
  }
}

export default OrderConfirmationScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  quantitySubtitle: {
    marginBottom: 5
  },
  image: {
    width: 224,
    height: 224
  },
  itemCenter: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.375
  },
  navigatorBarView: {
    flexDirection: "row"
  },
  navigatorBarText: {
    flexWrap: "wrap",
    textAlign: "center"
  },
  priceAndDiscount: {
    marginBottom: 5
  },
  continueButton: {
    width: 280,
    height: 50,
    backgroundColor: "#FF5801",
    borderColor: "#FF5801",
    marginTop: 10
  },
  orderConfirmationText: {
    flexWrap: "wrap",
    textAlign: "center"
  }
};
