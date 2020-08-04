import React, { Component } from "react";

import {
  ScrollView,
  ActivityIndicator,
  Text as TextNative
} from "react-native";

import {
  Screen,
  Divider,
  View,
  NavigationBar,
  Icon
} from "@shoutem/ui";

class SearchScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      animating: true
    };
  }

  render() {
    const { animating } = this.state;

    return (
      <Screen>
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>Search</TextNative>
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
            </ScrollView>
          )
        }
        <Divider styleName="line" />
        <Divider styleName="line" />
      </Screen>
    );
  }
}

export default SearchScreen;

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
  }
};
