import { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
import { IoMdExpand, IoIosHeartEmpty } from "react-icons/io";
import { Tooltip } from "react-tippy";
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
