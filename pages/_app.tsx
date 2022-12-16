import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { setupStore } from "@store/store";
import { SessionProvider } from "next-auth/react";
import "@styles/globals.sass";

const store = setupStore();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
