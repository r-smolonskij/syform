import { connect } from "react-redux";
import _ from 'lodash'
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

const ShopSidebar = ({ categories,products, getSortParams }) => {
  const [activeCategory, setActiveCategory] = useState("all")
  const isActiveCategory = (value) => {
    return _.isEqual(value, activeCategory)
  }

  const showCategory = (categoryId) => {
    console.log(products);
    const filteredProducts = _.filter(products, product => _.isEqual(categoryId, product.categoryId));
    return filteredProducts.length > 0;
  }
  return (
    <div className="shop-sidebar">
      {/* category list */}
      <div className="single-sidebar-widget space-mb--40 d-none d-lg-block">
        <h2 className="single-sidebar-widget__title space-mb--30">
          Kategorijas
        </h2>
        {categories.length > 0 ? (
          <ul className="single-sidebar-widget__list single-sidebar-widget__list--category">
            <li>
              <button
                onClick={(e) => { getSortParams("all"); setActiveCategory("all") }}
                className={`${isActiveCategory("all") && "active"}`}
              >
                Visas kategorijas
              </button>
            </li>
            {categories.map((category, i) => {
              return showCategory(category.id) ?  (
                <li key={i}>
                  <button
                    onClick={() => { getSortParams(category.id); setActiveCategory(category.id) }}
                    className={`${isActiveCategory(category.id) && "active"}`}
                  >
                    {category.name}
                  </button>
                </li>
              ) : <></>;
            })}
          </ul>
        ) : (
          "Kategorijas netika atrastas"
        )}
      </div>
      {
        categories.length > 0 && <div className="d-block d-lg-none text-center mb-5 px-5">
          <h2 className="single-sidebar-widget__title space-mb--30">
            Kategorijas
          </h2>
          <Row>

            <button
              className={`lezada-button lezada-button--small  mb-3`}
              onClick={() => { getSortParams("all"); setActiveCategory("all") }}
            >
              Visas kategorijas
            </button>
            {
              categories.map((category, i) => {
                return showCategory(category.id) ? (
                  <Col key={i} xs={4} >
                    <button
                      className={`lezada-button lezada-button--small mb-3`}
                      onClick={() => { getSortParams(category.id); setActiveCategory(category.id) }}
                    >
                      {category.name}
                    </button>
                  </Col>
                ) : <></>;
              })
            }
          </Row>

        </div>}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    categories: state.categoryData,
    products: state.productData
  };
};
export default connect(mapStateToProps)(ShopSidebar);
