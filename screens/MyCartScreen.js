import React, { Component } from "react";

import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

import {
  ScrollView,
  Text as TextNative,
  ActivityIndicator
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

const currentUser = {
  customer_id: "5b08266ef15c53c020fd2edf",
  customer_name: "Eddy Fidel"
};

class MyCartScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.state = {
      products: [],
      cart: {},
      cartItems: [],
      animating: true
    };
  }

  componentWillMount() {
    const cartItems = this.props.navigation.getParam("cartItems", []);

    this.setState({
      cartItems: cartItems,
      animating: true
    });

    const request = async () => {
      const productsResponse = await fetch("https://api.myjson.com/bins/15daas");

      if (productsResponse.ok) {
        const products = await productsResponse.json();

        if (products) {
          this.setState({
            products: products
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

  renderRow(cartItem) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate("ProductDetails", {
        product: cartItem
      })}>
        <Divider styleName="line" />
        <Row>
          <Image
            style={styles.cartItemImage}
            styleName="medium-wide"
            source={{ uri: cartItem.image_url }}
          />
          <View styleName="vertical">
            <Subtitle>{cartItem.product_name}</Subtitle>
            <Text>{cartItem.size}</Text>
            <View styleName="horizontal v-center space-between">
              {
                !cartItem.discount ? (<Subtitle styleName="md-gutter-right">
                  ${cartItem.retail_price.toFixed(2)}
                </Subtitle>) : (<View styleName="horizontal">
                  <Subtitle styleName="md-gutter-right">
                    ${Number(cartItem.retail_price - cartItem.discount).toFixed(2)}
                  </Subtitle>
                  <Caption styleName="line-through">
                    ${cartItem.retail_price.toFixed(2)}
                  </Caption>
                </View>)
              }
            </View>
          </View>
          <View styleName="vertical">
            <Divider />
            <View styleName="horizontal">
              <Button
                onPress={() => this.handleRemoveItemClick(cartItem.upc)}
              >
                <Icon color='#FF5801' name="minus-button" />
              </Button>
              <Subtitle style={styles.quantitySubtitle}>{cartItem.quantity}</Subtitle>
              <Button
                onPress={() => this.handleAddItemClick(cartItem.upc)}
              >
                <Icon color='#FF5801' name="plus-button" />
              </Button>
            </View>
            <Divider />
            <View styleName="horizontal h-end">
              <Button styleName="tight clear">
                <Caption style={styles.actionCaption}>
                  <EvilIconsIcon
                    style={styles.icon}
                    size={16}
                    color='#EE632C'
                    name='pencil' /> NOTES</Caption>
              </Button>
              <Button styleName="tight clear">
                <Caption style={styles.actionCaption}>
                  <EvilIconsIcon
                    style={styles.icon}
                    size={16}
                    color='#EE632C'
                    name='trash' /> REMOVE</Caption>
              </Button>
            </View>
          </View>
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }

  handleAddItemClick(upc) {
    let cartId = this.state.cart ? this.state.cart._id : "";
    const cartItem = this.state.cartItems.filter(p => p.upc === upc)[0];
    const product = this.state.products.filter(p => p.upc === upc)[0];

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
            cartItems: cartItems,
            cartItemsCount: cartItems.length
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
          cartItems: cartItems,
          cartItemsCount: cartItems.length
        });
      }
    };

    request();
  }

  handleRemoveItemClick(upc) {
    let cartId = this.state.cart ? this.state.cart._id : "";
    const cartItem = this.state.cartItems.filter(p => p.upc === upc)[0];
    const product = this.state.products.filter(p => p.upc === upc)[0];

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
            cartItems: cartItems,
            cartItemsCount: cartItems.length
          });
        }
      }
    };

    request();
  }

  render() {
    const { cartItems, animating } = this.state;

    return (
      <Screen styleName="paper">
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>{"My Cart"}</TextNative>
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
                data={cartItems}
                renderRow={this.renderRow}
              />
            </ScrollView>
          )
        }
        <Divider styleName="line" />
        <View
          styleName="horizontal v-center h-center"
          style={styles.totalSubtitle}
        >
          <Subtitle>{"\n\n"}</Subtitle>
          <Subtitle>
            Total ${cartItems.length > 0
              ? cartItems.map(c => c.discount
                ? (c.retail_price - c.discount) * c.quantity
                : c.retail_price * c.quantity)
                .reduce((a, b) => a + b)
                .toFixed(2)
              : 0.00}
          </Subtitle>
        </View>
        <View styleName="horizontal">
          <Button
            styleName="full-width secondary"
            style={styles.checkoutButton}
            onPress={() => this.props.navigation.navigate("Checkout")}
          >
            <Text>PROCEED TO CHECKOUT</Text>
          </Button>
        </View>
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
  cartItemImage: {
    width: 96,
    height: 96
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
    color: "#FF5801",
    marginRight: 15
  }
};
