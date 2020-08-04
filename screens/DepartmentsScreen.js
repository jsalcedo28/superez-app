import React, { Component } from "react";
import MainHeader from "../components/MainHeader";

import {
  ScrollView,
  ActivityIndicator
} from "react-native";

import {
  Screen,
  GridRow,
  TouchableOpacity,
  Subtitle,
  Card,
  Image,
  View,
  ListView,
  Divider
} from "@shoutem/ui";

class DepartmentsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.state = {
      departments: [],
      cartItemsCount: 0,
      animating: true
    };
  }

  componentWillMount() {
    this.setState({ animating: true });

    fetch("https://api.getsuperez.com/departments")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          departments: data,
          animating: false
        });

        fetch("https://api.myjson.com/bins/15daas")
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              cartItemsCount: data.length,
            });
          });
      });
  }

  renderRow(rowData) {
    const cellViews = rowData.map((department, id) => {
      return (
        <TouchableOpacity
          key={id}
          styleName="flexible"
          onPress={() => this.props.navigation.navigate("DepartmentCategories", {
            departmentName: department.name
          })}
        >
          <Card styleName="flexible" style={styles.departmentItemCenter}>
            <Image
              style={styles.departmentImage}
              styleName="medium-wide"
              source={{ uri: department.image_url }}
            />
            <View styleName="content">
              <Subtitle>{department.name}</Subtitle>
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
    const { departments, animating, cartItemsCount } = this.state;

    const groupedData = GridRow.groupByRows(departments, 2, () => { return 1; });

    return (
      <Screen>
        <MainHeader
          styleName='inline'
          screenName='DepartmentsScreen'
          title='Departments'
          cartItemsCount={cartItemsCount}
          onPressSidebar={() => this.props.navigation.toggleDrawer()}
          onPressCart={() => this.props.navigation.navigate("MyCart")}
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
        <Divider styleName="line" />
        <Divider styleName="line" />
      </Screen>
    );
  }
}

export default DepartmentsScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  departmentImage: {
    width: 112,
    height: 112
  },
  departmentItemCenter: {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
};
