import React from "react";
import Layout from "./components/Layout";

//components

//wrappers
import { useWrapRoutes } from "./wrappers/wrapRoute";

function App() {
  const wrapRoutes = useWrapRoutes(false);

  return <>{wrapRoutes}</>;
}

export default App;
