import { connect } from "react-redux";
import { getProducts } from "../lib/product";
import { LayoutTwo } from "../components/Layout";
import { HeroSliderOne } from "../components/HeroSlider";
import { ProductTab } from "../components/ProductTab";
import heroSliderData from "../data/hero-sliders/hero-slider-one.json";


const Home = ({ products }) => {
  return (
    <LayoutTwo aboutOverlay={false}>
      {/* hero slider */}
      <HeroSliderOne sliderData={heroSliderData} />

    </LayoutTwo>
  );
};

const mapStateToProps = (state) => {
  const products = state.productData;
  return {
    products: products,
  };
};

export default connect(mapStateToProps)(Home);
