import React, { Component } from "react";

import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

import {
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Text as TextNative
} from "react-native";

import {
  Screen,
  GridRow,
  TouchableOpacity,
  Subtitle,
  Divider,
  Image,
  View,
  Caption,
  ListView,
  Button,
  Card,
  NavigationBar,
  Icon
} from "@shoutem/ui";

var { width } = Dimensions.get("window");

class DepartmentCategoriesScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.state = {
      products: [],
      cartItemsCount: 0,
      animating: true
    };
  }

  componentWillMount() {
    this.setState({
      animating: true
    });

    fetch("https://api.myjson.com/bins/15daas")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          products: data,
          cartItemsCount: data.length,
          animating: false
        });
      });
  }

  renderRow(rowData) {
    const cellViews = rowData.map((product, id) => {
      return (
        <TouchableOpacity
          key={id}
          onPress={() => this.props.navigation.navigate("ProductDetails", {
            product: product
          })}
        >
          <Card
            styleName="flexible"
            style={styles.itemCenter}
          >
            <Divider />
            <Image
              style={styles.image}
              styleName="medium-wide"
              source={{ uri: product.image_url }}
            />
            <View styleName="content">
              <Subtitle>{product.product_name}</Subtitle>
              <Caption styleName="sm-gutter-top">{product.size}</Caption>
            </View>
            <View
              styleName="horizontal v-end space-between"
              style={styles.priceAndDiscount}
            >
              {
                !product.discount ? (<Subtitle styleName="md-gutter-right">
                  ${product.retail_price.toFixed(2)}
                </Subtitle>) : (<View styleName="horizontal">
                  <Subtitle styleName="md-gutter-right">
                    ${Number(product.price - product.discount).toFixed(2)}
                  </Subtitle>
                  <Caption styleName="line-through">
                    ${product.retail_price.toFixed(2)}
                  </Caption>
                </View>)
              }
              <Button styleName="tight clear">
                <SimpleLineIconsIcon color='#FF5801' size={20} name='plus' />
              </Button>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });

    return (
      <GridRow
        columns={2}
        style={styles.itemBackground}
      >
        {cellViews}
      </GridRow >
    );
  }

  render() {
    const departmentName = this.props.navigation.getParam("departmentName", null)
      || "Bakery";

    const { products, animating } = this.state;

    const groupedData = GridRow.groupByRows(products, 2, () => { return 1; });

    return (
      <Screen>
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>{departmentName}</TextNative>
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
              <Divider styleName="section-header">
                <Caption>Today&apos;s Deals</Caption>
              </Divider>
              <ListView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={groupedData}
                renderRow={this.renderRow}
              />
              <Divider styleName="section-header">
                <Caption>Offers</Caption>
              </Divider>
              <ListView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={groupedData}
                renderRow={this.renderRow}
              />
              <Divider styleName="section-header">
                <Caption>Featured Products</Caption>
              </Divider>
              <ListView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={groupedData}
                renderRow={this.renderRow}
              />
            </ScrollView>
          )
        }
        <Divider styleName="line" />
        <Divider styleName="line" />
      </Screen>
    );
  }
}

export default DepartmentCategoriesScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  image: {
    width: 112,
    height: 112
  },
  departmentImage: {
    borderWidth: 1,
    borderColor: "#EE632C",
    width: 88,
    height: 88,
    borderRadius: 43
  },
  itemCenter: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.375
  },
  departmentItemCenter: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.265
  },
  itemBackground: {
    backgroundColor: "#FFF",
    borderColor: "#FFF"
  },
  priceAndDiscount: {
    marginBottom: 5
  }
};
