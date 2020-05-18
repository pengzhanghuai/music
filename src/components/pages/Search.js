import React, { Component } from 'react'
import './Search.css'
import "./songlist.css"
export default class Search extends Component {
    componentDidMount() {
        fetch('/api/search/hot').then(response => response.json()).then(res => {
            this.setState({
                list: res.result.hots
            })
        })
    }
    state = {
        val: "",
        list: [],
        searchArr:[],
        isshow:true
    }
    changeVal(e) {
        this.setState({
            val: e.target.value
        })
    }
    addVal(i) {
        this.setState({
            val: this.state.list[i].first
        })
    }
    search(e) {
        if (e.keyCode === 13) {
            fetch('/api/search?keywords=' + e.target.value).then(res=>res.json()).then(res=>{           
                this.setState({
                    searchArr:res.result.songs,
                    isshow:!this.state.isshow
                })
            })
        }

    }
    toPlay(id){
        this.props.history.push('/play/'+id)
    }
    render() {
        return (
            <div className="search">
                <div className="ipt">
                    <i className="icon"></i>
                    <input type="text" onKeyUp={(e) => this.search(e)} onChange={(e) => this.changeVal(e)} value={this.state.val} id="search" placeholder="搜索歌曲、歌手、专辑" />
                </div>
                <div className="search_hot" style={this.state.isshow===true?{display:'block'}:{display:'none'}}>
                    <h2>热门搜索</h2>
                    <ul>
                        {this.state.list.map((item, index) => {
                            return <li key={index} onClick={() => this.addVal(index)}>{item.first}</li>
                        })}
                    </ul>
                </div>
                <div className="songlist" style={this.state.isshow===false?{display:'block'}:{display:'none'}}>
                    {this.state.searchArr.map((item, index) => {
                        return <div className="item" key={index} onClick={()=>this.toPlay(item.id)}>
                            <div className="left">{index + 1 < 10 ? '0' + (index + 1) : index + 1}</div>
                            <div className="middle">
                                <div className="song">{item.name}</div>
                                <div className="singer">
                                    <i className="icon"></i>
                                    {item.artists[0].name}-{item.album.name}
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
