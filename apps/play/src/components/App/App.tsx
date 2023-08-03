"use client";
import { useState } from "react";
import { Header } from "../Header/Header";
import { store } from "../../store/store";
import { Provider } from "react-redux";

export default function App({ children }: { children: React.ReactNode }) {
  let [loginId, setLoginId] = useState("");

  return (
    <Provider store={store}>
      <main>
        <Header />
        {children}
      </main>
    </Provider>
  );
}
