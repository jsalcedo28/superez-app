import React, { Component } from "react";

import {
  TextInput,
  ImageBackground
} from "react-native";

import {
  Button,
  Text,
  Caption,
  View,
  Image
} from "@shoutem/ui";

// const zipcodes = require('zipcodes');

class ZipCodeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      zipCode: ""
    };

    this.validateZipCode = this.validateZipCode.bind(this);
  }

  validateZipCode() {
    // const zipCodeStores = [11211];

    // let isValidDistance = zipCodeStores.some(function(zipCode) {
    //   return zipcodes.distance(zipCode, this.state.zipCode) <= 5;
    // });

    // if (isValidDistance) {
    //   this.props.navigation.navigate('Signup');
    // } else {
    //   this.props.navigation.navigate('NotifyMe');
    // }
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/grocery-background.png")}
        style={styles.containerBackground}
      >
        <View
          style={styles.container}
          styleName="vertical h-center v-start"
        >
          <Image
            style={styles.logoImage}
            styleName="medium-wide"
            source={require("../assets/images/logo.png")}
          />
          <TextInput
            style={styles.zipCodeInput}
            placeholder={"Enter zip code"}
            placeholderTextColor='#C5C5C5'
            underlineColorAndroid='#C5C5C5'
            selectionColor='#FF5801'
            // onChangeText={(zipCode) => this.setState({zipCode})}
          />
          <Button
            style={styles.zipCodeButton}
            styleName="secondary"
            onPress={this.validateZipCode}
          >
            <Text>CONTINUE</Text>
          </Button>
          <View styleName="horizontal space-between">
            <Caption
              style={styles.zipCodeCaption}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              Already have an account? Log in</Caption>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default ZipCodeScreen;

const styles = {
  containerBackground: {
    flex: 1,
    width: null,
    height: null
  },
  container: {
    flex: 1,
    marginTop: 125
  },
  zipCodeInput: {
    width: 280,
    height: 50
  },
  zipCodeButton: {
    width: 280,
    height: 50,
    backgroundColor: "#FF5801",
    borderColor: "#FF5801",
    marginTop: 10
  },
  zipCodeCaption: {
    color: "#FF5801",
    marginTop: 10
  },
  logoImage: {
    width: 250
  }
};
