import React from "react";
import "./Carousell2.css";
import food1 from "../Assets/food1.jpg"
import food2 from "../Assets/food2.jpg"
import food3 from "../Assets/food3.jpg"
import food4 from "../Assets/food4.jpg"
import food5 from "../Assets/food5.jpg"
import food6 from "../Assets/food6.jpg"
import food7 from "../Assets/food7.jpeg"
import food8 from "../Assets/food8.jpg"

function Carousell2() {
  return (
    <div
      className="main-carousel2"
      data-flickity='{"autoPlay": true, "wrapAround": true, "freeScroll": true, "prevNextButtons": false,
      "pageDots": false}'
    >
      <div className="carousel-cell2">
        <img className="img" src={food1}></img>
      </div>
      <div className="carousel-cell2">
      <img className="img" src={food2}></img>
      </div>
      <div className="carousel-cell2">
      <img className="img" src={food3}></img>
      </div>
      <div className="carousel-cell2">
      <img className="img" src={food4}></img>
      </div>
      <div className="carousel-cell2">
      <img className="img" src={food5}></img>
      </div>
      <div className="carousel-cell2">
      <img className="img" src={food6}></img>
      </div>
      <div className="carousel-cell2">
      <img className="img" src={food7}></img>
      </div>
      <div className="carousel-cell2">
      <img className="img" src={food8}></img>
      </div>
    </div>
  );
}

export default Carousell2;
