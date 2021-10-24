import { createStackNavigator } from "react-navigation";
import {
  Home,
  DirectInfo,
  VoipInfo,
  IptvInfo,
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
    Home: {
      screen: Home,
      navigationOptions: drawerMenuConfig,
      route: Routes.Home
    },
    Payments: {
      screen: Payments,
      route: Routes.Payments
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
    DirectInfo: {
      screen: DirectInfo,
      route: Routes.DirectInfo
    },
    VoipInfo: {
      screen: VoipInfo,
      route: Routes.VoipInfo
    },
    IptvInfo: {
      screen: IptvInfo,
      route: Routes.IptvInfo
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
