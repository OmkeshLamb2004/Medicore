import React from "react";

const About = () => {
  return (
    <>
      {/* <!--? Slider Area Start--> */}
      <div className="slider-area slider-area2">
        <div className="slider-active dot-style">
          {/* <!-- Slider Single --> */}
          <div className="single-slider  d-flex align-items-center slider-height2">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-7 col-lg-8 col-md-10 ">
                  <div className="hero-wrapper">
                    <div className="hero__caption">
                      <h1 data-animation="fadeInUp" data-delay=".3s">
                        About
                      </h1>
                      <p data-animation="fadeInUp" data-delay=".6s">
                        Almost before we knew it, we
                        <br /> had left the ground
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Slider Area End --> */}
      {/* <!--? Team Area Start--> */}
      <section className="team-area pb-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div className="single-cat text-center mb-30">
                <div className="cat-icon">
                  <img src="assets/img/gallery/team1.png" alt="" />
                </div>
                <div className="cat-cap">
                  <h5>
                    <a href="#">Your daily meal plan</a>
                  </h5>
                  <p>
                    Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                    dignissim dolor, a pretium mi sem ut ipsum.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div className="single-cat text-center mb-30">
                <div className="cat-icon">
                  <img src="assets/img/gallery/team2.png" alt="" />
                </div>
                <div className="cat-cap">
                  <h5>
                    <a href="#">Muscle Gain</a>
                  </h5>
                  <p>
                    Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                    dignissim dolor, a pretium mi sem ut ipsum.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div className="single-cat text-center mb-30">
                <div className="cat-icon">
                  <img src="assets/img/gallery/team3.png" alt="" />
                </div>
                <div className="cat-cap">
                  <h5>
                    <a href="#">Weight Loss</a>
                  </h5>
                  <p>
                    Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                    dignissim dolor, a pretium mi sem ut ipsum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--? Team End--> */}
      {/* <!-- Services End--> */}
      {/* <!--? About-2 Area Start --> */}
      <div className="about-area2 section-padding40">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-12">
              {/* <!-- about-img --> */}
              <div className="about-img ">
                <img src="assets/img/gallery/about.png" alt="" />
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="about-caption mb-50">
                {/* <!-- Section Tittle --> */}
                <div className="section-tittle mb-35">
                  <h2>Create a healthy life you love!</h2>
                </div>
                <p className="pera-top mb-40">
                  Almost before we knew it, we had left the ground
                </p>
                <p className="pera-bottom mb-30">
                  Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                  dignissim dolor, a pretium mi sem ut ipsum. Fusce fermentum.
                  Pellentesque libero tortor, tincidunt et.
                </p>
                <div className="icon-about">
                  <img src="assets/img/icon/about1.svg" alt="" className=" mr-20" />
                  <img src="assets/img/icon/about2.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--? Testimonial Area Start --> */}
      <section className="testimonial-area testimonial-padding fix">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className=" col-lg-9">
              <div className="about-caption">
                {/* <!-- Testimonial Start --> */}
                <div className="h1-testimonial-active dot-style">
                  {/* <!-- Single Testimonial --> */}
                  <div className="single-testimonial position-relative">
                    <div className="testimonial-caption">
                      <img
                        src="assets/img/icon/quotes-sign.png"
                        alt=""
                        className="quotes-sign"
                      />
                      <p>
                        "The automated process starts as soon as your clothe go
                        into the machine. This site outcome is gleaming clothe.
                        Placeholder text commonly used. In publishing and
                        graphic.
                      </p>
                    </div>
                    {/* <!-- founder --> */}
                    <div className="testimonial-founder d-flex align-items-center">
                      <div className="founder-img">
                        <img src="assets/img/icon/testimonial.png" alt="" />
                      </div>
                      <div className="founder-text">
                        <span>Robart Brown</span>
                        <p>Creative designer at Colorlib</p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Single Testimonial --> */}
                  <div className="single-testimonial position-relative">
                    <div className="testimonial-caption">
                      <img
                        src="assets/img/icon/quotes-sign.png"
                        alt=""
                        className="quotes-sign"
                      />
                      <p>
                        "The automated process starts as soon as your clothe go
                        into the machine. This site outcome is gleaming clothe.
                        Placeholder text commonly used. In publishing and
                        graphic.
                      </p>
                    </div>
                    {/* <!-- founder --> */}
                    <div className="testimonial-founder d-flex align-items-center">
                      <div className="founder-img">
                        <img src="assets/img/icon/testimonial.png" alt="" />
                      </div>
                      <div className="founder-text">
                        <span>Robart Brown</span>
                        <p>Creative designer at Colorlib</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Testimonial End --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--? Testimonial Area End --> */}
      {/* <!--? video_start --> */}
      <div className="container">
        <div
          className="video-area section-bg2 d-flex align-items-center"
          data-background="assets/img/gallery/video-bg.png"
        >
          <div className="video-wrap position-relative">
            <div className="video-icon">
              <a
                className="popup-video btn-icon"
                href="https://www.youtube.com/watch?v=up68UAfH0d0"
              >
                <i className="fas fa-play"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- video_end -->       */}
      {/* <!--? Blog Area Start --> */}
      <section className="home-blog-area section-padding30">
        <div className="container">
          {/* <!-- Section Tittle --> */}
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9 col-sm-10">
              <div className="section-tittle text-center mb-100">
                <h2>Latest Blog</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="home-blog-single mb-40">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src="assets/img/gallery/blog1.png" alt="" />
                  </div>
                  <div className="blog-cap">
                    <h3>
                      <a href="blog_details.html">Your daily meal plan</a>
                    </h3>
                    <p>
                      Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                      dignissim dolor, a pretium mi sem ut ipsum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="home-blog-single mb-40">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src="assets/img/gallery/blog2.png" alt="" />
                  </div>
                  <div className="blog-cap">
                    <h3>
                      <a href="blog_details.html">
                        Food is a great source of medicine
                      </a>
                    </h3>
                    <p>
                      Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                      dignissim dolor, a pretium mi sem ut ipsum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="home-blog-single mb-40">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src="assets/img/gallery/blog3.png" alt="" />
                  </div>
                  <div className="blog-cap">
                    <h3>
                      <a href="blog_details.html">Everyday diet plan</a>
                    </h3>
                    <p>
                      Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                      dignissim dolor, a pretium mi sem ut ipsum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Blog Area End --> */}
      {/* <!--? About Law Start--> */}
      <section className="about-low-area mt-30">
        <div className="container">
          <div className="about-cap-wrapper">
            <div className="row">
              <div className="col-xl-5  col-lg-6 col-md-10 offset-xl-1">
                <div className="about-caption mb-50">
                  {/* <!-- Section Tittle --> */}
                  <div className="section-tittle mb-35">
                    <h2>100% satisfaction guaranteed.</h2>
                  </div>
                  <p>Almost before we knew it, we had left the ground</p>
                  <a href="about.html" className="border-btn">
                    Make an Appointment
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                {/* <!-- about-img --> */}
                <div className="about-img">
                  <div className="about-font-img">
                    <img src="assets/img/gallery/about2.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
