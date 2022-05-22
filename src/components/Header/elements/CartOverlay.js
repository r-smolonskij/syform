import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import CustomScroll from "react-custom-scroll";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../../lib/product";
import { deleteFromCart } from "../../../redux/actions/cartActions";
import { Container, Row, Col } from "react-bootstrap";

const CartOverlay = ({
  activeStatus,
  getActiveStatus,
  cartItems,
  deleteFromCart
}) => {
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  return (
    <div className={`cart-overlay ${activeStatus ? "active" : ""}`}>
      <div
        className="cart-overlay__close"
        onClick={() => {
          getActiveStatus(false);
          document.querySelector("body").classList.remove("overflow-hidden");
        }}
      />
      <div className="cart-overlay__content">
        {/*=======  close icon  =======*/}
        <button
          className="cart-overlay__close-icon"
          onClick={() => {
            getActiveStatus(false);
            document.querySelector("body").classList.remove("overflow-hidden");
          }}
        >
          <IoIosClose />
        </button>
        {/*=======  offcanvas cart content container  =======*/}
        <div className="cart-overlay__content-container">
          <h3 className="cart-title">Grozs</h3>
          {cartItems.length >= 1 ? (
            <div className="cart-product-wrapper">
              <div className="cart-product-container">
                <CustomScroll allowOuterScroll={true}>
                  {cartItems.map((product, i) => {
                    const discountedPrice = getDiscountPrice(
                      product.price,
                      product.discount
                    ).toFixed(2);

                    cartTotalPrice += discountedPrice * product.quantity;

                    return (

                      <div className="single-cart-product" key={i}>
                        <div className="image mt-4">
                          <Link
                            href={`/veikals/produkts/[slug]?slug=${product.slug}`}
                            as={`${process.env.PUBLIC_URL}/veikals/produkts/${product.slug}`}
                          >
                            <a>
                              <img
                                src={product.image}
                                className="img-fluid"
                                alt=""
                              />
                            </a>
                          </Link>
                        </div>


                        <div className="content">
                          <Row>
                            <Col lg={9} />
                            <Col lg={3}>
                              <span className="cart-delete-item-icon">
                                <button
                                  onClick={() => deleteFromCart(product, addToast)}
                                >
                                  <IoIosClose />
                                </button>
                              </span>
                            </Col>
                          </Row>
                          <h5 >
                            <Link
                              href={`/veikals/produkts/[slug]?slug=${product.slug}`}
                              as={`${process.env.PUBLIC_URL}/veikals/produkts/${product.slug}`}
                            >
                              <a>{product.name}</a>
                            </Link>
                          </h5>
                          <p>
                            <span className="cart-count">
                              {product.quantity} x{" "}
                            </span>{" "}
                            <span className="discounted-price">
                              {discountedPrice}€
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CustomScroll>
              </div>
              {/*=======  subtotal calculation  =======*/}
              <p className="cart-subtotal">
                <span className="subtotal-title">Summa kopā:</span>
                <span className="subtotal-amount">
                  {cartTotalPrice.toFixed(2)}€
                </span>
              </p>
              {/*=======  cart buttons  =======*/}
              <div className="cart-buttons">
                <Link
                  href="/grozs"
                  as={process.env.PUBLIC_URL + "/grozs"}
                >
                  <a>Apskatīt grozu</a>
                </Link>
                <Link
                  href="/apmaksa"
                  as={process.env.PUBLIC_URL + "/apmaksa"}
                >
                  <a>Doties uz apmaksas formu</a>
                </Link>
              </div>
            </div>
          ) : (
            "Grozā nav nevienas preces"
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
