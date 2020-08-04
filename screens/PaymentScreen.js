import React, { Component } from "react";


import {
  ScrollView,
  TextInput,
  Text as TextNative
} from "react-native";

import {
  Screen,
  Subtitle,
  View,
  Row,
  Divider,
  Icon,
  NavigationBar,
  Button,
  TouchableOpacity,
  Caption,
  Text
} from "@shoutem/ui";

class PaymentScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Screen styleName="paper">
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>Payment method</TextNative>
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
              <Subtitle>Basic information</Subtitle>
              <TextInput
                style={styles.addressInput}
                placeholder={"Name on card"}
              />
              <TextInput
                style={styles.addressInput}
                placeholder={"Card number"}
              />
              <TextInput
                style={styles.addressInput}
                placeholder={"Expiration date (MM/YY)"}
              />
              <TextInput
                style={styles.addressInput}
                placeholder={"CVC"}
              />
            </View>
          </Row>
          <Divider styleName="line" />
          <Divider styleName="section-header">
            <Caption>Billing address</Caption>
          </Divider>
          <View>
            <Row styleName="small">
              <Icon name="radiobutton-on" />
              <View styleName="vertical">
                <Subtitle>Juan Carlos Perez</Subtitle>
                <Text numberOfLines={1}>8641 79th St, Jamaica, NY 11421</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ChooseAddress")}
              >
                <Caption style={styles.actionCaption}>CHANGE</Caption>
              </TouchableOpacity>
            </Row>
          </View>
        </ScrollView>
        <Divider styleName="line" />
        <View styleName="horizontal">
          <Button
            styleName="full-width secondary"
            style={styles.saveButton}
            onPress={() => this.props.navigation.navigate("ChoosePaymentMethod")}
          >
            <Text>SAVE</Text>
          </Button>
        </View>
      </Screen >
    );
  }
}

export default PaymentScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  saveButton: {
    backgroundColor: "#FF5801",
    borderColor: "#FF5801"
  },
  addressInput: {
    width: 280,
    height: 50
  },
  addressCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  navigatorBarView: {
    flexDirection: "row"
  },
  navigatorBarText: {
    flexWrap: "wrap",
    textAlign: "center"
  },
  actionCaption: {
    color: "#FF5801"
  }
};
