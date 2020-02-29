import React from "react";
import "./Carousel.css";
import illustration1 from "../Assets/illus1.svg";
import illustration2 from "../Assets/illus2.svg";
import illustration3 from "../Assets/illus3.svg";
import illustration4 from "../Assets/illus4.svg";

function Carousell() {
  return (
    <div
      className="main-carousel"
      data-flickity='{"draggable": false, "prevNextButtons": false,"autoPlay": true, "wrapAround": true}'
    >
      <div className="carousel-cell">
        <img className="immg" src={illustration1}></img>
        <a className="illustext">Pilih snack box favoritmu</a>
      </div>
      <div className="carousel-cell">
        <img className="immg" src={illustration2}></img>
        <a className="illustext">Tentukan jumlah box dan lokasi</a>
      </div>
      <div className="carousel-cell">
        <img className="immg" src={illustration3}></img>
        <a className="illustext">Pilih cara pembayaran: Gopay, Ovo, atau m-Banking</a>
      </div>
      <div className="carousel-cell">
        <img className="immg" src={illustration4}></img>
        <a className="illustext">Ambil barang sesuai lokasi pilihanmu</a>
      </div>
    </div>
  );
}

export default Carousell;
