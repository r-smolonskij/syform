import { Fragment } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { HeaderOne } from "../components/Header";

const NotFound = () => {
  return (
    <Fragment>
      <HeaderOne />

      <Container>
        <Row>
          <Col lg={12}>
            <div className="nothing-found-content">
              <h1>Oops!</h1>
              <h1 className="space-mb--50">Lapa netika atrasta!</h1>
              <p className="direction-page">
                Lūdzu dodaties atpakaļ uz {" "}
                <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                  <a>Sākumlapu</a>
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default NotFound;
