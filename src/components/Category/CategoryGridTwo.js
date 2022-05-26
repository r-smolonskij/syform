import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

const CategoryGridTwo = ({ spaceBottomClass, categories }) => {
  return (
    <div
      className={`product-category-container ${spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <Container >
        <Row className="justify-center">
          {
            categories && categories.map((category, index) => {
              if (index % 2 == 0) {
                return <Col lg={4} md={6}>
                  <div className="single-category single-category--one" >
                    <div className="single-category__content single-category__content--one space-mt--25 space-mb--25 d-none d-lg-block">
                      <div className="title">
                        <p><b>{category.name}</b></p>
                        <Link
                          href={`/veikals?kategorija=${category.id}`}
                          as={process.env.PUBLIC_URL + `/veikals?kategorija=${category.id}`}
                        >
                          <a>+ Iepirkties</a>
                        </Link>
                      </div>
                    </div>

                    <div className="single-category__image single-category__image--one">
                      <img
                        src={category.image}
                        className="img-fluid"
                        alt={category.name}
                      />
                    </div>
                    <div className="single-category__content single-category__content--one space-mt--25 space-mb--25 d-block d-lg-none">
                      <div className="title">
                        <p><b>{category.name}</b></p>
                        <Link
                          href={`/veikals?kategorija=${category.id}`}
                          as={process.env.PUBLIC_URL + `/veikals?kategorija=${category.id}`}
                        >
                          <a>+ Iepirkties</a>
                        </Link>
                      </div>

                    </div>
                    <Link
                      href={`/veikals?kategorija=${category.id}`}
                      as={process.env.PUBLIC_URL + `/veikals?kategorija=${category.id}`}
                    >
                      <a className="banner-link" />
                    </Link>
                  </div>
                </Col>
              } else {
                return <Col lg={4} md={6}>
                  <div className="single-category single-category--one">
                    <div className="single-category__image single-category__image--one">
                      <img
                        src={category.image}
                        className="img-fluid"
                        alt={category.name}
                      />
                    </div>
                    <div className="single-category__content single-category__content--one space-mt--25 space-mb--25">
                      <div className="title">
                        <p><b>{category.name}</b></p>
                        <Link
                          href={`/veikals?kategorija=${category.id}`}
                          as={process.env.PUBLIC_URL + `/veikals?kategorija=${category.id}`}
                        >
                          <a>+ Iepirkties</a>
                        </Link>
                      </div>

                    </div>
                    <Link
                      href={`/veikals?kategorija=${category.id}`}
                      as={process.env.PUBLIC_URL + `/veikals?kategorija=${category.id}`}
                    >
                      <a className="banner-link" />
                    </Link>
                  </div>
                </Col>
              }
            })
          }


        </Row>
      </Container>
    </div>
  );
};

export default CategoryGridTwo;
