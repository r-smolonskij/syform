import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import _ from 'lodash'

const ProductDescriptionTab = ({ product }) => {
  return (
    <div className="product-description-tab space-pt--r100 space-mt--r100 border-top--grey">
      <Tab.Container defaultActiveKey="description">
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
          {!_.isNil(product.ingredients) && <Nav.Item>
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
              <div className="htmlContent" dangerouslySetInnerHTML={{ __html: documentToHtmlString(product.ingredients) }}></div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default ProductDescriptionTab;
