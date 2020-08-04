import React, { Component } from "react";


import {
  Switch,
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
  Divider as ShoutemDivider
} from "@shoutem/ui";

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor() {
    super();
    this.state = {
      pushSwitchOn: true,
      emailSwitchOn: false,
      smsSwitchOn: true,
      statusSwitchOn: false,
      offersSwitchOn: true,
    };
  }

  render() {
    const { pushSwitchOn } = this.state;
    const { emailSwitchOn } = this.state;
    const { smsSwitchOn } = this.state;
    const { statusSwitchOn } = this.state;
    const { offersSwitchOn } = this.state;

    return (
      <Screen>
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>Notifications</TextNative>
          </View>}
          styleName="inline"
          leftComponent={<Icon
            color='#FF5801'
            onPress={() => this.props.navigation.goBack()}
            name="back"
          />}
        />
        <ShoutemDivider styleName="section-header">
          <Caption>Changes to your orders</Caption>
        </ShoutemDivider>

        <View>
          <Row styleName="small">
            <Text>Push Notifications</Text>
            <Switch
              onValueChange={value => this.setState({ pushSwitchOn: value })}
              value={pushSwitchOn}
              onTintColor='#FF5801'
            />
          </Row>
        </View>
        <ShoutemDivider styleName="line" />
        <ShoutemDivider styleName="line" />
        <View>
          <Row styleName="small">
            <Text>Email Notifications</Text>
            <Switch
              onValueChange={value => this.setState({ emailSwitchOn: value })}
              value={emailSwitchOn}
              onTintColor='#FF5801'
            />
          </Row>
        </View>
        <ShoutemDivider styleName="line" />
        <ShoutemDivider styleName="line" />
        <View>
          <Row styleName="small">
            <Text>SMS text messages</Text>
            <Switch
              onValueChange={value => this.setState({ smsSwitchOn: value })}
              value={smsSwitchOn}
              onTintColor='#FF5801'
            />
          </Row>
        </View>
        <ShoutemDivider styleName="line" />
        <View>
          <Row styleName="small">
            <Text>Delivery status updates</Text>
            <Switch
              onValueChange={value => this.setState({ statusSwitchOn: value })}
              value={statusSwitchOn}
              onTintColor='#FF5801'
            />
          </Row>
        </View>
        <ShoutemDivider styleName="line" />

        <ShoutemDivider styleName="section-header">
          <Caption>Special offers</Caption>
        </ShoutemDivider>

        <View>
          <Row styleName="small">
            <Text>Email me exclusive offers and discounts</Text>
            <Switch
              onValueChange={value => this.setState({ offersSwitchOn: value })}
              value={offersSwitchOn}
              onTintColor='#FF5801'
            />
          </Row>
        </View>
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
    marginRight: 6
  }
};
