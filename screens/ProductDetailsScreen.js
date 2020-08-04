import React, { Component } from "react";

import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

import {
  ScrollView,
  ActivityIndicator,
  Text as TextNative,
  Dimensions
} from "react-native";

import {
  Screen,
  Subtitle,
  View,
  Icon,
  Image,
  Divider,
  Row,
  Caption,
  Button,
  GridRow,
  ListView,
  TouchableOpacity,
  Card,
  NavigationBar,
  Text
} from "@shoutem/ui";

var { width } = Dimensions.get("window");

const currentUser = {
  customer_id: "5b08266ef15c53c020fd2edf",
  customer_name: "Eddy Fidel"
};

class ProductDetailsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.state = {
      product: {},
      relatedProducts: [],
      cart: {},
      cartItems: [],
      animating: true
    };
  }

  componentWillMount() {
    const product = this.props.navigation.getParam("product", null);

    this.setState({
      product: product,
      animating: true
    });

    const request = async () => {
      const productsResponse = await fetch("https://api.myjson.com/bins/15daas");

      if (productsResponse.ok) {
        const products = await productsResponse.json();

        if (products) {
          this.setState({
            relatedProducts: products
          });
        }
      }

      const cartResponse = await fetch(`https://api.getsuperez.com/carts/${currentUser.customer_id}`);

      if (cartResponse.ok) {
        const cart = await cartResponse.json();

        if (cart) {
          this.setState({
            cart: cart
          });

          const cartItemsResponse = await fetch(`https://api.getsuperez.com/carts/items/${cart._id}`);

          if (cartItemsResponse.ok) {
            const cartItems = await cartItemsResponse.json();

            if (cartItems) {
              this.setState({
                cartItems: cartItems
              });
            }
          }
        }
      }

      this.setState({
        animating: false
      });
    };

    request();
  }

  renderRow(rowData) {
    const cellViews = rowData.map((relatedProduct, id) => {
      return (
        <TouchableOpacity
          key={id}
          onPress={() => this.props.navigation.navigate("ProductDetails", {
            product: relatedProduct
          })}
        >
          <Card
            styleName="flexible"
            style={styles.productItemCenter}
          >
            <Divider />
            <Image
              style={styles.productImage}
              styleName="medium-wide"
              source={{ uri: relatedProduct.image_url }}
            />
            <View styleName="content">
              <Subtitle>{relatedProduct.product_name}</Subtitle>
              <Caption styleName="sm-gutter-top">{relatedProduct.size}</Caption>
            </View>
            <View
              styleName="horizontal v-end space-between"
              style={styles.priceAndDiscount}
            >
              {
                !relatedProduct.discount ? (<Subtitle styleName="md-gutter-right">
                  ${relatedProduct.retail_price.toFixed(2)}
                </Subtitle>) : (<View styleName="horizontal">
                  <Subtitle styleName="md-gutter-right">
                    ${Number(relatedProduct.price - relatedProduct.discount).toFixed(2)}
                  </Subtitle>
                  <Caption styleName="line-through">
                    ${relatedProduct.retail_price.toFixed(2)}
                  </Caption>
                </View>)
              }
              <Button
                styleName="tight clear"
                onPress={() => this.handleAddItemClick(relatedProduct.upc)}
              >
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
        style={styles.relatedProductsItemBackground}
      >
        {cellViews}
      </GridRow>
    );
  }

  handleAddItemClick(upc) {
    let cartId = this.state.cart ? this.state.cart._id : "";
    const cartItem = this.state.cartItems.filter(p => p.upc === upc)[0];
    const product = this.state.relatedProducts.filter(p => p.upc === upc)[0];

    const request = async () => {
      if (!cartId) {
        await fetch("https://api.getsuperez.com/carts", {
          method: "POST",
          body: JSON.stringify({
            customer_id: currentUser.customer_id,
            customer_name: currentUser.customer_name
          }),
          headers: new Headers({
            "Content-Type": "application/json"
          })
        });

        const cartResponse = await fetch(`https://api.getsuperez.com/carts/${currentUser.customer_id}`);

        if (cartResponse.ok) {
          const cart = await cartResponse.json();

          this.setState({ cart: cart });

          cartId = cart._id;
        }
      }

      if (cartItem) {
        await fetch(`https://api.getsuperez.com/carts/item/${cartItem._id}`, {
          method: "PUT",
          body: JSON.stringify({
            _id: cartItem._id,
            cart_id: cartId,
            product_id: product._id,
            product_name: product.product_name,
            image_url: product.image_url,
            retail_price: product.retail_price,
            quantity: cartItem.quantity + 1,
            size: product.size,
            upc: product.upc,
            store_code: product.store_code
          }),
          headers: new Headers({
            "Content-Type": "application/json"
          })
        });

        const cartItemsResponse = await fetch(`https://api.getsuperez.com/carts/items/${cartId}`);

        if (cartItemsResponse.ok) {
          const cartItems = await cartItemsResponse.json();

          this.setState({
            cartItems: cartItems
          });
        }
      } else {
        await fetch("https://api.getsuperez.com/carts/item", {
          method: "POST",
          body: JSON.stringify({
            cart_id: cartId,
            product_id: product._id,
            product_name: product.product_name,
            image_url: product.image_url,
            retail_price: product.retail_price,
            size: product.size,
            upc: product.upc,
            store_code: product.store_code
          }),
          headers: new Headers({
            "Content-Type": "application/json"
          })
        });
      }

      const cartItemsResponse = await fetch(`https://api.getsuperez.com/carts/items/${cartId}`);

      if (cartItemsResponse.ok) {
        const cartItems = await cartItemsResponse.json();

        this.setState({
          cartItems: cartItems
        });
      }
    };

    request();
  }

  handleRemoveItemClick(upc) {
    let cartId = this.state.cart ? this.state.cart._id : "";
    const cartItem = this.state.cartItems.filter(p => p.upc === upc)[0];
    const product = this.state.product;

    const request = async () => {
      if (!cartId) {
        await fetch("https://api.getsuperez.com/carts", {
          method: "POST",
          body: JSON.stringify({
            customer_id: currentUser.customer_id,
            customer_name: currentUser.customer_name
          }),
          headers: new Headers({
            "Content-Type": "application/json"
          })
        });

        const cartResponse = await fetch(`https://api.getsuperez.com/carts/${currentUser.customer_id}`);

        if (cartResponse.ok) {
          const cart = await cartResponse.json();

          this.setState({ cart: cart });

          cartId = cart._id;
        }
      }

      if (cartItem) {
        if (cartItem.quantity === 1) {
          await fetch(`https://api.getsuperez.com/carts/item/${cartItem._id}`, {
            method: "DELETE"
          });
        } else {
          await fetch(`https://api.getsuperez.com/carts/item/${cartItem._id}`, {
            method: "PUT",
            body: JSON.stringify({
              _id: cartItem._id,
              cart_id: cartId,
              product_id: product._id,
              product_name: product.product_name,
              image_url: product.image_url,
              retail_price: product.retail_price,
              quantity: cartItem.quantity - 1,
              size: product.size,
              upc: product.upc,
              store_code: product.store_code
            }),
            headers: new Headers({
              "Content-Type": "application/json"
            })
          });
        }

        const cartItemsResponse = await fetch(`https://api.getsuperez.com/carts/items/${cartId}`);

        if (cartItemsResponse.ok) {
          const cartItems = await cartItemsResponse.json();

          this.setState({
            cartItems: cartItems
          });
        }
      }
    };

    request();
  }

  render() {
    const { relatedProducts, cartItems, product, animating } = this.state;

    const upc = product ? product.upc : 0;
    const cartItem = cartItems.filter(p => p.upc === upc)[0];

    const groupedData = GridRow.groupByRows(relatedProducts, 2, () => { return 1; });

    return (
      <Screen styleName="paper">
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>Product details</TextNative>
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
              <Row>
                <View style={styles.productItemCenter}>
                  <Image
                    style={styles.imageSize}
                    styleName="large-portrait"
                    source={{ uri: product.image_url }}
                  />
                </View>
              </Row>
              <Text styleName="md-gutter multiline">{product.product_name}</Text>
              <Divider styleName="line" />
              <Row>
                <View styleName="vertical">
                  <Subtitle>Description</Subtitle>
                  <Text>{product.description}</Text>
                </View>
              </Row>
              <Divider styleName="line" />
              <Row>
                <View styleName="vertical">
                  <Subtitle>Related Products</Subtitle>
                </View>
              </Row>
              <View styleName="vertical">
                <ListView
                  horizontal={true}
                  data={groupedData}
                  renderRow={this.renderRow}
                />
              </View>
            </ScrollView>
          )
        }
        <Divider styleName="line" />
        <View styleName="vertical">
          <Row>
            <View styleName="vertical">
              <View styleName="horizontal v-center space-between">
                {
                  !product.discount ? (<View styleName="horizontal">
                    <Subtitle styleName="md-gutter-right">
                      ${product.retail_price.toFixed(2)}
                    </Subtitle>
                    <Caption>
                      {product.size}
                    </Caption>
                  </View>) : (<View styleName="horizontal">
                    <Subtitle styleName="md-gutter-right">
                      ${Number(product.price - product.discount).toFixed(2)}
                    </Subtitle>
                    <Caption>
                      {product.size}
                    </Caption>
                  </View>)
                }
              </View>
            </View>
            <View styleName="horizontal h-end">
              <Button onPress={() => this.handleRemoveItemClick(product.upc)}
              >
                <Icon color='#FF5801' name="minus-button" />
              </Button>
              <Subtitle style={styles.quantitySubtitle}>
                {cartItem
                  ? cartItem.quantity
                  : 0}
              </Subtitle>
              <Button onPress={() => this.handleAddItemClick(product.upc)}>
                <Icon color='#FF5801' name="plus-button" />
              </Button>
            </View>
          </Row>
        </View>
      </Screen>
    );
  }
}

export default ProductDetailsScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  quantitySubtitle: {
    marginBottom: 5
  },
  imageSize: {
    width: 224,
    height: 224
  },
  productItemCenter: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.375
  },
  productImage: {
    width: 112,
    height: 112
  },
  relatedProductsItemBackground: {
    backgroundColor: "#FFF",
    borderColor: "#FFF"
  },
  navigatorBarView: {
    flexDirection: "row"
  },
  navigatorBarText: {
    flexWrap: "wrap",
    textAlign: "center"
  },
  priceAndDiscount: {
    marginBottom: 5
  }
};
