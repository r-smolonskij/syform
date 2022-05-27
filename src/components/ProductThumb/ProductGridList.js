import { Fragment, useState } from "react";
import { Col } from "react-bootstrap";
import Link from "next/link";
import { IoIosHeartEmpty, IoIosShuffle, IoIosSearch, IoIosCart } from "react-icons/io";
import { Tooltip } from "react-tippy";
import ProductModal from "./ProductModal";

const ProductGridList = ({
  product,
  productPrice,
  bottomSpace,
}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
      <Col lg={3} md={6} className={bottomSpace ? bottomSpace : ""}>
        <div className="product-grid">
          {/*=======  single product image  =======*/}
          <div className="product-grid__image">
            <Link
              href={`/veikals/produkts/[slug]?slug=${product.slug}`}
              as={process.env.PUBLIC_URL + `/veikals/produkts/${product.slug}`}
            >
              <a className="image-wrap">
                <img
                  src={product.image}
                  className="img-fluid"
                  alt={product.name}
                />

              </a>
            </Link>
          </div>

          {/*=======  single product content  =======*/}
          <div className="product-grid__content">
            <div className="title">
              <h3>
                <Link
                  href={`/veikals/produkts/[slug]?slug=${product.slug}`}
                  as={process.env.PUBLIC_URL + `/veikals/produkts/${product.slug}`}
                >
                  <a>{product.name}</a>
                </Link>
              </h3>
            </div>
            <div className="price">
              <span className="main-price">{productPrice}€</span>
            </div>
          </div>
        </div>

        <div className="product-list">
          {/*=======  single product image  =======*/}
          <div className="product-list__image">
            <Link
              href={`/veikals/produkts/[slug]?slug=${product.slug}`}
              as={process.env.PUBLIC_URL + `/veikals/produkts/${product.slug}`}
            >
              <a className="image-wrap">
                <img
                  src={product.image}
                  className="img-fluid"
                  alt={product.name}
                />
              </a>
            </Link>
            <div className="product-list__floating-icons">
              <button
                onClick={() => setModalShow(true)}
                className="d-none d-lg-block"
              >
                <IoIosCart />
              </button>
            </div>
          </div>

          {/*=======  single product content  =======*/}
          <div className="product-list__content">
            <div className="title">
              <h3>
                <Link
                  href={`/veikals/produkts/[slug]?slug=${product.slug}`}
                  as={process.env.PUBLIC_URL + `/veikals/produkts/${product.slug}`}
                >
                  <a>{product.name}</a>
                </Link>
              </h3>
            </div>
            <div className="price">
              <span className="main-price">{productPrice}€</span>
            </div>
            <div className="add-to-cart">
              <Link
                href={`/veikals/produkts/[slug]?slug=${product.slug}`}
                as={process.env.PUBLIC_URL + `/veikals/produkts/${product.slug}`}
              >
                <button
                  className="lezada-button lezada-button--medium"
                >
                  Apskatīt produktu
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Col>

    </Fragment>
  );
};

export default ProductGridList;
