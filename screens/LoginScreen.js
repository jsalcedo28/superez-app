import React, { Component } from "react";
import { authorize } from "react-native-app-auth";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  TextInput,
  ScrollView,
  Alert
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

const config = {
  issuer: "https://auth.getsuperez.com",
  clientId: "native.code",
  redirectUrl: "com.superez-app:/oauthredirect",
  scopes: ["openid", "profile"]
};

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      hasLoggedInOnce: false,
      accessToken: "",
      accessTokenExpirationDate: "",
      refreshToken: ""
    };
  }

  authorize = async () => {
    try {
      const authState = await authorize(config);

      this.setState({
        hasLoggedInOnce: true,
        accessToken: authState.accessToken,
        accessTokenExpirationDate: authState.accessTokenExpirationDate,
        refreshToken: authState.refreshToken
      });
    } catch (error) {
      Alert.alert("Failed to log in", error.message);
    }
  }

  render() {
    const { accessToken, hasLoggedInOnce } = this.state;

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
            {accessToken ? (
              <View>
                <Image
                  style={styles.logoImage}
                  styleName="medium-wide"
                  source={require("../assets/images/logo.png")}
                />
                <TextInput
                  style={styles.loginInput}
                  placeholder={"Enter your email"}
                  placeholderTextColor='#C5C5C5'
                  underlineColorAndroid='#C5C5C5'
                  selectionColor='#FF5801'
                />
                <TextInput
                  style={styles.loginInput}
                  placeholder={"Your password"}
                  placeholderTextColor='#C5C5C5'
                  underlineColorAndroid='#C5C5C5'
                  selectionColor='#FF5801'
                  secureTextEntry
                />
              </View>
            ) : (
              <Text>{hasLoggedInOnce ? "Goodbye." : "Hello, stranger."}</Text>
            )}
            <Button
              style={styles.loginButton}
              styleName="secondary"
              onPress={this.authorize}
            >
              <Text>LOG IN</Text>
            </Button>
            <View styleName="horizontal space-between">
              <Caption
                style={styles.loginCaption}
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
              >Forgot your password?               </Caption>
              <Caption
                style={styles.loginCaption}
                onPress={() => this.props.navigation.navigate("Signup")}
              >
                Register now</Caption>
            </View>
            <ShoutemDivider />
            <ShoutemDivider />
            <View styleName="horizontal space-between">
              <Caption>
                OR SIGN IN WITH</Caption>
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

export default LoginScreen;

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
  loginInput: {
    width: 280,
    height: 50
  },
  loginButton: {
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
  loginCaption: {
    color: "#FF5801",
    marginTop: 10
  },
  logoImage: {
    width: 250
  }
};
