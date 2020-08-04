import React, { Component } from "react";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";

import {
  Text as TextNative
} from "react-native";

import {
  Screen,
  NavigationBar,
  View,
  Icon,
  Caption,
  Row,
  Text,
  Subtitle,
  TouchableOpacity,
  Button,
  Divider as ShoutemDivider
} from "@shoutem/ui";

class ChoosePaymentMethodScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Screen>
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>Payment Methods</TextNative>
          </View>}
          styleName="inline"
          leftComponent={<Icon
            color='#FF5801'
            onPress={() => this.props.navigation.goBack()}
            name="back"
          />}
        />
        <ShoutemDivider styleName="section-header">
          <Caption>Choose a payment method below</Caption>
        </ShoutemDivider>
        <View>
          <Row styleName="small">
            <Icon name="radiobutton-on" />
            <View styleName="vertical">
              <Subtitle>Juan Carlos Perez</Subtitle>
              <Text numberOfLines={1}>
                <FontAwesomeIcon
                  style={styles.icon}
                  size={18}
                  name='cc-mastercard' /> MasterCard ending in 8230</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Payment")}
            >
              <FeatherIcon
                style={styles.icon}
                size={24}
                color='#EE632C'
                name='edit'
              />
            </TouchableOpacity>
            <FeatherIcon
              style={styles.icon}
              size={24}
              color='#EE632C'
              name='trash-2'
            />
          </Row>
        </View>
        <ShoutemDivider styleName="line" />
        <View>
          <Row styleName="small">
            <Icon name="radiobutton-off" />
            <View styleName="vertical">
              <Subtitle>Juan Carlos Perez</Subtitle>
              <Text numberOfLines={1}>
                <FontAwesomeIcon
                  style={styles.icon}
                  size={18} name='cc-visa' /> Visa ending in 1240</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Payment")}
            >
              <FeatherIcon
                style={styles.icon}
                size={24}
                color='#EE632C'
                name='edit'
              />
            </TouchableOpacity>
            <FeatherIcon
              style={styles.icon}
              size={24}
              color='#EE632C'
              name='trash-2'
            />
          </Row>
        </View>
        <ShoutemDivider styleName="line" />
        <View styleName="horizontal">
          <Button
            styleName="full-width secondary"
            style={styles.addPaymentButton}
            onPress={() => this.props.navigation.navigate("Payment")}
          >
            <Icon
              name="plus-button"
              size={15}
              color="white"
            />
            <Text>ADD NEW PAYMENT METHOD</Text>
          </Button>
        </View>
      </Screen>
    );
  }
}

export default ChoosePaymentMethodScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  statusRedSubtitle: {
    color: "red"
  },
  statusOrangeSubtitle: {
    color: "orange"
  },
  statusGreenSubtitle: {
    color: "green"
  },
  navigatorBarView: {
    flexDirection: "row"
  },
  navigatorBarText: {
    flexWrap: "wrap"
  },
  icon: {
    marginRight: 6
  },
  addPaymentButton: {
    backgroundColor: "#FF5801",
    borderColor: "#FF5801"
  },
};
