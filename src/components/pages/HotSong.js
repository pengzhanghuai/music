import React, { Component } from 'react'
import "./hotsong.css"
export default class HotSong extends Component {
    componentDidMount() {
        fetch("/api/top/list?idx=1").then(res => res.json()).then(res => {
            let mouth = new Date(res.playlist.updateTime).getMonth() + 1;
            let date = new Date(res.playlist.updateTime).getDate();
            let time = `${mouth < 10 ? '0' + mouth : mouth}月${date < 10 ? '0' + date : date}日`
            this.setState({
                hotArr: res.playlist.tracks,
                time: time
            })
        })
    }
    state = {
        hotArr: [],
        time: ''
    }
    toPlay(id){
        this.props.history.push('/play/'+id)
    }
    render() {
        return (
            <div className="hotsong">
                <div className="banner">
                    <div className="pic">
                        <div className="cloud"></div>
                        <p className="date">更新日期：{this.state.time}</p>
                    </div>
                </div>
                <div className="songlist">
                    {this.state.hotArr.map((item, index) => {
                        return <div className="item" key={item.id} onClick={()=>this.toPlay(item.id)}>
                            <div className="left">{index + 1 < 10 ? '0' + (index + 1) : index + 1}</div>
                            <div className="middle">
                                <div className="song">{item.name}{item.alia.length ? '(' + item.alia + ')' : ''}</div>
                                <div className="singer">
                                    <i className="icon"></i>
                                    {item.ar[0].name}-{item.name}
                                </div>
                            </div>
                            <div className="right">
                                <span></span>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}
