import React from "react";
import "aos/dist/aos.css";
import "./Scroll.css";
import AOS from "aos";
import checklist from "../Assets/checklist.svg";
import orderstatus from "../Assets/orderstatus.svg";
import destinationpoint from "../Assets/destinationpoint.svg";

const asdasd = {
  justifyContent: "center",
  alignItems: "center",
  display: "grid",
  fontSize: "40px",
  backgroundColor: "green",
  height: "300px"
};

class Scroll extends React.Component {
  render() {
    AOS.init({
      offset: 120, // offset (in px) from the original trigger point
      delay: 1000, // values from 0 to 3000, with step 50ms
      duration: 1000, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom" // defines which position of the element regarding to window should trigger the animation
    });
    return (
      <>
        <div>
          <div data-aos="fade-up" className="contoh">
            <div className="icon">
              <img className="checklist" src={checklist}></img>
            </div>
            <div className="text">
              <div className="line"></div>
              <p className="judul">Big Database</p>
              <p className="teks">
                Natadanus menyediakan lebih dari 100 produk yang sudah terjamin
                kualitasnya ditambah dengan makanan yang unik seperti es kelapa
                gula merah dan roti rasa durian.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div data-aos="fade-up" className="contoh">
            <div className="icon">
              <img className="checklist" src={orderstatus}></img>
            </div>
            <div className="text">
              <div className="line"></div>
              <p className="judul">Order Status</p>
              <p className="teks">
                Website natadanus memberikan status barang pesanan mahasiswa
                secara real-time melalui halaman transaksi.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div data-aos="fade-up" className="contoh">
            <div className="icon">
              <img className="checklist" src={destinationpoint}></img>
            </div>
            <div className="text">
              <div className="line"></div>
              <p className="judul">Destination Point</p>
              <p className="teks">
                Natadanus menyediakan destination point di seluruh fakultas agar
                seller dapat langsung menaruh box di destination point tanpa
                perlu janjian bertemu dengan mahasiswa.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Scroll;
