import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import axios from  "axios"
Component.prototype.axios = axios
ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>
  ,
  document.getElementById('root')
);

