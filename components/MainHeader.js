import React, { Component } from "react";

import IconBadge from "react-native-icon-badge";

import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";

import {
  Text as TextNative
} from "react-native";

import {
  NavigationBar,
  Button,
  View,
  TouchableOpacity
} from "@shoutem/ui";

class MainHeader extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    const {
      title,
      cartItemsCount,
      onPressSidebar,
      onPressCart,
      onPressChooseStore,
      screenName,
      styleName,
      isHome = false
    } = this.props;

    return (
      <NavigationBar
        styleName={styleName}
        centerComponent={<View
          styleName='vertical'
          style={styles.navigatorBarView}
        >
          {
            isHome
              ? (<View styleName='vertical h-center'>
                <TextNative style={styles.navigatorBarText}>{title}</TextNative>
                <TouchableOpacity onPress={onPressChooseStore}>
                  <View styleName='horizontal h-center'>
                    <TextNative style={styles.chooseStoreText}>Choose store</TextNative>
                    <FeatherIcon
                      color='#FF5801'
                      name="chevron-down"
                    />
                  </View>
                </TouchableOpacity>
              </View>)
              : (<TextNative style={styles.navigatorBarText}>{title}</TextNative>)
          }
        </View>}
        leftComponent={<MaterialCommunityIconsIcon
          style={styles.menuIcon}
          color='#FF5801'
          size={24}
          name='menu'
          onPress={onPressSidebar} />}
        rightComponent={(
          <View
            style={styles.actionButtons}
            styleName="horizontal"
          >
            {
              screenName == "HomeScreen"
                ? (
                  <Button
                    styleName="tight clear"
                    onPress={onPressCart}
                  >
                    <IconBadge
                      MainElement={
                        <View
                          styleName="vertical h-end v-center"
                          style={styles.mainElement}>
                          <MaterialCommunityIconsIcon color='#222222' size={24} name='cart-outline' />
                        </View>
                      }
                      BadgeElement={
                        <TextNative style={styles.badgeElement}>{cartItemsCount}</TextNative>
                      }
                      IconBadgeStyle={styles.iconBadge}
                      Hidden={cartItemsCount == 0}
                    />
                  </Button>
                )
                : (
                  <Button
                    styleName="tight clear"
                    onPress={onPressCart}
                  >
                    <IconBadge
                      MainElement={
                        <View
                          styleName="vertical h-end v-center"
                          style={styles.mainElement}>
                          <MaterialCommunityIconsIcon color='#222222' size={24} name='cart-outline' />
                        </View>
                      }
                      BadgeElement={
                        <TextNative style={styles.badgeElement}>{cartItemsCount}</TextNative>
                      }
                      IconBadgeStyle={styles.iconBadge}
                      Hidden={cartItemsCount == 0}
                    />
                  </Button>
                )
            }
          </View>
        )}
      />
    );
  }
}

export default MainHeader;

const styles = {
  mainElement: {
    width: 25,
    height: 25,
    margin: 6
  },
  badgeElement: {
    color: "#FFFFFF",
    fontSize: 10
  },
  iconBadge: {
    minWidth: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: "#FF5801"
  },
  actionButtons: {
    marginRight: 10
  },
  navigatorBarView: {
    flexDirection: "row"
  },
  navigatorBarText: {
    flexWrap: "wrap",
    textAlign: "center"
  },
  chooseStoreText: {
    flexWrap: "wrap",
    fontSize: 12,
    marginTop: 2,
    color: "#FF5801"
  },
  menuIcon: {
    marginLeft: 12
  }
};
