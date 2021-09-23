import { createStackNavigator } from "react-navigation";
import {
  Payments,
  PayService,
  AutoPayment,
  PaymentHistory,
  Messages
} from "../../screens";
import { config, drawerMenuConfig } from "../config";
import { Routes } from "../../config";

export default createStackNavigator(
  {
    Payments: {
      screen: Payments,
      route: Routes.Payments,
      navigationOptions: drawerMenuConfig
    },
    Auto: {
      screen: AutoPayment,
      route: Routes.AutoPayment
    },
    PaymentsHistory: {
      screen: PaymentHistory,
      route: Routes.PaymentHistory
    },
    PaymentService: {
      screen: PayService,
      route: Routes.PaymentService
    },
    Messages: {
      screen: Messages,
      route: Routes.Messages,
      navigationOptions: {
        headerRight: null
      }
    }
  },
  config
);
