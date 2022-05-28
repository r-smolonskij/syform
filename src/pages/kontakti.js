
import { LayoutTwo } from "../components/Layout";
import { connect } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosMail, IoIosPhonePortrait } from "react-icons/io";

const Contacts = ({ settings }) => {
    return (
        <LayoutTwo>
            <div className="element-wrapper space-mt--r100 space-mb--r100">
                <div className="about-title-container text-center">
                    <h1 className="space-mb--r100">
                        Kontakti
                    </h1>
                </div>
                <Container>
                    <Row className="justify-content-around ">
                        <Col lg={4} md={5}>
                            <div className="icon-box icon-box--color-center icon-box--color-center--blue">
                                <div className="icon-box--color-center__icon icon-box--color-center--blue__icon">
                                    <IoIosMail size={60} />
                                </div>
                                <div className="icon-box--color-center__content">
                                    <h2 className="title">E-pasts</h2>
                                    <p className="content"><a href={`mailto:${settings.email}`}>{settings.email}</a></p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={5}>
                            <div className="icon-box icon-box--color-center icon-box--color-center--green">
                                <div className="icon-box--color-center__icon icon-box--color-center--green__icon">
                                    <IoIosPhonePortrait size={60} />
                                </div>
                                <div className="icon-box--color-center__content">
                                    <h2 className="title">Tālrunis</h2>
                                    <p className="content">{settings.phoneNumber}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </div>
        </LayoutTwo>
    );
};

const mapStateToProps = (state) => {
    return {
        settings: state.settingsData,
    };
};

export default connect(mapStateToProps)(Contacts);
