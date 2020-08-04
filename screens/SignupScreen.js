import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  TextInput,
  ScrollView
} from "react-native";

import {
  Button,
  Text,
  ImageBackground,
  Caption,
  View,
  Image,
  Divider as ShoutemDivider
} from "@shoutem/ui";

class SignupScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/grocery-background.png")}
        style={styles.containerBackground}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
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
              style={styles.signupInput}
              placeholder={"First name"}
              placeholderTextColor='#C5C5C5'
              underlineColorAndroid='#C5C5C5'
              selectionColor='#FF5801'
            />
            <TextInput
              style={styles.signupInput}
              placeholder={"Last name"}
              placeholderTextColor='#C5C5C5'
              underlineColorAndroid='#C5C5C5'
              selectionColor='#FF5801'
            />
            <TextInput
              style={styles.signupInput}
              placeholder={"Enter your email"}
              placeholderTextColor='#C5C5C5'
              underlineColorAndroid='#C5C5C5'
              selectionColor='#FF5801'
            />
            <TextInput
              style={styles.signupInput}
              placeholder={"Create password"}
              placeholderTextColor='#C5C5C5'
              underlineColorAndroid='#C5C5C5'
              selectionColor='#FF5801'
              secureTextEntry
            />
            <Button
              style={styles.signupButton}
              styleName="secondary"
              onPress={() => this.props.navigation.navigate("ChooseStore")}
            >
              <Text>SIGN UP</Text>
            </Button>
            <View styleName="horizontal space-between">
              <Caption
                style={styles.signupCaption}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                Already have an account? Log in</Caption>
            </View>
            <ShoutemDivider />
            <ShoutemDivider />
            <View styleName="horizontal space-between">
              <Caption>
                OR SIGN UP WITH</Caption>
            </View>
            <View styleName="vertical">
              <Button
                style={styles.facebookButton}
                styleName="secondary"
              >
                <Icon
                  name="facebook"
                  size={15}
                  color="white"
                />
                <Text>  FACEBOOK</Text>
              </Button>
              <Button
                style={styles.googleButton}
                styleName="secondary"
              >
                <Icon
                  name="google"
                  size={15}
                  color="white"
                />
                <Text>  GOOGLE</Text>
              </Button>
            </View>
          </View>
          <ShoutemDivider />
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default SignupScreen;

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
  signupInput: {
    width: 280,
    height: 50
  },
  signupButton: {
    width: 280,
    height: 50,
    backgroundColor: "#FF5801",
    borderColor: "#FF5801",
    marginTop: 10
  },
  facebookButton: {
    width: 280,
    backgroundColor: "#3b57a0",
    borderColor: "#3b57a0",
    height: 50,
    marginTop: 10
  },
  googleButton: {
    width: 280,
    backgroundColor: "#dc4439",
    borderColor: "#dc4439",
    height: 50,
    marginTop: 10
  },
  signupCaption: {
    color: "#FF5801",
    marginTop: 10
  },
  logoImage: {
    width: 250
  }
};
