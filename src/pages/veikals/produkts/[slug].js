import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { LayoutTwo } from "../../../components/Layout";
import _ from 'lodash'

import {
  ImageGalleryBottomThumb,
  ProductDescription,
  ProductDescriptionTab
} from "../../../components/ProductDetails";
import { addToCart } from "../../../redux/actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist
} from "../../../redux/actions/wishlistActions";
import {
  addToCompare,
  deleteFromCompare
} from "../../../redux/actions/compareActions";

import { LightgalleryItem, LightgalleryProvider } from "react-lightgallery";
import ProductImage from "../../../components/ProductDetails/ProductImage";
import { useRouter } from 'next/router'

const ProductBasic = ({
  products,
  cartItems,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare
}) => {

  const router = useRouter()
  const { slug } = router.query
  const [product, setProduct] = useState(null)
  const [cartItem, setCartItem] = useState(null)

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
    initialLoad();
  });

  const { addToast } = useToasts();

  const initialLoad = () => {
    const foundProduct = products.filter((single) => single.slug === parseInt(slug))[0];
    if (_.isNil(foundProduct)) {
      router.push('/not-found')
    } else {
      setProduct(foundProduct);
      const foundCartItem = cartItems.filter(
        (cartItem) => cartItem.id === foundProduct.id
      )[0];
      setCartItem(foundCartItem);
    }
  }

  return (
    <>
      {product && <LayoutTwo>

        {/* product details */}
        <div className="product-details space-mt--r100 space-mb--r100">
          <Container>
            <Row>
              <Col lg={6} className="space-mb-mobile-only--50">
                {/* image gallery bottom thumb */}
                <div className="product-large-image-wrapper space-mb--30">
                  {product.image && <ProductImage product={product} />}
                </div>
              </Col>

              <Col lg={6}>
                {/* product description */}
                <ProductDescription
                  product={product}
                  cartItems={cartItems}
                  cartItem={cartItem}
                  addToast={addToast}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                  deleteFromWishlist={deleteFromWishlist}
                  addToCompare={addToCompare}
                  deleteFromCompare={deleteFromCompare}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {/* product description tab */}
                {<ProductDescriptionTab product={product} />}
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutTwo>}
    </>
  );
};

const mapStateToProps = (state) => {

  return {
    cartItems: state.cartData,
    products: state.productData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
    deleteFromCompare: (item, addToast) => {
      dispatch(deleteFromCompare(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBasic);
