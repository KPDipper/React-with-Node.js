import React, { Component } from "react";
import Slider from "react-slick";

import './Recommend.css'

export default class Recommend extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      autoplay:true,
      autoplaySpeed:3000,
    //   centerMode:true,
    //   centerPadding: 50,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      
      <div className="container-fluid mx-auto  mt-5">
      <div className="text-center fs-3 mb-3">Recommendation</div>
        <Slider {...settings}>
        
          <div>
          
            <div className="slick-img-container">
              <img src="./img1.jpg" alt=""></img>
            </div>
          </div>
          <div>
            <div className="slick-img-container">
              <img src="./img2.jpg" alt=""></img>
            </div>
          </div>
          <div>
            <div className="slick-img-container">
              <img src="./img3.jpg" alt=""></img>
            </div>
          </div>
          <div>
            <div className="slick-img-container">
              <img src="./img2.jpg" alt=""></img>
            </div>
          </div>
          <div>
            <div className="slick-img-container">
              <img src="./img1.jpg" alt=""></img>
            </div>
          </div>
          <div>
            <div className="slick-img-container">
              <img src="./img1.jpg" alt=""></img>
            </div>
          </div>
          <div>
            <div className="slick-img-container">
              <img src="./img3.jpg" alt=""></img>
            </div>
          </div>
          <div>
            <div className="slick-img-container">
              <img src="./img2.jpg" alt=""></img>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
