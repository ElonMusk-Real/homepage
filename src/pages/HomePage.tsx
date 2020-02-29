import React from "react";
import "./App.css";
import Scroll from "../components/Scroll/Scroll.js";
import Carousell from "../components/Carousel/Carousell.js";
import Carousell2 from "../components/Carousel/Carousell2.js";
import Carousell4 from "../components/Carousel/Carousell4.js";
import ControlledExpansionPanels from "../components/Collapse/Collapse.js";
import photodiv2 from "../components/Assets/div2.png";
import photodiv6 from "../components/Assets/div6.png";
import socmed1 from "../components/Assets/1.svg";
import socmed2 from "../components/Assets/2.svg";
import socmed3 from "../components/Assets/3.svg";
import copy from "../components/Assets/copy.svg";
import love from "../components/Assets/love.svg";

const HomePage = () => {
  return (
    <>
      <div className="homepage">
        <div className="div1"></div>
        <div className="div2">
          <img className="imagediv2" src={photodiv2}></img>
          <p className="textdiv2">Pesan snackbox sekarang!</p>
          <div className="buttonwrapper">
            <a className="button1">REGISTER</a>
            <a className="button2">LOG IN</a>
          </div>
        </div>
        <div className="div3">
          <p className="juduldiv3">Best Features</p>
          <div className="scroll">
            <Scroll />
          </div>
        </div>
        <div className="div4">
          <p className="juduldiv4">How To Order</p>
          <Carousell />
        </div>
        <div className="div5">
          <p className="juduldiv5">Our Products</p>
          <Carousell2 />
          <div className="button3">Order Now!</div>
        </div>
        <div className="div6">
          <p className="juduldiv6">FAQs</p>
          <img className="imagediv6" src={photodiv6}></img>
          <div className="collapse">
            <ControlledExpansionPanels />
          </div>
        </div>
        <div className="div7">
          <p className="juduldiv7">Testimonials</p>
          <Carousell4 />
        </div>
        <div className="div8">
          <div className="about">
            <p>About</p>
          </div>
          <div className="joinus">
            <p>Join Us (We are hiring!)</p>
          </div>
          <div className="contact">
            <p>Contact</p>
          </div>
          <div className="socmed">
            <div className="socmedig">
              <a href="https://www.instagram.com/natadanus/" className="socmedig">
                <img src={socmed1}></img>
              </a>
            </div>
            <div className="socmedline">
              <a href="line://ti/p/@natadanus" className="socmedline">
                <img src={socmed2}></img>
              </a>
            </div>
            <div className="socmedwhatsapp">
              <a href="https://api.whatsapp.com/send?phone=+628561793835" className="socmedwhatsapp">
                <img src={socmed3}></img>
              </a>
            </div>
          </div>
          <div className="copyright">
            <div className="copyicon">
              <img src={copy}></img>
            </div>
            <p className="madewith">Made with </p>
            <div className="love">
              <img src={love}></img>
            </div>
            <p className="fromnatadanus">from natadanus.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
