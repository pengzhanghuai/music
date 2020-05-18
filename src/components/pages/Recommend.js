import React, { Component } from 'react'
import "./recommend.css"
import AwesomeSwiper from 'react-awesome-swiper';
const config = {
    // 自动循环播放
    loop: true,
    // 自动播放
    autoplay: {
        delay: 3000,//3S播放一次
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
    // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading
    lazy: true,//是否懒加载
    speed: 1000,//动画速度
    navigation: {
        nextEl: '.swiper-button-next',//左边点击按钮
        prevEl: '.swiper-button-prev',//右边
    },
    pagination: { //启用分页器，圆点
        el: '.swiper-pagination',
        bulletElement: 'li',
        hideOnClick: true,
        clickable: true,//是否可以点击
    },
    // 监听图片切换
    // on: {
    //     slideChange: function () {
    //         console.log(this.activeIndex);
    //     },
    // },
};
export default class Recommend extends Component {
    state = {
        sheetArr: [],
        songArr: [],
        bannerArr: []
    }
    componentDidMount() {
        fetch('/api/personalized?limit=6').then(response => response.json()).then(res => {
            // console.log(res);

            this.setState({
                sheetArr: res.result
            })
        })
        fetch('/api/personalized/newsong').then(response => response.json()).then(res => {
            // console.log(res.result);
            this.setState({
                songArr: res.result
            })
            // console.log(this.state.songArr);
        })
        fetch('/api/banner').then(res => res.json()).then(res => {
            // console.log(res.banners);
            this.setState({
                bannerArr: res.banners
            })
        })
    }
    toDetail(id){
        this.props.history.push('/sheetdetail/'+id)
    }
    toPlay(id){
        this.props.history.push('/play/'+id)
    }
    render() {
        return (
            <div className="recommend">
                <div className="banner">
                    <AwesomeSwiper ref={ref => (this.swiperRef = ref)} config={config} className="your-classname">
                        <div className="swiper-wrapper">
                            {
                                this.state.bannerArr.map((item, index) => {
                                    // console.log(item);
                                    
                                    return <div className="swiper-slide" key={index}><img src={item.imageUrl} alt="" /></div>;
                                })
                            }
                        </div>
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                        <div className="swiper-pagination"></div>
                    </AwesomeSwiper>
                </div>
                <div className="wrapper">
                    <h2>推荐歌单</h2>
                    <div className="sheetlist">
                        {this.state.sheetArr.map(item => {
                            // console.log(item);
                            
                            return <div className="item" key={item.id} onClick={()=>this.toDetail(item.id)}>
                                <div className="img">
                                    <img src={item.picUrl} alt="" />
                                </div>
                                <p className="title">{item.name}</p>
                            </div>
                        })}
                    </div>
                </div>
                <div className="wrapper">
                    <h2>最新音乐</h2>
                    <div className="songlist">
                        {this.state.songArr.map(item => {
                            return <div className="item" key={item.id} onClick={()=>this.toPlay(item.id)}>
                                <div className="info">
                                    <div className="song">
                                        <span>{item.song.name}{item.song.alias}</span>
                                        <span></span>
                                    </div>
                                    <div className="singer">
                                        <i className="icon"></i>
                                        {/* <span>{item.song.artists[0].name}</span>-{item.name} */}
                                        {item.song.artists.map((d, index) => {
                                            return <span key={index}>{d.name}
                                                {item.song.artists.length > 1 && (index + 1) !== item.song.artists.length ? <i> / </i> : ""}
                                            </span>
                                        })}-{item.name}
                                    </div>
                                </div>
                                <div className="goplay">
                                    <span></span>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
