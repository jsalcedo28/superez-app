import React, { Component } from "react";
import MainHeader from "../components/MainHeader";

import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

import { ScrollView, ActivityIndicator, Dimensions } from "react-native";

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
  Card
} from "@shoutem/ui";

var { width } = Dimensions.get("window");

const currentUser = {
  customer_id: "5b08266ef15c53c020fd2edf",
  customer_name: "Eddy Fidel"
};

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.renderDepartmentRow = this.renderDepartmentRow.bind(this);
    this.state = {
      productsByDepartment: [],
      featuredProducts: [],
      popularProducts: [],
      departments: [],
      animating: true,
      cart: {},
      cartItems: [],
      cartItemsCount: 0,
      activePage: 0,
      resultLimit: 10
    };
  }

  componentWillMount() {
    const activePage = this.state.activePage;
    const resultLimit = this.state.resultLimit;

    this.setState({
      animating: true
    });

    const request = async () => {
      const featuredProductsResponse = await fetch(
        `https://api.getsuperez.com/products/featured/${resultLimit}/Valid`
      );

      if (featuredProductsResponse.ok) {
        const result = await featuredProductsResponse.json();

        if (result && result.docs) {
          this.setState({
            featuredProducts: result.docs
          });
        }
      }

      const popularProductsResponse = await fetch(
        `https://api.getsuperez.com/products/popular/${activePage}/${resultLimit}/Valid`
      );

      if (popularProductsResponse.ok) {
        const result = await popularProductsResponse.json();

        if (result && result.docs) {
          this.setState({
            popularProducts: result.docs
          });
        }
      }

      const productsByDepartmentResponse = await fetch(
        `https://api.getsuperez.com/products/${activePage}/${resultLimit}/Valid/01`
      );

      if (productsByDepartmentResponse.ok) {
        const result = await productsByDepartmentResponse.json();

        if (result && result.docs) {
          this.setState({
            productsByDepartment: result.docs
          });
        }
      }

      const cartResponse = await fetch(
        `https://api.getsuperez.com/carts/${currentUser.customer_id}`
      );

      if (cartResponse.ok) {
        const cart = await cartResponse.json();

        if (cart) {
          this.setState({
            cart: cart
          });

          const cartItemsResponse = await fetch(
            `https://api.getsuperez.com/carts/items/${cart._id}`
          );

          if (cartItemsResponse.ok) {
            const cartItems = await cartItemsResponse.json();

            if (cartItems) {
              this.setState({
                cartItems: cartItems,
                cartItemsCount: cartItems.length
              });
            }
          }
        }
      }

      const departmentsResponse = await fetch(
        "https://api.getsuperez.com/departments"
      );

      if (departmentsResponse.ok) {
        const departments = await departmentsResponse.json();

        if (departments) {
          this.setState({
            departments: departments
          });
        }
      }

      this.setState({
        animating: false
      });
    };

    request();
  }

  renderRow(rowData) {
    const cellViews = rowData.map((product, id) => {
      return (
        <TouchableOpacity
          key={id}
          onPress={() =>
            this.props.navigation.navigate("ProductDetails", {
              product: product
            })
          }
        >
          <Card styleName="flexible" style={styles.itemCenter}>
            <Divider />
            <Image
              style={styles.image}
              styleName="medium-wide"
              source={{ uri: product.image_url || "" }}
            />
            <View styleName="content">
              <Subtitle>{product.product_name}</Subtitle>
              <Caption styleName="sm-gutter-top">{product.size}</Caption>
            </View>
            <View
              styleName="horizontal v-end space-between"
              style={styles.priceAndDiscount}
            >
              {!product.discount ? (
                <Subtitle styleName="md-gutter-right">
                  $
                  {product.retail_price
                    ? product.retail_price.toFixed(2)
                    : "0".toFixed(2)}
                </Subtitle>
              ) : (
                <View styleName="horizontal">
                  <Subtitle styleName="md-gutter-right">
                    ${Number(product.price - product.discount).toFixed(2)}
                  </Subtitle>
                  <Caption styleName="line-through">
                    $
                    {product.retail_price
                      ? product.retail_price.toFixed(2)
                      : "0".toFixed(2)}
                  </Caption>
                </View>
              )}
              <Button
                styleName="tight clear"
                onPress={() => this.handleAddItemClick(product.upc)}
              >
                <SimpleLineIconsIcon color="#FF5801" size={20} name="plus" />
              </Button>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });

    return (
      <GridRow columns={2} style={styles.itemBackground}>
        {cellViews}
      </GridRow>
    );
  }

  renderDepartmentRow(rowData) {
    const cellViews = rowData.map((store, id) => {
      return (
        <TouchableOpacity key={id}>
          <Card styleName="flexible" style={styles.departmentItemCenter}>
            <Divider />
            <Image
              style={styles.departmentImage}
              styleName="medium-wide"
              source={{ uri: store.image_url }}
            />
            <View styleName="vertical h-center">
              <Subtitle>{store.name}</Subtitle>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });

    return (
      <GridRow columns={2} style={styles.itemBackground}>
        {cellViews}
      </GridRow>
    );
  }

  handleAddItemClick(upc) {
    let cartId = this.state.cart ? this.state.cart._id : "";
    const cartItem = this.state.cartItems.filter(p => p.upc === upc)[0];
    const product = this.state.featuredProducts.filter(p => p.upc === upc)[0];

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

        const cartResponse = await fetch(
          `https://api.getsuperez.com/carts/${currentUser.customer_id}`
        );

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

        const cartItemsResponse = await fetch(
          `https://api.getsuperez.com/carts/items/${cartId}`
        );

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

      const cartItemsResponse = await fetch(
        `https://api.getsuperez.com/carts/items/${cartId}`
      );

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
    const product = this.state.featuredProducts.filter(p => p.upc === upc)[0];

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

        const cartResponse = await fetch(
          `https://api.getsuperez.com/carts/${currentUser.customer_id}`
        );

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

        const cartItemsResponse = await fetch(
          `https://api.getsuperez.com/carts/items/${cartId}`
        );

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
    const {
      popularProducts,
      featuredProducts,
      productsByDepartment,
      departments,
      cartItems,
      cartItemsCount,
      animating
    } = this.state;

    const groupedDataPopularProducts = GridRow.groupByRows(
      popularProducts,
      2,
      () => {
        return 1;
      }
    );
    const groupedDataFeaturedProducts = GridRow.groupByRows(
      featuredProducts,
      2,
      () => {
        return 1;
      }
    );
    const groupedDataProductsByDepartment = GridRow.groupByRows(
      productsByDepartment,
      2,
      () => {
        return 1;
      }
    );

    const groupedDepartments = GridRow.groupByRows(departments, 2, () => {
      return 1;
    });

    const storeName =
      this.props.navigation.getParam("storeName", null) || "Bravo Supermarket";

    return (
      <Screen>
        <MainHeader
          isHome={true}
          styleName="inline"
          screenName="HomeScreen"
          title={storeName}
          cartItemsCount={cartItemsCount}
          onPressSidebar={() => this.props.navigation.toggleDrawer()}
          onPressCart={() =>
            this.props.navigation.navigate("MyCart", {
              cartItems: cartItems
            })
          }
          onPressChooseStore={() =>
            this.props.navigation.navigate("ChooseStore")
          }
        />
        <Divider styleName="line" />
        {animating ? (
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
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={groupedDepartments}
              renderRow={this.renderDepartmentRow}
            />
            <Divider styleName="section-header">
              <Caption>Featured Products</Caption>
              <Caption style={styles.actionCaption}>VIEW ALL &gt;</Caption>
            </Divider>
            <ListView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={groupedDataFeaturedProducts}
              renderRow={this.renderRow}
            />
            <Divider styleName="section-header">
              <Caption>Popular in Brooklyn</Caption>
              <Caption style={styles.actionCaption}>VIEW ALL &gt;</Caption>
            </Divider>
            <ListView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={groupedDataPopularProducts}
              renderRow={this.renderRow}
            />
            <Divider styleName="section-header">
              <Caption>Featured in Grocery Department</Caption>
              <Caption style={styles.actionCaption}>VIEW ALL &gt;</Caption>
            </Divider>
            <ListView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={groupedDataProductsByDepartment}
              renderRow={this.renderRow}
            />
          </ScrollView>
        )}
        <Divider styleName="line" />
        <Divider styleName="line" />
      </Screen>
    );
  }
}

export default HomeScreen;

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
  },
  actionCaption: {
    color: "#FF5801"
  }
};
