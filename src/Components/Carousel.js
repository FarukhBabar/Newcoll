import React from 'react';

const Carousel = () => {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://www.junaidjamshed.com/media/weltpixel/owlcarouselslider/images/b/a/banner123_10.jpg" className="d-block w-100" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src="https://www.junaidjamshed.com/media/weltpixel/owlcarouselslider/images/b/a/banner_114.jpg" className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <video className="d-block w-100" autoPlay loop muted>
            <source src="https://www.junaidjamshed.com/media/weltpixel/owlcarouselslider/videos/janan-intense-web.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
