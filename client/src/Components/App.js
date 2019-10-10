import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "../App.css";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Shop from "./shop/Shop";
import Header from "./Header";
import Chatbot from "./chatbot/Chatbot";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="main">
          <div className="view-details">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/shop" component={Shop} />
          </div>
          <Chatbot />
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
