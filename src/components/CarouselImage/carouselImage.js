import React, { Component } from "react";
import PropTypes from "prop-types";

import "./carouselImage.scss";

class CarouselImage extends Component {
  render() {
    const {
      src,
      alt,
      linkTo,
      imgDescription,
      imagewidth,
      onClick,
      id
    } = this.props;

    return (
      <div id={id} className="slide" style={{ float: "left" }}>
        {linkTo ? (
          <a href={linkTo}>
            <img src={src} alt={alt} width={imagewidth} onClick={onClick} />
          </a>
        ) : (
          <img src={src} alt={alt} width={imagewidth} onClick={onClick} />
        )}
        <p>{imgDescription}</p>
      </div>
    );
  }
}

CarouselImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  linkTo: PropTypes.string,
  imgDescription: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string
};
CarouselImage.defaultProps = {
  imagewidth: "100%"
};

export default CarouselImage;
