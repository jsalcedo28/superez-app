import React, { Component } from "react";

import {
  ScrollView,
  ActivityIndicator,
  Text as TextNative
} from "react-native";

import {
  Screen,
  ListView,
  Subtitle,
  View,
  TouchableOpacity,
  Row,
  Divider,
  Icon,
  Caption,
  NavigationBar,
  Button
} from "@shoutem/ui";

class MyOrdersScreen extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.state = {
      orders: [],
      animating: true
    };
  }

  componentWillMount() {
    this.setState({ animating: true });

    fetch("https://api.getsuperez.com/orders")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          orders: data,
          animating: false
        });
      });
  }

  renderRow(order) {
    const taxesFee = Number(2.00);

    return (
      <TouchableOpacity>
        <Divider styleName="line" />
        <Row>
          <View styleName="vertical">
            <Subtitle>Order #{order.order_no}</Subtitle>
            <View styleName="horizontal v-center space-between">
              <View styleName="horizontal">
                {
                  order.status == "Expected Delivery" || order.status == "Available to Pickup"
                    ? (<Subtitle
                      style={styles.statusOrangeSubtitle}
                      styleName="md-gutter-right"
                    >
                      {order.status}
                    </Subtitle>)
                    : order.status == "Cancelled"
                      ? (<Subtitle
                        style={styles.statusRedSubtitle}
                        styleName="md-gutter-right"
                      >
                        {order.status}
                      </Subtitle>)
                      : order.status == "Delivered" || order.status == "Delivered on Pickup"
                        ? (<Subtitle
                          style={styles.statusGreenSubtitle}
                          styleName="md-gutter-right"
                        >
                          {order.status}
                        </Subtitle>)
                        : (<View></View>)
                }
              </View>
            </View>
            {
              order.status == "Cancelled"
                ? (<Caption>on {order.cancelled_date}</Caption>)
                : order.status == "Available to Pickup"
                  ? (<View></View>)
                  : (<Caption>on {order.delivery_date}</Caption>)
            }
          </View>
          <View styleName="vertical h-end">
            <Subtitle>${order.products.length > 0
              ? (order.products.map(c => c.discount
                ? (c.price - c.discount) * c.quantity
                : c.price * c.quantity)
                .reduce((a, b) => a + b) + taxesFee)
                .toFixed(2)
              : 0.00}
            </Subtitle>
            {
              order.status != "Cancelled"
                ? (<Button
                  styleName="tight"
                  onPress={() => this.props.navigation.navigate("Tracking", {
                    order: order
                  })}
                >
                  <Caption style={styles.actionCaption}>TRACK ORDER</Caption>
                </Button>)
                : (<View />)
            }
          </View>
        </Row>
        <Row>
          <View styleName="horizontal v-center space-between">
            <Button styleName="tight">
              <Caption style={styles.actionCaption}>REORDER IT AGAIN</Caption>
            </Button>
            <Button
              styleName="tight"
              onPress={() => this.props.navigation.navigate("OrderDetails", {
                order: order
              })}
            >
              <Caption style={styles.actionCaption}>VIEW ORDER DETAILS</Caption>
            </Button>
          </View>
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }

  render() {
    const { orders, animating } = this.state;

    const ordersInProcess = orders.filter(o => o.status == "Expected Delivery"
      || o.status == "Available to Pickup");

    const pastOrders = orders.filter(o => o.status != "Expected Delivery"
      && o.status != "Available to Pickup");

    return (
      <Screen>
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>My Orders</TextNative>
          </View>}
          styleName="inline"
          leftComponent={<Icon
            color='#FF5801'
            onPress={() => this.props.navigation.goBack()}
            name="back"
          />}
        />
        <Divider styleName="line" />
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
              {
                ordersInProcess
                  ? (<View>
                    <Divider styleName="section-header">
                      <Caption>In Process</Caption>
                    </Divider>
                    <ListView
                      data={ordersInProcess}
                      renderRow={this.renderRow}
                    />
                  </View>)
                  : (<View />)
              }
              {
                pastOrders
                  ? (<View>
                    <Divider styleName="section-header">
                      <Caption>Past Orders</Caption>
                    </Divider>
                    <ListView
                      data={pastOrders}
                      renderRow={this.renderRow}
                    />
                  </View>)
                  : (<View />)
              }
            </ScrollView>
          )
        }
      </Screen>
    );
  }
}

export default MyOrdersScreen;

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
    flexWrap: "wrap",
    textAlign: "center"
  },
  viewOrderDetails: {
    marginTop: 10
  },
  actionCaption: {
    color: "#FF5801"
  }
};
