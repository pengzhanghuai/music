import React, { Component } from 'react'
import "./Index.css"
import { NavLink, Switch, Route,Redirect } from "react-router-dom"
// import Index from "./components/views/Index"
import Recommend from "../pages/Recommend"
import Hotsong from "../pages/HotSong"
import Search from "../pages/Search"
export default class Index extends Component {
    render() {
        return (
            <div className="App">
                <div className="fixed">
                    <div className="header">
                        <span className="logo">云音乐</span>
                        <span className="downApp">下载APP</span>
                    </div>
                    <div className="nav">
                        <NavLink to="/recommend"><span className="nav_item">推荐</span></NavLink>
                        <NavLink to="/hotsong"><span className="nav_item">热歌榜</span></NavLink>
                        <NavLink to="/search"><span className="nav_item">搜索</span></NavLink>
                    </div>

                </div>
                <div className="show">
                    <Switch>
                        <Route path="/recommend" component={Recommend}></Route>
                        <Route path="/hotsong" component={Hotsong}></Route>
                        <Route path="/search" component={Search}></Route>
                        <Redirect path="" to="/recommend"></Redirect>
                    </Switch>
                </div>
            </div>
        )
    }
}
