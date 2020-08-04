import React, { Component } from "react";

import FeatherIcon from "react-native-vector-icons/Feather";

import {
  ScrollView,
  ActivityIndicator,
  Text as TextNative
} from "react-native";

import {
  Screen,
  GridRow,
  TouchableOpacity,
  Subtitle,
  Divider,
  Card,
  Image,
  View,
  ListView,
  NavigationBar,
  Icon
} from "@shoutem/ui";

class ChooseStoreScreen extends Component {
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

  renderRow(rowData) {
    const cellViews = rowData.map((store, id) => {
      return (
        <TouchableOpacity
          key={id}
          styleName="flexible"
          onPress={() => this.props.navigation.navigate("Home", {
            storeName: store.name
          })}
        >
          <Card styleName="flexible" style={styles.storeItemCenter}>
            <Divider />
            <Image
              style={styles.storeImage}
              styleName="medium-wide"
              source={{ uri: store.image_url }}
            />
            <View styleName="content horizontal h-center">
              <Subtitle>{store.name}</Subtitle>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });

    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    );
  }

  render() {
    const { stores, animating } = this.state;

    const groupedData = GridRow.groupByRows(stores, 2, () => { return 1; });

    return (
      <Screen>
        <NavigationBar
          centerComponent={<View
            styleName='vertical'
            style={styles.navigatorBarView}
          >
            <View styleName='vertical h-center'>
              <TextNative style={styles.navigatorBarText}>Stores in</TextNative>
              <TouchableOpacity>
                <View styleName='horizontal h-center'>
                  <TextNative style={styles.storesZipCodeText}>Brooklyn, 11212</TextNative>
                  <FeatherIcon
                    color='#FF5801'
                    name="chevron-down"
                  />
                </View>
              </TouchableOpacity>
            </View>
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
              <ListView
                showsVerticalScrollIndicator={false}
                data={groupedData}
                renderRow={this.renderRow}
              />
            </ScrollView>
          )
        }
      </Screen>
    );
  }
}

export default ChooseStoreScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  storeImage: {
    width: 112,
    height: 112
  },
  storeItemCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  navigatorBarView: {
    flexDirection: "row"
  },
  navigatorBarText: {
    flexWrap: "wrap",
    textAlign: "center"
  },
  storesZipCodeText: {
    flexWrap: "wrap",
    fontSize: 12,
    marginTop: 2,
    color: "#FF5801"
  }
};
