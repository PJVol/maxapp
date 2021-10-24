import React from "react";
import { StatusBar, View, Text, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView
} from "react-navigation";
import PropTypes from "prop-types";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import { Page, RoundButton } from "../../components";
import { HomeStack } from "./../HomeStack";
import { PaymentsStack } from "./../PaymentsStack";
import { strings } from "../../utils";
import { Colors } from "../../config";
import store, { CLEAR_AGREEMENT, LOGOUT } from "../../store";
import { Routes } from "../../config";
import styles from "./styles";

const DrawerComponent = props => (
  <ScrollView
    overScrollMode="never"
    bounces={false}
    showsVerticalScrollIndicator={false}
  >
    <View style={styles.safeArea}>
      <SafeAreaView
        forceInset={{
          top: "always",
          horizontal: "never"
        }}
      >
        <View style={styles.drawerHeader}>
          <Text style={styles.menu}>{strings("MENU")}</Text>
          <RoundButton
            containerStyle={styles.close}
            onPress={() => props.navigation.closeDrawer(0)}
            icon={
              <FontAwesome5Pro
                style={styles.closeIcon}
                name="times"
                color={Colors.GREY}
              />
            }
          />
        </View>

        <DrawerItems
          {...props}
          onItemPress={route => {
            props.navigation.closeDrawer(0);
            if (route.route.key === "SelectAgreement") {
              store.dispatch({ type: CLEAR_AGREEMENT });
              props.navigation.navigate(Routes.AgreementSelection);
            } else if (route.route.key === "Logout") {
              store.dispatch({
                type: LOGOUT,
                payload: {
                  callback: () => {
                    props.navigation.navigate(Routes.AgreementAuth);
                  }
                }
              });
            } else {
              props.navigation.navigate(route.route.key);
            }
          }}
        />
      </SafeAreaView>

      <View style={styles.drawerFooter}>
        <Text style={styles.infoHead}>
          {strings("AGR_NUM") + store.getState().info.agreement}
        </Text>
        <Text style={styles.infoText}>{store.getState().info.person}</Text>
      </View>
    </View>
  </ScrollView>
);

DrawerComponent.displayName = "DrawerComponent";
DrawerComponent.propTypes = {
  navigation: PropTypes.object
};

const AppDrawer = createDrawerNavigator(
  {
    HomeStack: {
      screen: HomeStack,
      route: Routes.HomeStack,
      navigationOptions: () => ({ drawerLabel: strings("MENU_HOME") })
    },
    PaymentsStack: {
      screen: PaymentsStack,
      route: Routes.PaymentsStack,
      navigationOptions: () => ({ drawerLabel: strings("MENU_PAYMENTS") })
    },
    SelectAgreement: {
      screen: Page,
      navigationOptions: () => ({
        drawerLabel: () => {
          return store.getState().info.agreements.length > 1
            ? strings("SELECT_AGREEMENT")
            : null;
        }
      })
    },
    Logout: {
      screen: Page,
      navigationOptions: () => ({ drawerLabel: strings("LOGOUT") })
    }
  },
  {
    drawerType: "slide",
    edgeWidth: Dimensions.get("window").width,
    drawerBackgroundColor: Colors.MENU_BACKGROUND,
    backBehavior: "none",
    contentOptions: {
      activeTintColor: Colors.WHITE_TEXT,
      inactiveTintColor: Colors.LIGHT_TEXT,
      activeBackgroundColor: Colors.MENU_ACTIVE_BACKGROUND,
      labelStyle: styles.label
    },
    contentComponent: props => <DrawerComponent {...props} /> // eslint-disable-line
  }
);

const defaultGetStateForAction = AppDrawer.router.getStateForAction;

AppDrawer.router.getStateForAction = (action, state) => {
  if (action.willShow !== undefined && !action.willShow) {
    StatusBar.setBarStyle("dark-content");
  }

  if (action.willShow !== undefined && action.willShow) {
    StatusBar.setBarStyle("light-content");
  }

  return defaultGetStateForAction(action, state);
};

export { AppDrawer };
