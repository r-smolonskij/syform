import { Container, Row, Col } from "react-bootstrap";
import { MdViewComfy, MdApps, MdList } from "react-icons/md";
import { IoMdFunnel } from "react-icons/io";
import { setActiveLayout } from "../../lib/product";
const ShopHeader = ({
  shopTopFilterStatus,
  setShopTopFilterStatus,
  getFilterSortParams,
  sortedProductCount,
  productCount,
  getLayout,
  layoutClass,
  listMode
}) => {
  return (
    <div className="shop-header">
      <Container className={layoutClass ? layoutClass : ""}>
        <Row className="align-items-center">
          <Col md={12}>
            <div className="shop-header__filter-icons justify-content-center justify-content-md-end">
              Kārtot pēc:
              <div className="single-icon filter-dropdown ml-2">
                <select
                  onChange={(e) =>
                    getFilterSortParams("filterSort", e.target.value)
                  }
                >
                  <option value="default"></option>
                  <option value="priceLowToHigh">Cena - Augoši</option>
                  <option value="priceHighToLow">Cena - Dilstoši</option>
                </select>
              </div>

              <div className="single-icon grid-icons d-none d-lg-block">
                <button
                  onClick={(e) => {
                    getLayout("grid three-column");
                    setActiveLayout(e);
                  }}
                >
                  <MdApps />
                </button>

                <button
                  className="active"
                  onClick={(e) => {
                    getLayout("grid four-column");
                    setActiveLayout(e);
                  }}
                >
                  <MdViewComfy />
                </button>
                {listMode === false ? (
                  ""
                ) : (
                  <button
                    onClick={(e) => {
                      getLayout("list");
                      setActiveLayout(e);
                    }}
                  >
                    <MdList />
                  </button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopHeader;
