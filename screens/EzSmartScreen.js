import React, { Component } from "react";

import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

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
  Button,
  TouchableOpacity,
  Row,
  Divider,
  Image,
  Icon,
  Caption,
  NavigationBar,
  Text
} from "@shoutem/ui";

class MyCartScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.state = {
      stores: [],
      animating: true
    };
  }

  componentWillMount() {
    this.setState({ animating: true });

    fetch("https://api.getsuperez.com/stores")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          stores: data,
          animating: false
        });
      });
  }

  renderRow(store) {
    const totalOrder = this.props.navigation.getParam("totalOrder", null);

    const totalDummy = Math.floor((Math.random() * (totalOrder - (totalOrder - 10))) + (totalOrder - 10));

    return (
      <TouchableOpacity>
        <Divider styleName="line" />
        <Row>
          <Image
            style={styles.storeImage}
            styleName="medium-wide"
            source={{ uri: store.image_url }}
          />
          <View styleName="horizontal v-center space-between">
            <View style={styles.storeInformation} styleName="vertical">
              <Subtitle>{store.name}</Subtitle>
              <Caption>{store.contact_phone}</Caption>
              <Divider />
              <Subtitle>Total: ${totalDummy.toFixed(2)}</Subtitle>
              <Caption style={styles.offerCaption}>You will save ${(totalOrder - totalDummy).toFixed(2)}</Caption>
            </View>
            <Button
              styleName="tight clear"
              onPress={() => this.props.navigation.navigate("Checkout", {
                storeName: store.name,
                storePhoneNumber: store.contact_phone,
                totalOrder: totalDummy.toFixed(2)
              })}
            >
              <Caption style={styles.actionCaption}>CHOOSE</Caption>
            </Button>
          </View>
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }

  render() {
    const { stores, animating } = this.state;

    const storeName = this.props.navigation.getParam("storeName", null);
    const storePhoneNumber = this.props.navigation.getParam("storePhoneNumber", null);
    const totalOrder = this.props.navigation.getParam("totalOrder", null);

    const storesFiltered = stores.filter(s => { return s.name !== storeName; });

    return (
      <Screen>
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>{"Save your money with Ez Smart"}</TextNative>
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
          ) : (<View>
            <View style={styles.currentStoreInformationMain}>
              <View
                styleName="vertical"
                style={styles.currentStoreInformationSecond}
              >
                <View
                  styleName="horizontal v-center space-between"
                  style={styles.storeList}
                >
                  <View styleName='horizontal v-center'>
                    <MaterialIconsIcon
                      style={styles.icon}
                      size={24}
                      name='info-outline'
                    />
                    <Subtitle>Order information</Subtitle>
                  </View>
                </View>
                <View styleName="horizontal v-center space-between">
                  <Text>Current store</Text>
                  <Text>{storeName}</Text>
                </View>
                <View
                  styleName="horizontal v-center space-between"
                  style={styles.currentStoreInformationItem}
                >
                  <Text>Phone number</Text>
                  <Text>{storePhoneNumber}</Text>
                </View>
                <View
                  styleName="horizontal v-center space-between"
                  style={styles.currentStoreInformationItem}
                >
                  <Subtitle>Current total</Subtitle>
                  <Subtitle>${totalOrder}</Subtitle>
                </View>
              </View>
            </View>
            <Divider styleName="section-header">
              <Caption>Choose your products cheaper in another store</Caption>
            </Divider>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ListView
                showsVerticalScrollIndicator={false}
                data={storesFiltered}
                renderRow={this.renderRow}
              />
            </ScrollView>
          </View>)
        }
        <Divider styleName="line" />
      </Screen>
    );
  }
}

export default MyCartScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  storeImage: {
    width: 72,
    height: 72
  },
  checkoutButton: {
    backgroundColor: "#FF5801",
    borderColor: "#FF5801"
  },
  totalSubtitle: {
    backgroundColor: "#FFF",
    borderColor: "#FFF"
  },
  quantitySubtitle: {
    marginBottom: 5
  },
  navigatorBarView: {
    flexDirection: "row"
  },
  navigatorBarText: {
    flexWrap: "wrap",
    textAlign: "center"
  },
  actionCaption: {
    color: "#FF5801"
  },
  icon: {
    marginRight: 6
  },
  storeList: {
    marginBottom: 13
  },
  storeInformation: {
    width: 150
  },
  offerCaption: {
    color: "red"
  },
  currentStoreInformationMain: {
    backgroundColor: "#ffffff"
  },
  currentStoreInformationSecond: {
    margin: 15
  },
  currentStoreInformationItem: {
    marginTop: 5
  }
};
