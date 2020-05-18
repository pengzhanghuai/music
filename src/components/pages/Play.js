import React, { Component } from 'react'
import "./play.css"
import $ from "jquery"
export default class Play extends Component {
    componentDidMount() {
        this.formatTime()
        let id = this.props.match.params.id;
        fetch('/api/song/detail?ids=' + id).then(res => res.json()).then(res => {
            this.setState({
                songurl: 'https://music.163.com/song/media/outer/url?id=' + id + '.mp3 ',
                songimg: res.songs[0].al.picUrl,
                songDesc: res.songs[0].name,
                singerDesc: res.songs[0].ar[0].name
            })
        })
        fetch('/api/lyric?id=' + id).then(res => res.json()).then(res => {
            // console.log(res.lrc.lyric);
            let lyricObj = this.getLyric(res.lrc.lyric)
            this.setState({
                songlyric: lyricObj
            })
        })
    }
    state = {
        songurl: '',
        songimg: '',
        songlyric: [],
        songDesc: '',
        singerDesc: '',
        currentTime: '00:00'
    }
    goback() {
        this.props.history.go(-1)
    }
    play() {
        let audio = this.refs.audios;
        if (audio.paused) {
            audio.play()
            this.refs.top.style.transform = "rotate(0deg)"
            this.refs.start.style.display = "none"
            this.refs.songImg.className = "songImg imgRotate"
            audio.ontimeupdate = () => {
                // console.log(audio.currentTime);
                let nowTime = this.formatTime(audio.currentTime)
                if (nowTime in this.state.songlyric) {
                    this.setState({
                        currentTime: nowTime
                    }, () => {
                        let active = document.getElementsByClassName('active')[0]
                        let num = $('.box').children().index(active)
                        let offSet = 1
                        if (active) {
                            if (active.offsetTop > offSet) {
                                let sum = offSet * (num -1)
                                $('.box').css('transform', `translateY(-${sum}rem)`)
                            }
                        }
                    })
                }
            }
        } else {
            audio.pause()
            this.refs.top.style.transform = "rotate(-15deg)"
            this.refs.start.style.display = "block"
            this.refs.songImg.className = "songImg stopImg"
        }
    }
    getLyric(val) {
        let reg = /\[(.*)](.*)/g
        let obj = {}
        val.replace(reg, (a, b, c) => {
            b = b.slice(0, 5);
            obj[b] = c;
        })
        return obj;
    }
    formatTime(v) {
        let m = (Math.floor(v / 60) + '').padStart(2, '0')
        let s = (Math.floor(v % 60) + '').padStart(2, '0')
        // console.log(`${m}:${s}`)
        return `${m}:${s}`
    }
    render() {

        return (
            <div className="play">
                <audio ref="audios" src={this.state.songurl}></audio>
                <div className="back" onClick={() => this.goback()}>&lt;</div>
                <div className="top" ref="top"></div>
                <div className="disc" onClick={() => this.play()}>
                    <div className="disc_img">
                        <img ref="songImg" className="songImg" src={this.state.songimg} alt="" />
                        <i className="icon" ref="start"></i>
                    </div>
                </div>
                <div className="songlyric">
                    <div className="title">
                        {this.state.songDesc}-{this.state.singerDesc}
                    </div>
                    <div className="lyric">
                        <div className="box">
                            {
                                Object.entries(this.state.songlyric).map((item, index) => {
                                    return this.state.currentTime === item[0] ?
                                        <p key={index} className="active">{item[1]}</p> :
                                        <p key={index}>{item[1]}</p>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
