import React from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Spells from "./pages/Spells";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/spells" component={Spells} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
