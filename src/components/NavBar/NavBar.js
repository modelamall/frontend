import useFetch from "../../hooks/UseFetch";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { category, setCategory } = useContext(CategoryContext);
  const { data, loading, error } = useFetch("category/allcategories");
  if (!loading) {
    setCategory(data.data);
    console.log(category);
  }

  return (
    <div>
      <div
        className="header_sticky_bar d-none"
        style={{ height: "119.664px" }}
      ></div>
      <header className="header_wrap fixed-top header_with_topbar">
        <div className="top-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                  <div className="mr-3">
                    <div
                      className="dd ddcommon borderRadius"
                      id="msdrpdd21_msdd"
                      tabIndex="0"
                      style={{ width: "54px" }}
                    ></div>
                  </div>
                  <ul className="contact_detail text-center text-lg-left">
                    <li>
                      <i className="ti-mobile"></i>
                      <span>123-456-7890</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-center text-md-right">
                  <ul className="header_list">
                    <li>
                      <a href="login.html">
                        <i className="ti-user"></i>
                        <span>Login</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom_header dark_skin main_menu_uppercase">
          <div className="container">
            <nav className="navbar navbar-expand-lg">
              <a className="navbar-brand" href="index.html">
                <img
                  className="logo_light"
                  src="assets/images/logo_light.png"
                  alt="logo"
                />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-expanded="false"
              >
                <span className="ion-android-menu"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  {category.map((item) => {
                    return (
                      <li className="dropdown" key={item.id}>
                        <NavLink>{item.name}</NavLink>
                        {item?.sub && (
                          <div className="dropdown-menu">
                            <ul>
                              {item?.sub.map((subitem) => {
                                return (
                                  <li key={subitem.id}>
                                    <NavLink>{subitem.name}</NavLink>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </li>
                    );
                  })}
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
