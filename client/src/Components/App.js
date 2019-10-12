import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "../App.css";

import Landing from "./pages/Landing";
import Header from "./pages/Header";
import Chatbot from "./chatbot/Chatbot";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="main">
          <div className="view-details">
            <Header />
            <div className="content-view">
              <Route exact path="/" component={Landing} />
            </div>
          </div>
          <Chatbot />
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
