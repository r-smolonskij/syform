import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import _ from 'lodash'

const ProductDescriptionTab = ({ product }) => {

  const getActiveDefaultKey = () => {
    if (!_.isNil(product.description)) {
      return "description";
    }
    else if (_.isNil(product.description) && !_.isNil(product.usageInfo)) {
      return "usageInfo";
    } else if (_.isNil(product.description) && _.isNil(product.usageInfo) && (!_.isNil(product.ingredientsText) || !_.isNil(product.ingredientsPhoto))) {
      return "ingredients";
    } else {
      return "description";
    }

  }
  return (
    <div className="product-description-tab space-pt--r100 space-mt--r100 border-top--grey">
      <Tab.Container defaultActiveKey={getActiveDefaultKey()}>
        <Nav
          variant="pills"
          className="product-description-tab__navigation text-center justify-content-center space-mb--50"
        >
          {!_.isNil(product.description) && <Nav.Item>
            <Nav.Link eventKey="description">Apraksts</Nav.Link>
          </Nav.Item>
          }
          {!_.isNil(product.usageInfo) && <Nav.Item>
            <Nav.Link eventKey="usageInfo">
              Lietošana
            </Nav.Link>
          </Nav.Item>
          }
          {(!_.isNil(product.ingredientsText) || !_.isNil(product.ingredientsPhoto)) && <Nav.Item>
            <Nav.Link eventKey="ingredients">
              Sastāvs
            </Nav.Link>
          </Nav.Item>
          }
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="description">
            <div className="product-description-tab__details">
              <p>
                {product.description}
              </p>

            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="usageInfo">
            <div className="product-description-tab__additional-info">
              <p>
                {product.usageInfo}
              </p>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="ingredients">
            <div className="product-description-tab__additional-info">
              <p>{product.ingredientsText}</p>
              <div className="product-large-image-wrapper">
                <div className="single-image text-center">
                  <img
                    src={product.ingredientsPhoto}
                    className="ingredients-img"
                    alt={product.name}
                  />
                </div>
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default ProductDescriptionTab;
