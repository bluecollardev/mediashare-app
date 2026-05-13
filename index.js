import "expo-dev-client";

import { registerRootComponent } from "expo";

import App from "./App";

// Silence react-native-paper v5-rc withTheme ref warning — the HOC doesn't forwardRef.
const _origConsoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("Function components cannot be given refs") &&
    args.some((a) => typeof a === "string" && a.includes("withTheme("))
  ) {
    return;
  }
  _origConsoleError(...args);
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
