import { ProductContext } from "../../context/ProductContext";
import { useContext } from "react";
import useFetch from "../../hooks/UseFetch";
import { useEffect } from "react";
import "../../assets/css/productStyle.css";

const Products = () => {
  const { data, loading, error } = useFetch("product/all");
  const { products, setProducts } = useContext(ProductContext);
  if (!loading) {
    setProducts(data.data);
  }
  return (
    <>
      <div className="section small_pt pb_20">
        <div className="container">
          {/* <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="heading_s3 text-center">
                <h2>Exclusive Products</h2>
              </div>
              <div className="small_divider clearfix"></div>
            </div>
          </div> */}
          <div className="row shop_container">
            {products.map((product) => {
              return (
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="product_box text-center">
                    <div className="product_img">
                      <a href="shop-product-detail.html">
                        <img
                          src={product.Pictures[0]}
                          alt="furniture_img1"
                        />
                      </a>
                      <div className="product_action_box">
                        <ul className="list_none pr_action_btn">
                          <li>
                            <a href="shop-compare.html" className="popup-ajax">
                              <i className="icon-shuffle"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-quick-view.html"
                              className="popup-ajax"
                            >
                              <i className="icon-magnifier-add"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-heart"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product_info">
                      <h6 className="product_title">
                        <a href="shop-product-detail.html">{product.title}</a>
                      </h6>
                      <div className="product_price">
                        <span className="price">${product.ProductVariations[0].price}</span>
                        <del>$55.25</del>
                      </div>
                      {/* <div className="rating_wrap">
                        <div className="rating">
                          <div
                            className="product_rate"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                        <span className="rating_num">(21)</span>
                      </div> */}
                      <div className="pr_desc">
                        <p>
                          {product.discription}
                        </p>
                      </div>
                      <div className="add-to-cart">
                        <a href="#" className="btn btn-fill-out btn-radius">
                          <i className="icon-basket-loaded"></i> Add To Cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Products;
