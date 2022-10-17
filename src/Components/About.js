import React from "react";
import Image1 from "./Images/notebook.jpg";
import Image2 from "./Images/paper.jpg";
import Image3 from "./Images/stickynotes.jpg";
import Footer from "./Footer.js"

const About = () => {
  return (
    <>
      
        <div
          id="carouselExampleDark"
          className="carousel carousel-light slide my-5"
          data-bs-ride="carousel"
          style={{ paddingTop: "50px" }}
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src={Image1} className="d-block w-100" alt="..." />
              <div className="carousel-caption  d-md-block" style={{color:"white"}}>
                <h1>Easy To Use</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis molestias quam omnis quisquam 
                </p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000" >
              <img src={Image2} className="d-block w-100" alt="..." />
              <div className="carousel-caption  d-md-block" style={{color:"black"}}>
                <h1>CRUD operations</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventor
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img id="image3" src={Image3} className="d-block w-100" alt="..." />
              <div className="carousel-caption  d-md-block" style={{color:"white"}}>
                <h1>Can Add Multiple notes </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat expedita saepe 
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
    
      <Footer/>
    </>
  );
};

export default About;
