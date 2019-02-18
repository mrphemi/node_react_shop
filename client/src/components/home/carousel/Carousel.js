import React, { Component } from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";

import "pure-react-carousel/dist/react-carousel.es.css";

import Item from "./SlideItem";

class Carousel extends Component {
   render() {
      return (
         <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={3}
            isPlaying={true}
         >
            <Slider>
               <Slide index={0}>
                  <Item background="orange" />
               </Slide>
               <Slide index={1}>
                  <Item background="orange" />
               </Slide>
               <Slide index={2}>
                  <Item background="orange" />
               </Slide>
            </Slider>
         </CarouselProvider>
      );
   }
}

export default Carousel;
