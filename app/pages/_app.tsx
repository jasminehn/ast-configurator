import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../state/store";
import "../styles/globals.css";

// Providing FormContext across App
function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  if (typeof window != "undefined" && window.Cypress) {
  // @ts-ignore
    window.store = store
  }
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
