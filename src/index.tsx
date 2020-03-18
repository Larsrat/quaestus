import { registerRootComponent } from "expo";
import App from "./App";
import { decode, encode } from "base-64";

if (!(global as any).btoa) {
  (global as any).btoa = encode;
}

if (!(global as any).atob) {
  (global as any).atob = decode;
}

registerRootComponent(App);
