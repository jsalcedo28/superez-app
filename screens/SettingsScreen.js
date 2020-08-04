import React, { Component } from "react";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import EntypoIcon from "react-native-vector-icons/Entypo";

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
  Divider as ShoutemDivider
} from "@shoutem/ui";

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Screen>
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>Settings</TextNative>
          </View>}
          styleName="inline"
          leftComponent={<Icon
            color='#FF5801'
            onPress={() => this.props.navigation.goBack()}
            name="back"
          />}
        />
        <ShoutemDivider styleName="section-header">
          <Caption>Your user settings</Caption>
        </ShoutemDivider>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("AccountInfo")}
        >
          <View>
            <Row styleName="small">
              <FontAwesomeIcon
                style={styles.icon}
                size={36}
                color='#EE632C'
                name='address-card-o'
              />
              <View styleName="vertical">
                <Subtitle>Account Information</Subtitle>
                <Text numberOfLines={1}>Your name, email, phone number</Text>
              </View>
              <Icon styleName="disclosure" name="right-arrow" />
            </Row>
          </View>
        </TouchableOpacity>
        <ShoutemDivider styleName="line" />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("ChooseAddress")}
        >
          <View>
            <Row styleName="small">
              <EntypoIcon
                style={styles.icon}
                size={36}
                color='#EE632C'
                name='location'
              />
              <View styleName="vertical">
                <Subtitle>My Addresses</Subtitle>
                <Text numberOfLines={1}>All your addresses go here</Text>
              </View>
              <Icon styleName="disclosure" name="right-arrow" />
            </Row>
          </View>
        </TouchableOpacity>
        <ShoutemDivider styleName="line" />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Notifications")}
        >
          <View>
            <Row styleName="small">
              <FontAwesomeIcon
                style={styles.icon}
                size={36}
                color='#EE632C'
                name='bell-o'
              />
              <View styleName="vertical">
                <Subtitle>Notifications</Subtitle>
                <Text numberOfLines={1}>Your notification settings</Text>
              </View>
              <Icon styleName="disclosure" name="right-arrow" />
            </Row>
          </View>
        </TouchableOpacity>
        <ShoutemDivider styleName="line" />
        <ShoutemDivider styleName="line" />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("ChoosePaymentMethod")}
        >
          <View>
            <Row styleName="small">
              <FontAwesomeIcon
                style={styles.icon}
                size={36}
                color='#EE632C'
                name='money'
              />
              <View styleName="vertical">
                <Subtitle>Payment methods</Subtitle>
                <Text numberOfLines={1}>Debit/Credit cards, EBT cards</Text>
              </View>
              <Icon styleName="disclosure" name="right-arrow" />
            </Row>
          </View>
        </TouchableOpacity>
        <ShoutemDivider styleName="line" />
      </Screen>
    );
  }
}

export default SettingsScreen;

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
    marginRight: 15
  }
};
