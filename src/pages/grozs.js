import { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
    addToCart,
    decreaseQuantity,
    deleteFromCart,
    deleteAllFromCart,
} from "../redux/actions/cartActions";
import { getDiscountPrice } from "../lib/product";
import { LayoutTwo } from "../components/Layout";
import { IoIosClose, IoMdCart } from "react-icons/io";

const Cart = ({
    cartItems,
    decreaseQuantity,
    addToCart,
    deleteFromCart,
    deleteAllFromCart
}) => {
    const [quantityCount] = useState(1);
    const { addToast } = useToasts();
    let cartTotalPrice = 0;

    useEffect(() => {
        document.querySelector("body").classList.remove("overflow-hidden");
    });

    return (
        <LayoutTwo>
            {/* cart content */}
            <div className="cart-content space-mt--r100 space-mb--r130">
                <div className="about-title-container text-center">
                    <h1 className=" space-mb--r100">
                        Grozs
                    </h1>
                </div>
                <Container>
                    {cartItems && cartItems.length >= 1 ? (
                        <Row>
                            <Col lg={8}>
                                {/* cart table */}
                                <table className="cart-table">
                                    <thead>
                                        <tr>
                                            <th className="product-name" colSpan="2">
                                                Produkts
                                            </th>
                                            <th className="product-price">Cena</th>
                                            <th className="product-quantity">Skaits</th>
                                            <th className="product-subtotal">Kopā</th>
                                            <th className="product-remove">&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((product, i) => {
                                            const discountedPrice = getDiscountPrice(
                                                product.price,
                                                product.discount
                                            ).toFixed(2);

                                            cartTotalPrice += discountedPrice * product.quantity;
                                            return (
                                                <tr key={i}>
                                                    <td className="product-thumbnail">
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
                                                    </td>
                                                    <td className="product-name">
                                                        <Link
                                                            href={`/veikals/produkts/[slug]?slug=${product.slug}`}
                                                            as={`${process.env.PUBLIC_URL}/veikals/produkts/${product.slug}`}
                                                        >
                                                            <a>{product.name}</a>
                                                        </Link>
                                                        {product.selectedProductColor &&
                                                            product.selectedProductSize ? (
                                                            <div className="product-variation">
                                                                <span>
                                                                    Garša: {product.selectedProductColor}
                                                                </span>
                                                                <span>Izmērs: {product.selectedProductSize}</span>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </td>

                                                    <td className="product-price">
                                                        <span className="price">{discountedPrice}€</span>
                                                    </td>

                                                    <td className="product-quantity">
                                                        <div className="cart-plus-minus">
                                                            <button
                                                                className="dec qtybutton"
                                                                onClick={() =>
                                                                    decreaseQuantity(product, addToast)
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                className="cart-plus-minus-box"
                                                                type="text"
                                                                value={product.quantity}
                                                                readOnly
                                                            />
                                                            <button
                                                                className="inc qtybutton"
                                                                onClick={() =>
                                                                    addToCart(product, addToast, quantityCount)
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>

                                                    <td className="total-price">
                                                        <span className="price">
                                                            {(discountedPrice * product.quantity).toFixed(2)}€
                                                        </span>
                                                    </td>

                                                    <td className="product-remove">
                                                        <button
                                                            onClick={() => deleteFromCart(product, addToast)}
                                                        >
                                                            <IoIosClose />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className="cart-coupon-area space-pt--30 space-pb--30">
                                    <Row className="align-items-center">
                                        <Col lg={12} className="text-left text-lg-right">
                                            <button
                                                className="lezada-button lezada-button--medium"
                                                onClick={() => deleteAllFromCart(addToast)}
                                            >
                                                Iztīrīt grozu
                                            </button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col lg={4} className="ml-auto">
                                <div className="cart-calculation-area">
                                    <h2 className="space-mb--40">Groza apskats</h2>
                                    <table className="cart-calculation-table space-mb--40">
                                        <tbody>

                                            <tr>
                                                <th>Summa kopā</th>
                                                <td className="total">{cartTotalPrice.toFixed(2)}€</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="cart-calculation-button text-center">
                                        <Link
                                            href="/apmaksa"
                                            as={process.env.PUBLIC_URL + "/apmaksa"}
                                        >
                                            <a className="lezada-button lezada-button--medium">
                                                Doties uz apmaksas formu
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </Col>


                        </Row>
                    ) : (
                        <Row>
                            <Col>
                                <div className="item-empty-area text-center">
                                    <div className="item-empty-area__icon space-mb--30">
                                        <IoMdCart />
                                    </div>
                                    <div className="item-empty-area__text">
                                        <p className="space-mb--30">Grozā nav nevienas preces</p>
                                        <Link
                                            href="/veikals"
                                            as={process.env.PUBLIC_URL + "/veikals"}
                                        >
                                            <a className="lezada-button lezada-button--medium">
                                                Iepirkties
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </div>
        </LayoutTwo>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item, addToast, quantityCount) => {
            dispatch(addToCart(item, addToast, quantityCount));
        },
        decreaseQuantity: (item, addToast) => {
            dispatch(decreaseQuantity(item, addToast));
        },
        deleteFromCart: (item, addToast) => {
            dispatch(deleteFromCart(item, addToast));
        },
        deleteAllFromCart: (addToast) => {
            dispatch(deleteAllFromCart(addToast));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
