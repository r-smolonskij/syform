import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoIosArrowRoundUp } from "react-icons/io";
import { connect } from "react-redux";
import { animateScroll } from "react-scroll";

const FooterTwo = ({ settings }) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  return (
    <footer
      className={`space-pt--50 space-pb--50 bg-color--grey`}
    >
      <Container className="wide">
        <Row>
          <Col className="footer-single-widget ">
            {/* logo */}
            <div className="logo space-mb--35">
              <a href="/">
                <img
                  // src={"/assets/images/logo.png"}
                  src={settings.footerLogo}
                  className="img-fluid"
                  alt=""
                />
              </a>
            </div>

            {/*=======  copyright text  =======*/}
            <div className="footer-single-widget__copyright">
              &copy; {new Date().getFullYear() + " "}
              Syform Latvia
            </div>
          </Col>
        </Row>
      </Container>
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <IoIosArrowRoundUp />
      </button>
    </footer>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settingsData
  };
};

export default connect(mapStateToProps)(FooterTwo);
