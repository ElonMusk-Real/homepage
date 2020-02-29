import React from "react";
import "./Carousell3.css";

const style = {
  background: "white",
  width: "100%",
  height: "327px"
};

function Carousell3() {
  return (
    <div
      css={`
        background: white;
        margin: auto auto;
        z-index: 5;
        width: 80%;
        height: 327px;
      `}
      className="main-carousel3"
      data-flickity='{ "autoPlay": true, "draggable": false, "wrapAround": true, "prevNextButtons": true, "pageDots": false, "fade": true, "lazyLoad": true}'
    >
      <div className="carousel-cell3">
        <a>asdasd</a>
      </div>
      <div className="carousel-cell3"><a>asdasd</a></div>
      <div className="carousel-cell3"><a>asdasd</a></div>
    </div>
  );
}

export default Carousell3;
