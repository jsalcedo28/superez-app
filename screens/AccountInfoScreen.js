import React, { Component } from "react";

import {
  ScrollView,
  TextInput,
  Text as TextNative
} from "react-native";

import {
  Screen,
  Subtitle,
  View,
  Row,
  Divider,
  Icon,
  NavigationBar,
  Button,
  Text
} from "@shoutem/ui";

class AccountInfoScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Screen styleName="paper">
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>Account Info</TextNative>
          </View>}
          styleName="inline"
          leftComponent={<Icon
            color='#FF5801'
            onPress={() => this.props.navigation.goBack()}
            name="back"
          />}
        />
        <Divider styleName="line" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Row>
            <View styleName="vertical">
              <Subtitle>Basic information</Subtitle>
              <TextInput
                style={styles.accountInput}
                placeholder={"First name"}
              />
              <TextInput
                style={styles.accountInput}
                placeholder={"Last name"}
              />
            </View>
          </Row>
          <Divider styleName="line" />
          <Row>
            <View styleName="vertical">
              <Subtitle>E-mail</Subtitle>
              <TextInput
                style={styles.accountInput}
                placeholder={"Enter your e-mail address"}
              />
            </View>
          </Row>
          <Divider styleName="line" />
          <Row>
            <View styleName="vertical">
              <Subtitle>Phone number</Subtitle>
              <TextInput
                style={styles.accountInput}
                placeholder={"Enter your contact number"}
              />
            </View>
          </Row>
          <Divider styleName="line" />
        </ScrollView>
        <Divider styleName="line" />
        <View styleName="horizontal">
          <Button
            styleName="full-width secondary"
            style={styles.saveButton}
            onPress={() => this.props.navigation.navigate("Settings")}
          >
            <Text>SAVE</Text>
          </Button>
        </View>
      </Screen>
    );
  }
}

export default AccountInfoScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  saveButton: {
    backgroundColor: "#FF5801",
    borderColor: "#FF5801"
  },
  accountInput: {
    width: 280,
    height: 50
  },
  accountCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  navigatorBarView: {
    flexDirection: "row"
  },
  navigatorBarText: {
    flexWrap: "wrap",
    textAlign: "center"
  }
};
