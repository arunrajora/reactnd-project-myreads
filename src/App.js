import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home/Home.js";
import Search from "./Search/Search.js";
import "./App.css";

const BooksApp = () => (
  <div className="app">
    <Route exact path="/" component={Home} />
    <Route exact path="/search" component={Search} />
  </div>
);

export default BooksApp;
