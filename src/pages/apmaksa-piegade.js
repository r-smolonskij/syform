import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { LayoutTwo } from "../components/Layout";

const PaymentAndDelivery = ({ settings }) => {
    useEffect(() => {
        console.log(settings.deliveryAndPayment);
    }, [])

    return (
        <LayoutTwo>

            <div className="about-content space-mt--r100 space-mb--r100">
                <Container>
                    <div className="htmlContent" dangerouslySetInnerHTML={{ __html: documentToHtmlString(settings.deliveryAndPayment).replace(/\n/g, `</br>`) }}></div>
                </Container>
            </div>
        </LayoutTwo>
    );
};
const mapStateToProps = (state) => {
    const settings = state.settingsData;
    return {
        settings: settings,
    };
};

export default connect(mapStateToProps)(PaymentAndDelivery);
