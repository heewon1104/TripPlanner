// PlaceImageBox.js

import React from "react";
import PropTypes from "prop-types";

const PlaceImageBox = ({ imageUrl, placeName }) => {
  return (
    <div className="place-image-box">
      <img src={imageUrl} alt={placeName} />
      <div className="place-name">{placeName}</div>
    </div>
  );
};

PlaceImageBox.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  placeName: PropTypes.string.isRequired,
};

export default PlaceImageBox;
