import { useState, useEffect, Fragment } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import { connect } from "react-redux";
import {
    IoIosSearch,
    IoIosCart,
    IoIosMenu
} from "react-icons/io";
import Navigation from "./elements/Navigation";
import AboutOverlay from "./elements/AboutOverlay";
import SearchOverlay from "./elements/SearchOverlay";
import CartOverlay from "./elements/CartOverlay";
import MobileMenu from "./elements/MobileMenu";

const HeaderOne = ({ aboutOverlay, cartItems, wishlistItems }) => {
    const [scroll, setScroll] = useState(0);
    const [headerTop, setHeaderTop] = useState(0);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [offCanvasAboutActive, setOffCanvasAboutActive] = useState(false);
    const [offCanvasSearchActive, setOffCanvasSearchActive] = useState(false);
    const [offCanvasCartActive, setOffCanvasCartActive] = useState(false);
    const [offCanvasMobileMenuActive, setOffCanvasMobileMenuActive] = useState(
        false
    );

    useEffect(() => {
        const header = document.querySelector("header");
        setHeaderTop(header.offsetTop);
        setHeaderHeight(header.offsetHeight);
        window.addEventListener("scroll", handleScroll);
        scroll > headerTop
            ? (document.body.style.paddingTop = `${headerHeight}px`)
            : (document.body.style.paddingTop = 0);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    return (
        <Fragment>
            <header
                className={`topbar-shadow ${scroll > headerTop ? "is-sticky" : ""}`}
            >
                <Container className="wide">
                    <div className="header-content d-flex align-items-center justify-content-between position-relative space-py-mobile-only--30">
                        {/* logo */}
                        <div className="header-content__logo d-flex align-items-center space-pr--15">
                            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                                <a>
                                    <img
                                        src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                                        className="img-fluid"
                                        alt=""
                                        width={200}
                                    />
                                </a>
                            </Link>
                        </div>

                        {/* navigation */}
                        <Navigation />

                        {/* icons */}
                        <div className="header-content__icons space-pl--15">
                            <ul className="d-none d-lg-block">
                                <li>
                                    <button
                                        onClick={() => {
                                            setOffCanvasSearchActive(true);
                                            document
                                                .querySelector("body")
                                                .classList.add("overflow-hidden");
                                        }}
                                    >
                                        <IoIosSearch />
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            setOffCanvasCartActive(true);
                                            document
                                                .querySelector("body")
                                                .classList.add("overflow-hidden");
                                        }}
                                    >
                                        <IoIosCart />
                                        {cartItems.length >= 1 ? (
                                            <span className="count">
                                                {cartItems.length ? cartItems.length : ""}
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </button>
                                </li>
                            </ul>

                            <ul className="d-block d-lg-none">
                                <li>
                                    <Link
                                        href="/other/cart"
                                        as={process.env.PUBLIC_URL + "/other/cart"}
                                    >
                                        <a>
                                            <IoIosCart />
                                            {cartItems.length >= 1 ? (
                                                <span className="count">
                                                    {cartItems.length ? cartItems.length : ""}
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={() => setOffCanvasMobileMenuActive(true)}>
                                        <IoIosMenu />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </header>

            {/* about overlay */}
            {aboutOverlay === false ? (
                ""
            ) : (
                <AboutOverlay
                    activeStatus={offCanvasAboutActive}
                    getActiveStatus={setOffCanvasAboutActive}
                />
            )}
            {/* search overlay */}
            <SearchOverlay
                activeStatus={offCanvasSearchActive}
                getActiveStatus={setOffCanvasSearchActive}
            />

            {/* cart overlay */}
            <CartOverlay
                activeStatus={offCanvasCartActive}
                getActiveStatus={setOffCanvasCartActive}
            />
            {/* Mobile Menu */}
            <MobileMenu
                activeStatus={offCanvasMobileMenuActive}
                getActiveStatus={setOffCanvasMobileMenuActive}
            />
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartData,
        wishlistItems: state.wishlistData
    };
};

export default connect(mapStateToProps)(HeaderOne);
