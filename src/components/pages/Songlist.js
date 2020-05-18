import React, { Component } from 'react'
import "./songlist.css"
export default class Songlist extends Component {
    state = {
        arr: [],
        img: '',
        tit: ""
    }
    componentDidMount() {
        fetch('/api/playlist/detail?id=' + this.props.match.params.id).then(res => res.json()).then(res => {
            this.setState({
                arr: res.playlist.tracks,
                img: res.playlist.coverImgUrl,
                tit: res.playlist.name
            })
        })
    }
    goback() {
        this.props.history.go(-1)
    }
    toPlay(id) {
        this.props.history.push('/play/' + id)
    }
    render() {
        return (
            <div className="hot">
                <div className="back" onClick={() => this.goback()}>&lt;</div>
                <div className="banner" style={{ background: 'url(' + this.state.img + ')' }}>
                </div>
                <div className="little">
                    <div className="pic">
                        <div className="cloud" style={{ background: 'url(' + this.state.img + ')' }}></div>
                    </div>
                    <p>{this.state.tit}</p>
                </div>
                <div className="songlist">
                    {this.state.arr.map((item, index) => {
                        return <div className="item" key={index} onClick={() => this.toPlay(item.id)}>
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
