// PlaceImageBox.js
import styles from "./placeImgBox.module.css";
import React from "react";

const PlaceImageBox = ({ imageUrl, placeName }) => {
  return (
    <div>
      <img className={styles.placeimg} src={imageUrl} alt={placeName} />
      <p className={styles.placename}>{placeName}</p>
    </div>
  );
};

export default PlaceImageBox;
