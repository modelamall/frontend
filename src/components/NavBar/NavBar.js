import "../../assets/css/navBar.css";
import useFetch from "../../hooks/UseFetch";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { category, setCategory } = useContext(CategoryContext);
  const { data, loading, error } = useFetch("category/allcategories");
  if (!loading) {
    setCategory(data.data);
  }

  return (
    <div>
      <div class="header_sticky_bar d-none" style="height: 119.664px;"></div>
      <header class="header_wrap fixed-top header_with_topbar">
        <div class="top-header">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="d-flex align-items-center justify-content-center justify-content-md-start">
                  <div class="lng_dropdown mr-2">
                    <div
                      class="ddOutOfVision"
                      id="msdrpdd20_msddHolder"
                      style="height: 0px; overflow: hidden; position: absolute;"
                    >
                      <select
                        name="countries"
                        class="custome_select"
                        id="msdrpdd20"
                        tabindex="-1"
                      >
                        <option
                          value="en"
                          data-image="assets/images/eng.png"
                          data-title="English"
                        >
                          English
                        </option>
                        <option
                          value="fn"
                          data-image="assets/images/fn.png"
                          data-title="France"
                        >
                          France
                        </option>
                        <option
                          value="us"
                          data-image="assets/images/us.png"
                          data-title="United States"
                        >
                          United States
                        </option>
                      </select>
                    </div>
                    <div
                      class="dd ddcommon borderRadius"
                      id="msdrpdd20_msdd"
                      tabindex="0"
                      style="width: 128px;"
                    >
                      <div class="ddTitle borderRadiusTp">
                        <span class="divider"></span>
                        <span class="ddArrow arrowoff"></span>
                        <span class="ddTitleText " id="msdrpdd20_title">
                          <img src="assets/images/eng.png" class="fnone" />
                          <span class="ddlabel">English</span>
                          <span
                            class="description"
                            style="display: none;"
                          ></span>
                        </span>
                      </div>
                      <input
                        id="msdrpdd20_titleText"
                        type="text"
                        autocomplete="off"
                        class="text shadow borderRadius"
                        style="display: none;"
                      />
                      <div
                        class="ddChild ddchild_ border shadow"
                        id="msdrpdd20_child"
                        style="z-index: 9999; display: none; position: absolute; visibility: visible; height: 105px;"
                      >
                        <ul>
                          <li class="enabled _msddli_ selected" title="English">
                            <img src="assets/images/eng.png" class="fnone" />
                            <span class="ddlabel">English</span>
                            <div class="clear"></div>
                          </li>
                          <li class="enabled _msddli_" title="France">
                            <img src="assets/images/fn.png" class="fnone" />
                            <span class="ddlabel">France</span>
                            <div class="clear"></div>
                          </li>
                          <li class="enabled _msddli_" title="United States">
                            <img src="assets/images/us.png" class="fnone" />
                            <span class="ddlabel">United States</span>
                            <div class="clear"></div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="mr-3">
                    <div
                      class="ddOutOfVision"
                      id="msdrpdd21_msddHolder"
                      style="height: 0px; overflow: hidden; position: absolute;"
                    >
                      <select
                        name="countries"
                        class="custome_select"
                        id="msdrpdd21"
                        tabindex="-1"
                      >
                        <option value="USD" data-title="USD">
                          USD
                        </option>
                        <option value="EUR" data-title="EUR">
                          EUR
                        </option>
                        <option value="GBR" data-title="GBR">
                          GBR
                        </option>
                      </select>
                    </div>
                    <div
                      class="dd ddcommon borderRadius"
                      id="msdrpdd21_msdd"
                      tabindex="0"
                      style="width: 54px;"
                    >
                      <div class="ddTitle borderRadiusTp">
                        <span class="divider"></span>
                        <span class="ddArrow arrowoff"></span>
                        <span class="ddTitleText " id="msdrpdd21_title">
                          <span class="ddlabel">USD</span>
                          <span
                            class="description"
                            style="display: none;"
                          ></span>
                        </span>
                      </div>
                      <input
                        id="msdrpdd21_titleText"
                        type="text"
                        autocomplete="off"
                        class="text shadow borderRadius"
                        style="display: none;"
                      />
                      <div
                        class="ddChild ddchild_ border shadow"
                        id="msdrpdd21_child"
                        style="z-index: 9999; display: none; position: absolute; visibility: visible; height: 105px;"
                      >
                        <ul>
                          <li class="enabled _msddli_ selected" title="USD">
                            <span class="ddlabel">USD</span>
                            <div class="clear"></div>
                          </li>
                          <li class="enabled _msddli_" title="EUR">
                            <span class="ddlabel">EUR</span>
                            <div class="clear"></div>
                          </li>
                          <li class="enabled _msddli_" title="GBR">
                            <span class="ddlabel">GBR</span>
                            <div class="clear"></div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <ul class="contact_detail text-center text-lg-left">
                    <li>
                      <i class="ti-mobile"></i>
                      <span>123-456-7890</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6">
                <div class="text-center text-md-right">
                  <ul class="header_list">
                    <li>
                      <a href="compare.html">
                        <i class="ti-control-shuffle"></i>
                        <span>Compare</span>
                      </a>
                    </li>
                   
                    <li>
                      <a href="login.html">
                        <i class="ti-user"></i>
                        <span>Login</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom_header dark_skin main_menu_uppercase">
          <div class="container">
            <nav class="navbar navbar-expand-lg">
              <a class="navbar-brand" href="index.html">
                <img
                  class="logo_light"
                  src="assets/images/logo_light.png"
                  alt="logo"
                />
                <img
                  class="logo_dark"
                  src="assets/images/logo_dark.png"
                  alt="logo"
                />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-expanded="false"
              >
                <span class="ion-android-menu"></span>
              </button>
              <div
                class="collapse navbar-collapse justify-content-end"
                id="navbarSupportedContent"
              >
                <ul class="navbar-nav">
                  <li class="dropdown">
                    <a
                      data-toggle="dropdown"
                      class="nav-link dropdown-toggle active"
                      href="#"
                    >
                      Home
                    </a>
                    <div class="dropdown-menu">
                      <ul>
                        <li>
                          <a
                            class="dropdown-item nav-link nav_item active"
                            href="index.html"
                          >
                            Fashion 1
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item nav-link nav_item"
                            href="index-2.html"
                          >
                            Fashion 2
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item nav-link nav_item"
                            href="index-3.html"
                          >
                            Furniture 1
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item nav-link nav_item"
                            href="index-4.html"
                          >
                            Furniture 2
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item nav-link nav_item"
                            href="index-5.html"
                          >
                            Electronics 1
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item nav-link nav_item"
                            href="index-6.html"
                          >
                            Electronics 2
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="dropdown">
                    <a
                      class="dropdown-toggle nav-link"
                      href="#"
                      data-toggle="dropdown"
                    >
                      Pages
                    </a>
                    <div class="dropdown-menu">
                      <ul>
                        <li>
                          <a
                            class="dropdown-item nav-link nav_item"
                            href="about.html"
                          >
                            About Us
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item nav-link nav_item"
                            href="contact.html"
                          >
                            Contact Us
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item nav-link nav_item"
                            href="faq.html"
                          >
                            Faq
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item nav-link nav_item"
                            href="404.html"
                          >
                            404 Error Page
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item nav-link nav_item"
                            href="login.html"
                          >
                            Login
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item nav-link nav_item"
                            href="signup.html"
                          >
                            Register
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item nav-link nav_item"
                            href="term-condition.html"
                          >
                            Terms and Conditions
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};
export default NavBar;
