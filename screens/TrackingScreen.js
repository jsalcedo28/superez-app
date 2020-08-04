import React, { Component } from "react";

import StepIndicator from "react-native-step-indicator";

import {
  ScrollView,
  Text as TextNative,
} from "react-native";

import {
  Screen,
  View,
  Icon,
  Divider,
  NavigationBar} from "@shoutem/ui";

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: "#FF5801",
  separatorFinishedColor: "#FF5801",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#FF5801",
  stepIndicatorUnFinishedColor: "#aaaaaa",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: "#000000",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#ffffff",
  labelColor: "#666666",
  labelSize: 12,
  currentStepLabelColor: "#FF5801"
};

class TrackingScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      currentPosition: 0,
      stepCount: 0
    };
  }

  componentWillMount() {
    const order = this.props.navigation.getParam("order", null);

    if (order.status == "Delivered" || order.status == "Delivered on Pickup") {
      this.setState({
        currentPosition: 3,
        stepCount: 3
      });
    } else if (order.status == "Expected Delivery" || "Available to Pickup") {
      if (order.shipped_date || order.packed_date) {
        this.setState({
          currentPosition: 2,
          stepCount: 4
        });
      } else {
        this.setState({
          currentPosition: 0,
          stepCount: 4
        });
      }
    }
  }

  render() {
    const order = this.props.navigation.getParam("order", null);

    const labels = order.status == "Delivered"
      ? [`Ordered on ${order.order_date}`, `Shipped on ${order.shipped_date}`, `Delivered on ${order.delivery_date}`]
      : order.status == "Delivered on Pickup"
        ? [`Ordered on ${order.order_date}`, `Packed on ${order.packed_date}`, `Delivered on Pickup on ${order.delivery_date}`]
        : order.status == "Expected Delivery"
          ? [`Ordered on ${order.order_date}`, `Shipped on ${order.shipped_date}`, "It's on the way", `Arriving on ${order.delivery_date}`]
          : order.status == "Available to Pickup"
            ? [`Ordered on ${order.order_date}`, `Packed on ${order.packed_date}`, "Available to Pickup", "The order has not yet been delivered"]
            : [];

    return (
      <Screen>
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>Tracking order #{order.order_no}</TextNative>
          </View>}
          styleName="inline"
          leftComponent={<Icon
            color='#FF5801'
            onPress={() => this.props.navigation.goBack()}
            name="back"
          />}
        />
        <Divider styleName="line" />
        <ScrollView style={styles.stepIndicator}>
          <StepIndicator
            customStyles={customStyles}
            stepCount={this.state.stepCount}
            currentPosition={this.state.currentPosition}
            labels={labels}
            direction='vertical'
          />
        </ScrollView>
      </Screen>
    );
  }
}

export default TrackingScreen;

const styles = {
  navigatorBarView: {
    flexDirection: "row"
  },
  navigatorBarText: {
    flexWrap: "wrap",
    textAlign: "center"
  },
  stepIndicator: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 30
  }
};
