import React, { Component } from "react";

import IconBadge from "react-native-icon-badge";

import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";

import { NavigationActions } from "react-navigation";

import {
  Text,
  ImageBackground
} from "react-native";

import {
  View,
  Row,
  Subtitle,
  TouchableOpacity
} from "@shoutem/ui";

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItemsCount: 0,
      user: {
        fullName: "Eddy Fidel",
        email: "eddy.fidel0809@gmail.com"
      }
    };
  }

  componentWillMount() {
    fetch("https://api.myjson.com/bins/15daas")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          cartItemsCount: data.length
        });
      });
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });

    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { cartItemsCount, user } = this.state;

    return (
      <View>
        <ImageBackground
          source={require("../assets/images/user-background.png")}
          style={{
            paddingTop: 20,
            height: 125
          }}
        >
          <Row style={styles.headerColor}>
            <View styleName="vertical">
              <Subtitle style={styles.fullName}>{user.fullName}</Subtitle>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </Row>
        </ImageBackground>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={this.navigateToScreen("MyOrders")}>
            <Row>
              <View styleName='horizontal v-center'>
                <FeatherIcon
                  color='#FF5801'
                  size={22}
                  name='package'
                />
                <Text style={styles.icons}>My Orders</Text>
              </View>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen("MyCart")}>
            <Row>
              <View styleName='horizontal v-center'>
                <MaterialCommunityIconsIcon
                  color='#FF5801'
                  size={24}
                  name='cart-outline'
                />
                <Text style={styles.icons}>My Cart</Text>
                <IconBadge
                  MainElement={
                    <View style={styles.mainElement}></View>
                  }
                  BadgeElement={
                    <Text style={styles.badgeElement}>{cartItemsCount}</Text>
                  }
                  IconBadgeStyle={styles.iconBadge}
                  Hidden={cartItemsCount == 0}
                />
              </View>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen("Settings")}>
            <Row>
              <View styleName='horizontal v-center'>
                <MaterialCommunityIconsIcon
                  color='#FF5801'
                  size={22}
                  name='cash-usd'
                />
                <Text style={styles.icons}>Refer and Get $10 Off</Text>
              </View>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen("Settings")}>
            <Row>
              <View styleName='horizontal v-center'>
                <FeatherIcon
                  color='#FF5801'
                  size={22}
                  name='settings'
                />
                <Text style={styles.icons}>Settings</Text>
              </View>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen("Settings")}>
            <Row>
              <View styleName='horizontal v-center'>
                <FeatherIcon
                  color='#FF5801'
                  size={22}
                  name='info'
                />
                <Text style={styles.icons}>Help Center</Text>
              </View>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen("Logout")}>
            <Row>
              <View styleName='horizontal v-center'>
                <MaterialCommunityIconsIcon
                  color='#FF5801'
                  size={24}
                  name='logout'
                />
                <Text style={styles.icons}>Logout</Text>
              </View>
            </Row>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SideMenu;

const styles = {
  container: {
    paddingTop: 20,
    backgroundColor: "#FF5801",
    height: 125
  },
  optionsContainer: {
    paddingTop: 20
  },
  headerColor: {
    backgroundColor: "transparent"
  },
  fullName: {
    color: "#FFF",
    fontWeight: "bold"
  },
  email: {
    color: "#FFF"
  },
  icons: {
    marginLeft: 30,
    marginRight: 120
  },
  mainElement: {
    width: 25,
    height: 25
  },
  badgeElement: {
    color: "#FFFFFF"
  },
  iconBadge: {
    backgroundColor: "#FF5801"
  }
};
