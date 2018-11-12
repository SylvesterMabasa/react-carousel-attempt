import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import "./carouselContainer.scss";
import CarouselImage from "../CarouselImage/carouselImage";

class CarouselContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: {},
      formattedSlides: [],
      listofSlides: [],
      nextSlide: {},
      prevSlide: {},
      images: []
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:4000/images/getAllImages`).then(res => {
      let listofSlides = res.data.data.map((item, key) => {
        return { ...item, ...{ key } };
      });

      let imageArray = listofSlides.map((item, key) => {
        return (
          <CarouselImage
            id={key}
            key={key}
            src={item.src}
            alt={item.alt}
            imgDescription={item.imgDescription}
            className={item.className}
            onClick={e => this.handleClick(e)}
          />
        );
      });

      this.setState({
        formattedSlides: imageArray,
        currentSlide: listofSlides[0],
        nextSlide: listofSlides.length > 1 ? listofSlides[1] : listofSlides[0],
        prevSlide: listofSlides[imageArray.length - 1],
        listofSlides
      });
    });
  }

  handleClick(e) {
    if (e.nativeEvent.offsetX > e.target.width / 2) {
      this.nextSlide();
    } else {
      this.prevSlide();
    }
  }

  nextSlide() {
    if (this.state.currentSlide.key === this.state.formattedSlides.length - 1) {
      this.setState({
        currentSlide: this.state.listofSlides[0],
        nextSlide: this.state.listofSlides[1],
        prevSlide: this.state.listofSlides[
          this.state.formattedSlides.length - 1
        ]
      });
      document.getElementById(this.state.nextSlide.key).scrollIntoView();
    } else {
      this.setState({
        currentSlide: this.state.listofSlides[this.state.currentSlide.key + 1],
        nextSlide:
          this.state.listofSlides[this.state.currentSlide.key + 2] !== undefined
            ? this.state.listofSlides[this.state.currentSlide.key + 2]
            : this.state.listofSlides[0],
        prevSlide: this.state.listofSlides[this.state.currentSlide.key]
      });
      document.getElementById(this.state.nextSlide.key).scrollIntoView();
    }
  }

  prevSlide() {
    if (this.state.currentSlide.key === 0) {
      this.setState({
        currentSlide: this.state.listofSlides[
          this.state.formattedSlides.length - 1
        ],
        nextSlide: this.state.listofSlides[this.state.currentSlide.key],
        prevSlide: this.state.listofSlides[
          this.state.formattedSlides.length - 2
        ]
      });
      document.getElementById(this.state.prevSlide.key).scrollIntoView();
    } else {
      this.setState({
        currentSlide: this.state.listofSlides[this.state.currentSlide.key - 1],
        nextSlide: this.state.listofSlides[this.state.currentSlide.key],
        prevSlide:
          this.state.listofSlides[this.state.currentSlide.key - 2] !== undefined
            ? this.state.listofSlides[this.state.currentSlide.key - 2]
            : this.state.listofSlides[this.state.formattedSlides.length - 1]
      });
      document.getElementById(this.state.prevSlide.key).scrollIntoView();
    }
  }

  render() {
    return (
      <div className="carouselContainer">
        <div className="leftArrow" onClick={() => this.prevSlide()}>
          <i className="fas fa-arrow-circle-left" />
          <span className="tooltiptext">
            {this.state.prevSlide.imgDescription}
          </span>
        </div>
        <div className="slider">{this.state.formattedSlides}</div>
        <div
          className="rightArrow"
          onClick={() => {
            this.nextSlide();
          }}
        >
          <i className="fas fa-arrow-circle-right" />
          <span className="tooltiptext">
            {this.state.nextSlide.imgDescription}
          </span>
        </div>
      </div>
    );
  }
}
export default CarouselContainer;
