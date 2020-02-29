import React, { Component } from "react";
import Slider from "react-slick";
import "./Carousell3.css";
import foto from "../Assets/Group4.svg";
import foto1 from "../Assets/Group5.svg";
import foto2 from "../Assets/Group6.svg";

const styles = {
  height: "520px",
  width: "100%",
  margin: "auto"
};

const styless = {
  height: "520px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const stylesss = {
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  fontFamily: "Roboto Slab",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "28px",
  color: "#faf0f0"
};

const stylessss = {
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  fontFamily: "Roboto Slab",
  fontStyle: "normal",
  fontWeight: "regular",
  fontSize: "18px",
  color: "#faf0f0"
};

export default class Carousell4 extends Component {
  render() {
    const settings = {
      dots: false,
      fade: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings} style={styles}>
        <div style={styless}>
          <div className="photo"></div>
          <a style={stylesss}>
            Natadanus inovatif banget! Semua organisasi dan kepanitian di 4500
            perguruan tinggi harus banget coba sih..
          </a>{" "}
          <br></br>
          <a style={stylessss}>-Full time danuser</a>
        </div>
        <div style={styless}>
          <div className="photo"></div>
          <a style={stylesss}>
            Nyesel baru tau natadanus akhir akhir ini huhu bersyukur banget bisa
            bermitra sama natadanus. Oke oce pokonya.
          </a>
          <br></br>
          <a style={stylessss}>-Penjual Basreng</a>
        </div>
        <div style={styless}>
          <div className="photo"></div>
          <a style={stylesss}>
            Awalnya mikir apa ya yang bisa bikin danusan gua makin efektif.
            Ketemu natadanus langsung suka banget sama fitur-fiturnya dan
            danusan makin efektif!
          </a>
          <br></br>
          <a style={stylessss}>-Mahasiswa tingkat akhir</a>
        </div>
      </Slider>
    );
  }
}
