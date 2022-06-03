import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";

const ProductImage = ({
    product,
}) => {

    return (
        <Fragment>
            <Row className="align-items-center image-gallery-side-thumb-wrapper">

                <Col xl={10} className="order-1">
                    <div className="product-large-image-wrapper">
                        <div className="single-image">
                            <img
                                src={product.image}
                                className="img-fluid"
                                alt=""
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    );
};

export default ProductImage;
