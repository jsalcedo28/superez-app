import React, { Component } from "react";

import {
  TextInput
} from "react-native";

import {
  Button,
  Text,
  ImageBackground,
  Caption,
  View,
  Image,
  Divider
} from "@shoutem/ui";

class ForgotPasswordScreen extends Component {
  static navigationOptions = {
    header: null
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
          <View style={styles.textWrap}>
            <Caption style={styles.textCenter}>We will send you a link to reset your password.</Caption>
          </View>
          <Divider />
          <TextInput
            style={styles.notifyMeInput}
            placeholder={"Enter your email"}
            placeholderTextColor='#C5C5C5'
            underlineColorAndroid='#C5C5C5'
            selectionColor='#FF5801'
          />
          <Button
            style={styles.notifyMeButton}
            styleName="secondary"
          >
            <Text>RESET PASSWORD</Text>
          </Button>
          <View styleName="horizontal space-between">
            <Caption
              style={styles.notifyMeCaption}
              onPress={() => this.props.navigation.navigate("Login")}
            >Already have an account? Log in</Caption>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default ForgotPasswordScreen;

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
  notifyMeInput: {
    width: 280,
    height: 50
  },
  notifyMeButton: {
    width: 280,
    height: 50,
    backgroundColor: "#FF5801",
    borderColor: "#FF5801",
    marginTop: 10
  },
  notifyMeCaption: {
    color: "#FF5801",
    marginTop: 10
  },
  logoImage: {
    width: 250
  },
  textWrap: {
    width: "80%"
  },
  textCenter: {
    textAlign: "center"
  }
};
