import { createStackNavigator } from "react-navigation";
import {
  fromTop,
  fromRight,
  fromLeft,
  fromBottom
} from "react-navigation-transitions";
import { AuthStack } from "./../AuthStack";
import { AppDrawer } from "./../AppDrawer";
import { Pinpad } from "./../Pinpad";
import { Routes } from "../../config";

const transitionConfig = nav => {
  const { scene, index, scenes } = nav;
  const lastSceneIndex = scenes[scenes.length - 1].index;
  const toIndex = index;

  if (
    scenes[scenes.length - 1].route.routeName === Routes.PinPad &&
    scenes[toIndex].route.routeName === Routes.AuthStack
  ) {
    return fromLeft(200);
  }
  if (scenes[scenes.length - 1].route.routeName === Routes.PinPad) {
    return fromTop(200);
  }

  if (lastSceneIndex - toIndex > 1) {
    if (scene.index === toIndex) return;
    if (scene.index !== lastSceneIndex) return { opacity: 0 };
    return fromRight(200);
  }

  return fromBottom(200);
};

export default createStackNavigator(
  {
    Auth: {
      screen: AuthStack,
      route: Routes.AuthStack
    },
    Main: {
      screen: AppDrawer,
      route: Routes.MainNavigator
    },
    PinpadMain: {
      screen: Pinpad,
      route: Routes.PinPad
    }
  },
  {
    defaultNavigationOptions: () => ({ gesturesEnabled: false }),
    headerMode: "none",
    transitionConfig
  }
);
