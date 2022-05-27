import { connect } from "react-redux";
import { getProducts } from "../lib/product";
import { LayoutTwo } from "../components/Layout";
import { HeroSliderOne } from "../components/HeroSlider";
import { ProductTab } from "../components/ProductTab";
import heroSliderData from "../data/hero-sliders/hero-slider-one.json";
import { Container, Row, Col } from "react-bootstrap";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";


const Home = ({ settings }) => {
  return (
    <LayoutTwo aboutOverlay={false}>
      {/* hero slider */}
      <HeroSliderOne sliderData={settings.homeSliderPhotos} />
      <Container>
        <Row>
          <Col lg={10} className="ml-auto mr-auto pb-5 mb-5 mt-5 text-center">
            <div className="htmlContent" dangerouslySetInnerHTML={{ __html: documentToHtmlString(settings.homePageInfoText).replace(/\n/g, `</br>`) }}></div>
          </Col>
        </Row>
      </Container>
    </LayoutTwo>
  );
};

const mapStateToProps = (state) => {
  const settings = state.settingsData;
  return {
    settings: settings,
  };
};

export default connect(mapStateToProps)(Home);
