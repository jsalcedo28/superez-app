import React, { Component } from "react";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

import {
  ScrollView,
  ActivityIndicator,
  Dimensions,
  View as ViewNative,
  Text as TextNative
} from "react-native";

import {
  Screen,
  Subtitle,
  Row,
  View,
  Divider,
  Caption,
  TouchableOpacity,
  ListView,
  NavigationBar,
  Icon
} from "@shoutem/ui";

class ChooseTimeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.state = {
      deliveryFees: [],
      animating: true,
      index: 0,
      routes: [
        { key: "delivery", title: "Delivery" },
        { key: "pickup", title: "Pickup" }
      ]
    };
  }

  componentWillMount() {
    this.setState({ animating: true });

    const deliveryData = [
      { schedule: "9am - 10am", price: 5.99, type: "delivery" },
      { schedule: "12pm - 1pm", price: 5.99, type: "delivery" },
      { schedule: "3pm - 4pm", price: 5.99, type: "delivery" }
    ];

    const pickupData = [
      { schedule: "9am - 10am", price: 2.99, type: "pickup" },
      { schedule: "12pm - 1pm", price: 2.99, type: "pickup" },
      { schedule: "3pm - 4pm", price: 1.99, type: "pickup" }
    ];

    this.setState({
      deliveryFees: deliveryData,
      pickupFees: pickupData,
      animating: false
    });
  }

  renderRow(deliveryPickupFee) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate("Checkout", {
        deliveryPickupFeePrice: deliveryPickupFee.price,
        deliveryPickupFeeSchedule: deliveryPickupFee.schedule,
        deliveryPickupFeeType: deliveryPickupFee.type
      })}>
        <Divider styleName="line" />
        <Row>
          <View styleName="horizontal v-center space-between">
            <Subtitle styleName="md-gutter-right">{deliveryPickupFee.schedule}</Subtitle>
            <Caption>${deliveryPickupFee.price}</Caption>
          </View>
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }

  render() {
    const { deliveryFees, pickupFees, animating } = this.state;

    const DeliveryRoute = () => (
      <View>
        {
          animating ? (
            <View style={styles.container}>
              <ActivityIndicator
                size="large"
                animating={animating}
                color="#FF5801"
              />
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <ListView
                showsVerticalScrollIndicator={false}
                data={deliveryFees}
                renderRow={this.renderRow}
              />
            </ScrollView>
          )
        }
      </View>
    );

    const PickupRoute = () => (
      <View>
        {
          animating ? (
            <View style={styles.container}>
              <ActivityIndicator
                size="large"
                animating={animating}
                color="#FF5801"
              />
            </View>
          ) : (
            <View>
              <View style={styles.pickupAddress} styleName="horizontal">
                <Divider />
                <Subtitle>Pickup at </Subtitle>
                <Subtitle style={styles.address}>24 Cortelyou Road, Brooklyn, NY 11421</Subtitle>
                <Divider />
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Divider styleName="line" />
                <ListView
                  showsVerticalScrollIndicator={false}
                  data={pickupFees}
                  renderRow={this.renderRow}
                />
              </ScrollView>
            </View>
          )
        }
      </View>
    );

    return (
      <Screen styleName='paper'>
        <NavigationBar
          centerComponent={<ViewNative style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>Choose time</TextNative>
          </ViewNative>}
          styleName="inline no-border"
          leftComponent={<Icon
            color='#FF5801'
            onPress={() => this.props.navigation.goBack()}
            name="back"
          />}
        />
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            delivery: DeliveryRoute,
            pickup: PickupRoute,
          })}
          renderTabBar={props =>
            <TabBar
              {...props}
              style={styles.tabBackground}
              indicatorStyle={styles.tabIndicator}
              labelStyle={styles.tabLabel}
            />
          }
          onIndexChange={index => this.setState({ index })}
          initialLayout={{
            width: Dimensions.get("window").width,
            height: 0
          }}
        />
      </Screen>
    );
  }
}

export default ChooseTimeScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  navigatorBarView: {
    flexDirection: "row"
  },
  navigatorBarText: {
    flexWrap: "wrap",
    textAlign: "center"
  },
  tabLabel: {
    color: "black"
  },
  tabIndicator: {
    backgroundColor: "#FF5801"
  },
  tabBackground: {
    backgroundColor: "#ffffff"
  },
  pickupAddress: {
    margin: 15
  },
  address: {
    color: "#FF5801"
  }
};
