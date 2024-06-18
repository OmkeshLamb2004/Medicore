import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "./context/auth/AuthState";

const Layout = () => {
  const { currentUser, currentUserRole } = useAuth();
  const location = useLocation();
  const [pathname, setpathname] = useState("");
  useEffect(() => {
    let newlocation = location.pathname;
    setpathname(newlocation);
  }, [location.pathname]);

  return (
    <>
      <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="assets/css/owl.carousel.min.css" />
      <link rel="stylesheet" href="assets/css/slicknav.css" />
      <link rel="stylesheet" href="assets/css/flaticon.css" />
      <link rel="stylesheet" href="assets/css/gijgo.css" />
      <link rel="stylesheet" href="assets/css/animate.min.css" />
      <link rel="stylesheet" href="assets/css/animated-headline.css" />
      <link rel="stylesheet" href="assets/css/magnific-popup.css" />
      <link rel="stylesheet" href="assets/css/fontawesome-all.min.css" />
      <link rel="stylesheet" href="assets/css/themify-icons.css" />
      <link rel="stylesheet" href="assets/css/slick.css" />
      <link rel="stylesheet" href="assets/css/nice-select.css" />
      <link rel="stylesheet" href="assets/css/style.css" />
      <header>
        {/* <!--? Header Start --> */}
        <div className="header-area">
          <div className="main-header header-sticky">
            <div className="container-fluid">
              <div className="row align-items-center">
                {/* <!-- Logo --> */}
                <div className="col-xl-2 col-lg-2 col-md-1">
                  <div className="logo">
                    <a href="/">
                      <img src="Rosemary_horizontal.jpg" style={{height:"100px"}} alt="" />
                    </a>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-10">
                  <div className="menu-main d-flex align-items-center justify-content-end">
                    {/* <!-- Main-menu --> */}
                    <div className="main-menu f-right d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li>
                            <a href="/">Home</a>
                          </li>
                          <li>
                            <a href="about">About</a>
                          </li>
                          <li>
                            {currentUser ? (
                              <Link to="/signout">
                                Sign Out
                              </Link>
                            ) : (
                              <Link to="/auth">
                                Sign Up
                              </Link>
                            )}
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div className="header-right-btn f-right d-none d-lg-block ml-15">
                      {currentUser ? (
                        currentUserRole.doctor &&
                        currentUserRole.admin &&
                        pathname === "/admin" ? (
                          <Link to="/patient" className="btn header-btn">
                            Patient Portal {">"}
                          </Link>
                        ) : currentUserRole.doctor && pathname !== "/doctor" ? (
                          <Link to="/doctor" className="btn header-btn">
                            Doctor Portal {">"}
                          </Link>
                        ) : currentUserRole.admin && pathname !== "/admin" ? (
                          <Link to="/admin" className="btn header-btn">
                            Admin Portal {">"}
                          </Link>
                        ) : (
                          <Link to="/patient" className="btn header-btn">
                            Patient Portal {">"}
                          </Link>
                        )
                      ) : (
                        <Link to="/auth" className="btn header-btn">
                          Login
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                {/* <!-- Mobile Menu --> */}
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Header End --> */}
      </header>
      <div>
        <Outlet />
      </div>
      <footer>
        <div
          className="footer-wrappr section-bg3"
          data-background="assets/img/gallery/footer-bg.png"
        >
          <div className="footer-area footer-padding ">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12">
                  <div className="single-footer-caption mb-50">
                    {/* <!-- logo --> */}
                    <div className="footer-logo mb-25">
                      <a href="/">
                        <img src="Rosemary-cropped.jpg" alt="" />
                      </a>
                    </div>
                    <d iv className="header-area">
                      <div className="main-header main-header2">
                        <div className="menu-main d-flex align-items-center justify-content-start">
                          {/* <!-- Main-menu --> */}
                          <div className="main-menu main-menu2">
                            <nav>
                              <ul>
                                <li>
                                  <a href="/">Home</a>
                                </li>
                                <li>
                                  <a href="about">About</a>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </d>
                    {/* <!-- social --> */}
                    <div className="footer-social mt-50">
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="https://bit.ly/sai4ull">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-pinterest-p"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="single-footer-caption">
                    <div className="footer-tittle mb-50">
                      <h4>Subscribe newsletter</h4>
                    </div>
                    {/* <!-- Form --> */}
                    <div className="footer-form">
                      <div id="mc_embed_signup">
                        <form
                          target="_blank"
                          action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                          method="get"
                          className="subscribe_form relative mail_part"
                          novalidate="true"
                        >
                          <input
                            type="email"
                            name="EMAIL"
                            id="newsletter-form-email"
                            placeholder=" Email Address "
                            className="placeholder hide-on-focus"
                            onfocus="this.placeholder = ''"
                            onblur="this.placeholder = 'Enter your email'"
                          />
                          <div className="form-icon">
                            <button
                              type="submit"
                              name="submit"
                              id="newsletter-submit"
                              className="email_icon newsletter-submit button-contactForm"
                            >
                              Subscribe
                            </button>
                          </div>
                          <div className="mt-10 info"></div>
                        </form>
                      </div>
                    </div>
                    <div className="footer-tittle">
                      <div className="footer-pera">
                        <p>
                          Praesent porttitor, nulla vitae posuere iaculis, arcu
                          nisl dignissim dolor, a pretium misem ut ipsum.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- footer-bottom area --> */}
          <div className="footer-bottom-area">
            <div className="container">
              <div className="footer-border">
                <div className="row">
                  <div className="col-xl-10 ">
                    <div className="footer-copy-right">
                      <p>
                        {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                        Copyright &copy;
                        <script>
                          document.write(new Date().getFullYear());
                        </script>{" "}
                        All rights reserved {/* | This template is made with{" "}
                        <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
                        <a href="https://colorlib.com" target="_blank">
                          Colorlib
                        </a> */}
                        {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
