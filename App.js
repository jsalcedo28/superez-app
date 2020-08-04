import React, { Component } from "react";

import SideMenu from "./components/SideMenu";
import SplashScreen from "react-native-splash-screen";

import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FeatherIcon from "react-native-vector-icons/Feather";

import {
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";

import {
  createMaterialBottomTabNavigator
} from "react-navigation-material-bottom-tabs";

import ZipCodeScreen from "./screens/ZipCodeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import NotifyMeScreen from "./screens/NotifyMeScreen";
import ChooseStoreScreen from "./screens/ChooseStoreScreen";
import SearchScreen from "./screens/SearchScreen";
import DepartmentsScreen from "./screens/DepartmentsScreen";
import DepartmentCategoriesScreen from "./screens/DepartmentCategoriesScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import MyCartScreen from "./screens/MyCartScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import AddressScreen from "./screens/AddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import TrackingScreen from "./screens/TrackingScreen";
import EzSmartScreen from "./screens/EzSmartScreen";
import OrderConfirmationScreen from "./screens/OrderConfirmationScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AccountInfoScreen from "./screens/AccountInfoScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ChooseAddressScreen from "./screens/ChooseAddressScreen";
import ChoosePaymentMethodScreen from "./screens/ChoosePaymentMethodScreen";
import ChooseTimeScreen from "./screens/ChooseTimeScreen";

const InnerBottom = createMaterialBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        focused ? (<MaterialCommunityIconsIcon
          size={24}
          name='home'
          color='#FF5801' />)
          : (<MaterialCommunityIconsIcon
            size={24}
            name='home'
            color='#888888' />)
      )
    }
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        focused ? (<FeatherIcon
          size={22}
          name='search'
          color='#FF5801' />)
          : (<FeatherIcon
            size={22}
            name='search'
            color='#888888' />)
      )
    }
  },
  Departments: {
    screen: DepartmentsScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        focused ? (<EntypoIcon
          size={22}
          name='shop'
          color='#FF5801' />)
          : (<EntypoIcon
            size={22}
            name='shop'
            color='#888888' />)
      )
    }
  }
}, {
  initialRouteName: "Home",
  activeTintColor: "#FF5801",
  barStyle: { backgroundColor: "#ffffff" }
});

const InnerDrawer = createDrawerNavigator({
  Home: {
    screen: InnerBottom,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  MyOrders: {
    screen: MyOrdersScreen,
    navigationOptions: () => ({
      drawerLockMode: "locked-closed"
    })
  },
  MyCart: {
    screen: MyCartScreen,
    navigationOptions: () => ({
      drawerLockMode: "locked-closed"
    })
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: () => ({
      drawerLockMode: "locked-closed"
    })
  },
  Logout: {
    screen: ZipCodeScreen,
    navigationOptions: () => ({
      drawerLockMode: "locked-closed"
    })
  }
},
{
  initialRouteName: "Home",
  contentComponent: SideMenu
});

InnerDrawer.navigationOptions = {
  header: null
};

const RootStack = createStackNavigator({
  ZipCode: {
    screen: ZipCodeScreen
  },
  Signup: {
    screen: SignupScreen
  },
  Login: {
    screen: LoginScreen
  },
  NotifyMe: {
    screen: NotifyMeScreen
  },
  ChooseStore: {
    screen: ChooseStoreScreen
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen
  },
  Home: {
    screen: InnerDrawer
  },
  MyCart: {
    screen: MyCartScreen
  },
  ProductDetails: {
    screen: ProductDetailsScreen
  },
  Checkout: {
    screen: CheckoutScreen
  },
  Address: {
    screen: AddressScreen
  },
  Payment: {
    screen: PaymentScreen
  },
  OrderDetails: {
    screen: OrderDetailsScreen
  },
  Tracking: {
    screen: TrackingScreen
  },
  EzSmart: {
    screen: EzSmartScreen
  },
  OrderConfirmation: {
    screen: OrderConfirmationScreen
  },
  Settings: {
    screen: SettingsScreen
  },
  AccountInfo: {
    screen: AccountInfoScreen
  },
  Notifications:{
    screen: NotificationsScreen
  },
  ChooseAddress: {
    screen: ChooseAddressScreen
  },
  ChoosePaymentMethod: {
    screen: ChoosePaymentMethodScreen
  },
  ChooseTime: {
    screen: ChooseTimeScreen
  },
  DepartmentCategories: {
    screen: DepartmentCategoriesScreen
  }
},
{
  initialRouteName: "ZipCode"
});

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <RootStack />;
  }
}
