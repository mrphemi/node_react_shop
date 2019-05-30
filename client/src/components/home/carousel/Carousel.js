import React, { Component, Fragment } from "react";
import Slider from "react-slick";

import Item from "./SlideItem";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slide1 = process.env.PUBLIC_URL + "/assets/images/slide-01.jpg";
const slide2 = process.env.PUBLIC_URL + "/assets/images/slide-02.jpg";
const slide3 = process.env.PUBLIC_URL + "/assets/images/slide-03.jpg";

class Carousel extends Component {
   render() {
      const settings = {
         infinite: true,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1
      };
      return (
         <Slider {...settings}>
            <Item background={slide1} />
            <Item background={slide2} />
            <Item background={slide3} />
         </Slider>
      );
   }
}

export default Carousel;
