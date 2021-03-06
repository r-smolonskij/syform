import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { LayoutTwo } from "../components/Layout";
import pakomati from '../assets/pakomati.json'
import _ from 'lodash'
import { deleteAllFromCart } from "../redux/actions/cartActions";
import { useToasts } from "react-toast-notifications";
import { IoMdCheckmarkCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import Link from "next/link";
const Checkout = ({ cartItems, parcelList, settings, deleteAllFromCart }) => {
    let cartTotalPrice = 0;
    const latvianParcelList = parcelList.filter(parcel => parcel.A0_NAME === "LV");
    const { addToast } = useToasts();
    const [formData, setFormData] = useState({ name: "", surname: "", email: "", phone: "", parcel: "", company: "", comment: "", })
    const [sendError, setSendError] = useState(false)
    const [sendSuccess, setSendSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        document.querySelector("body").classList.remove("overflow-hidden");
    });

    const onChangeField = (type, event) => {
        const value = event.target.value;
        const formDataCopy = { ...formData }
        switch (type) {
            case "name":
                formDataCopy.name = value;
                break;
            case "surname":
                formDataCopy.surname = value;
                break;
            case "email":
                formDataCopy.email = value;
                break;
            case "phone":
                formDataCopy.phone = value;
                break;
            case "parcel":
                formDataCopy.parcel = value;
                break;
            case "company":
                formDataCopy.company = value;
                break;
            case "comment":
                formDataCopy.comment = value;
                break;
            default:
                break
        }
        setFormData(formDataCopy);
    }

    const submitForm = (e) => {
        e.preventDefault();
        let productsText = "";
        let totalPrice = 0;
        setLoading(true)
        cartItems.forEach(item => {
            const price = item.price * item.quantity;
            productsText += `${item.name} x ${item.quantity} iepakojumi (${price.toFixed(2)}???)\n\n`
            totalPrice += (item.price * item.quantity);
        })
        productsText += `\nKop??j?? summa: ${totalPrice.toFixed(2)}???\n`

        fetch(`https://formsubmit.co/ajax/${settings.email}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Epasts: formData.email,
                V??rds: formData.name,
                Uzv??rds: formData.surname,
                Telefons: formData.phone,
                Uznemums: !_.isEmpty(formData.company) ? formData.company : "Nav nor??d??ts",
                Pakom??ts: !_.isEmpty(formData.parcel) ? formData.parcel : "Nav nor??d??ts",
                Koment??rs: !_.isEmpty(formData.comment) ? formData.comment : "Nav nor??d??ts",
                Inform??cija_par_pirkumu: productsText
            })
        })
            .then(response => response.json())
            .then(data => {
                if (_.isEqual(data.success, "true")) {
                    setFormData({ name: "", surname: "", email: "", phone: "", parcel: "", company: "", comment: "" })
                    setLoading(false);
                    setSendSuccess(true)
                    deleteAllFromCart(addToast);
                } else {
                    setLoading(false);
                    setSendError(true);
                    console.log(error)
                }
            })
            .catch(error => {
                setLoading(false);
                setSendError(true)
                console.log(error)
            });
    }
    const showContent = !sendError && !sendSuccess && !loading
    return (
        <LayoutTwo>
            <div className="checkout-area  space-mt--r100 space-mb--r100">
                {sendError &&
                    <Row>
                        <Col>
                            <div className="item-empty-area text-center">
                                <div className="item-empty-area__icon space-mb--30">
                                    <IoIosCloseCircleOutline />
                                </div>
                                <div className="item-empty-area__text">
                                    <p className="space-mb--30">Servera k????da! L??dzu sazinieties ar mums izmantojot ??o e-pasta adresi - <b><a href="mailto:webmaster@example.com">john@box.lv</a></b> </p>
                                    <Link
                                        href="/veikals"
                                        as={process.env.PUBLIC_URL + "/veikals"}
                                    >
                                        <a className="lezada-button lezada-button--medium">
                                            Atgriezties uz veikalu
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                }
                {sendSuccess &&
                    <Row>
                        <Col>
                            <div className="item-empty-area text-center">
                                <div className="item-empty-area__icon space-mb--30">
                                    <IoMdCheckmarkCircleOutline />
                                </div>
                                <div className="item-empty-area__text">
                                    <p className="space-mb--30">Pas??t??jums veiksm??gi aizs??t??ts uz m??su e-pastu!</p>
                                    <Link
                                        href="/veikals"
                                        as={process.env.PUBLIC_URL + "/veikals"}
                                    >
                                        <a className="lezada-button lezada-button--medium">
                                            Atgriezties uz veikalu
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                }
                {loading && <Container className="mt-5">
                    <Row>
                        <Col col={2} />
                        <Col col={8} className="text-center">
                            <div className="loader m-auto" />
                            <h3 className=" mt-3 mr-3">Apstr??d?? datus</h3>
                        </Col>
                        <Col col={2} />
                    </Row>
                </Container>}
                {showContent && <Container>
                    {cartItems && cartItems.length >= 1 &&
                        <div>
                            <div className="about-title-container text-center">
                                <h1 className=" space-mb--r100">
                                    Apmaksa
                                </h1>
                            </div>
                            <Row>
                                <Col>
                                    <div className="lezada-form order">
                                        <form id="checkoutForm" className="checkout-form" onSubmit={submitForm}>
                                            <div className="row row-40">
                                                <div className="col-lg-7 space-mb--20 order-lg-0 order-1">
                                                    {/* Billing Address */}
                                                    <div id="billing-form" className="space-mb--40">
                                                        <h4 className="checkout-title">Kontaktinform??cija</h4>
                                                        <div className="row">
                                                            <div className="col-md-6 col-12 space-mb--20">
                                                                <label>V??rds*</label>
                                                                <input value={formData.name} onChange={(e) => onChangeField("name", e)} type="text" name="name" required placeholder="Ievadiet v??rdu" />
                                                            </div>
                                                            <div className="col-md-6 col-12 space-mb--20">
                                                                <label>Uzv??rds*</label>
                                                                <input value={formData.surname} onChange={(e) => onChangeField("surname", e)} type="text" name="surname" required placeholder="Ievadiet uzv??rdu" />
                                                            </div>
                                                            <div className="col-md-6 col-12 space-mb--20">
                                                                <label>E-pasts*</label>
                                                                <input value={formData.email} onChange={(e) => onChangeField("email", e)} type="email" name="email" required placeholder="Ievadiet e-pastu" />
                                                            </div>
                                                            <div className="col-md-6 col-12 space-mb--20">
                                                                <label>Telefons*</label>
                                                                <input value={formData.phone} onChange={(e) => onChangeField("phone", e)} type="text" name="phone" required placeholder="Ievadiet telefonu" />
                                                            </div>
                                                            <div className="col-md-6 col-12 space-mb--20">
                                                                <label>Uz????mums</label>
                                                                <input value={formData.company} onChange={(e) => onChangeField("company", e)} type="text" name="company" placeholder="Ievadiet uz????mumu" />
                                                            </div>
                                                            <div className="col-md-6 col-12 space-mb--20">
                                                                <label>Omniva pakom??ts</label>
                                                                <select value={formData.parcel} onChange={(e) => onChangeField("parcel", e)}>
                                                                    <option>Izv??l??ties pakom??tu</option>
                                                                    {
                                                                        latvianParcelList.map((parcel, index) => <option key={index}>{parcel.NAME}</option>)
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className="col-12 space-mb--20">
                                                                <label>Koment??rs</label>
                                                                <textarea
                                                                    cols={30}
                                                                    rows={10}
                                                                    placeholder="Koment??rs"
                                                                    name="comment"
                                                                    id="contactMessage"
                                                                    onChange={(e) => onChangeField("comment", e)}
                                                                    value={formData.comment}
                                                                />
                                                            </div>
                                                            <input type="submit" value="Pabeigt pas??t??jumu" className=" col-12 lezada-button lezada-button--medium space-mt--20" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-5  order-lg-1 order-0">
                                                    <div className="row">
                                                        {/* Cart Total */}
                                                        <div className="col-12 space-mb--50">
                                                            <div className="checkout-cart-total">
                                                                <Row className="mb-3">
                                                                    <Col sm={9}><h4>Produkts</h4> </Col>
                                                                    <Col sm={3}><h4>Cena</h4> </Col>
                                                                </Row>
                                                                {cartItems.map((product, i) => {
                                                                    cartTotalPrice +=
                                                                        product.price * product.quantity;
                                                                    return (
                                                                        <Row key={i} className="mb-2">
                                                                            <Col sm={9}> {product.name} X {product.quantity}{" "}</Col>
                                                                            <Col sm={3}>{product.price.toFixed(2)}???</Col>
                                                                        </Row>
                                                                    );
                                                                })}

                                                                <Row>
                                                                    <Col sm={9}><h4>Summa kop??:</h4></Col>
                                                                    <Col sm={3}><h4>{cartTotalPrice.toFixed(2)}???</h4></Col>
                                                                </Row>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    }
                </Container>}
            </div>
        </LayoutTwo>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartData,
        parcelList: pakomati,
        settings: state.settingsData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteAllFromCart: (addToast) => {
            dispatch(deleteAllFromCart(addToast));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
