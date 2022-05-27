import { useState, Fragment } from "react";
import { IoIosHeartEmpty, IoIosShuffle } from "react-icons/io";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { ProductRating } from "../Product";
import { getProductCartQuantity } from "../../lib/product";

const ProductDescription = ({
  product,
  productPrice,
  discountedPrice,
  cartItems,
  addToast,
  addToCart,
}) => {
  const [quantityCount, setQuantityCount] = useState(product.isAvailable ? 1 : 0);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
  );

  return (
    <div className="product-content">
      <h2 className="product-content__title space-mb--20">{product.name}</h2>
      <div className="product-content__description space-mb--30">
        <p>{product.shortDescription}</p>
      </div>

      {product.variation ? (
        <div className="product-content__size-color">
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Size</div>
            <div className="product-content__size__content">
              {product.variation &&
                product.variation.map((single) => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, i) => {
                      return (
                        <Fragment key={i}>
                          <input
                            type="radio"
                            value={singleSize.name}
                            checked={
                              singleSize.name === selectedProductSize
                                ? "checked"
                                : ""
                            }
                            id={singleSize.name}
                            onChange={() => {
                              setSelectedProductSize(singleSize.name);
                              setProductStock(singleSize.stock);
                              setQuantityCount(1);
                            }}
                          />
                          <label htmlFor={singleSize.name}>
                            {singleSize.name}
                          </label>
                        </Fragment>
                      );
                    })
                    : "";
                })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <Fragment>
        <div className="product-content__quantity space-mb--40">
          <div className="product-content__quantity__title">Skaits</div>
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="qtybutton"
              disabled={!product.isAvailable}
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount + 1
                )
              }
              className="qtybutton"
              disabled={!product.isAvailable}
            >
              +
            </button>
          </div>
        </div>

        <div className="product-content__button-wrapper d-flex align-items-center">

          <button
            onClick={() =>
              addToCart(
                product,
                addToast,
                quantityCount,
              )
            }
            disabled={!product.isAvailable}
            className="lezada-button lezada-button--medium product-content__cart space-mr--10"
          >
            {product.isAvailable ? "Pievienot grozam" : "Nav pieejams"}
          </button>
        </div>

        <div className="product-content__other-info space-mt--50">
          <table>
            <tbody>
              <tr className="single-info">
                <td className="title">Noliktavas numurs: </td>
                <td className="value">{product.sku}</td>
              </tr>
              <tr className="single-info">
                <td className="title">Kategorija: </td>
                <td className="value">

                  <Link
                    href={`/veikals/?kategorija=${product.categoryId}`}
                    as={process.env.PUBLIC_URL + `/veikals/?kategorija=${product.categoryId}`}
                  >
                    <a>
                      {product.categoryName}
                    </a>
                  </Link>

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Fragment>
    </div>
  );
};

export default ProductDescription;
