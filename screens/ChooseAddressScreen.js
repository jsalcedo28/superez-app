import React, { Component } from "react";

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

class ChooseAddressScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Screen>
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>Addresses</TextNative>
          </View>}
          styleName="inline"
          leftComponent={<Icon
            color='#FF5801'
            onPress={() => this.props.navigation.goBack()}
            name="back"
          />}
        />
        <ShoutemDivider styleName="section-header">
          <Caption>Choose an address below</Caption>
        </ShoutemDivider>
        <View styleName="vertical">
          <View>
            <Row styleName="small">
              <Icon name="radiobutton-on" />
              <View styleName="vertical">
                <Subtitle>Juan Carlos Perez</Subtitle>
                <Text numberOfLines={1}>8641 79th St, Jamaica, NY 11421</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Address")}
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
                <Text numberOfLines={1}>2525 W Anklam Rd, Brooklyn, NY 11201</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Address")}
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
          <View styleName="horizontal v-end">
            <Button
              styleName="full-width secondary"
              style={styles.addAddressButton}
              onPress={() => this.props.navigation.navigate("Address")}
            >
              <Icon
                name="plus-button"
                size={15}
                color="white"
              />
              <Text>ADD NEW ADDRESS</Text>
            </Button>
          </View>
        </View>
      </Screen>
    );
  }
}

export default ChooseAddressScreen;

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
  addAddressButton: {
    backgroundColor: "#FF5801",
    borderColor: "#FF5801"
  },
};
