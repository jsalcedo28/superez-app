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

class AddressScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Screen styleName="paper">
        <NavigationBar
          centerComponent={<View style={styles.navigatorBarView}>
            <TextNative style={styles.navigatorBarText}>Address</TextNative>
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
                style={styles.addressInput}
                placeholder={"Address line 1"}
              />
              <TextInput
                style={styles.addressInput}
                placeholder={"Address line 2"}
              />
              <TextInput
                style={styles.addressInput}
                placeholder={"City"}
              />
              <TextInput
                style={styles.addressInput}
                placeholder={"State"}
              />
              <TextInput
                style={styles.addressInput}
                placeholder={"Zip code"}
              />
            </View>
          </Row>
          <Divider styleName="line" />
          <Row>
            <View styleName="vertical">
              <Subtitle>Phone number</Subtitle>
              <TextInput
                style={styles.addressInput}
                placeholder={"Enter your contact number"}
              />
            </View>
          </Row>
          <Divider styleName="line" />
          <Row>
            <View styleName="vertical">
              <Subtitle>Instructions</Subtitle>
              <TextInput
                style={styles.addressInput}
                placeholder={"Place some specific note"}
              />
            </View>
          </Row>
        </ScrollView>
        <Divider styleName="line" />
        <View styleName="horizontal">
          <Button
            styleName="full-width secondary"
            style={styles.saveButton}
            onPress={() => this.props.navigation.navigate("ChooseAddress")}
          >
            <Text>SAVE</Text>
          </Button>
        </View>
      </Screen>
    );
  }
}

export default AddressScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  saveButton: {
    backgroundColor: "#FF5801",
    borderColor: "#FF5801"
  },
  addressInput: {
    width: 280,
    height: 50
  },
  addressCenter: {
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
