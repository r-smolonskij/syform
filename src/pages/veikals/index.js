import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { getSortedProducts } from "../../lib/product";
import { ShopHeader, ShopFilter, ShopProducts, ShopSidebar } from "../../components/Shop";
import _ from 'lodash'
import { useRouter } from "next/dist/client/router";
import { IoMdCart } from "react-icons/io";
import Link from "next/link";

const CustomShop = ({ products, categories }) => {
    const [layout, setLayout] = useState("grid four-column");
    const [sortType, setSortType] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [filterSortType, setFilterSortType] = useState("");
    const [filterSortValue, setFilterSortValue] = useState("");
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
    const [categoryName, setCategoryName] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { kategorija } = router.query

    const pageLimit = 20;

    const getLayout = (layout) => {
        setLayout(layout);
    };

    const getSortParams = (categoryId) => {
        setLoading(true)
        const productsByCategory = _.isEqual(categoryId, "all") ? products : products.filter((product) => _.isEqual(product.categoryId, categoryId));
        if (_.isEqual(categoryId, "all")) {
            setCategoryName(null)
        } else {
            const category = _.filter(categories, category => _.isEqual(category.id, categoryId))[0];
            if (!_.isNil(category)) {
                setCategoryName(category.name)
            }
        }

        setSortedProducts(productsByCategory);
        setCurrentData(productsByCategory);
        setLoading(false)
    };

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    };

    useEffect(() => {
        console.log("John", kategorija)
        const productsByCategory = _.isNil(kategorija) ? products : products.filter((product) => _.isEqual(product.categoryId, parseInt(kategorija)));
        if (!_.isNil(kategorija)) {
            const category = _.filter(categories, category => _.isEqual(category.id, parseInt(kategorija)))[0];
            if (!_.isNil(category)) {
                setCategoryName(category.name)
            }
        }
        let sortedProducts = getSortedProducts(productsByCategory, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(
            sortedProducts,
            filterSortType,
            filterSortValue
        );
        sortedProducts = filterSortedProducts;
        console.log(sortedProducts);
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
        setLoading(false)
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue, kategorija]);

    const reloadPage = async () => {
        await router.replace("/veikals")
        await router.reload();
    }

    return (
        <LayoutTwo>
            <div className="about-content  space-mt--r100 space-mb--r100">
                <div className="section-title-container space-mb--40">
                    <div className="about-title-container text-center">
                        <h1>
                            Veikals
                        </h1>
                        {categoryName && <h4 className="space-mb--40">Kategorija: "{categoryName}"</h4>}
                    </div>
                    {!loading && <>
                        <div className="shop-page-content">
                            {/* shop page header */}
                            {!_.isEmpty(sortedProducts) && <ShopHeader
                                getLayout={getLayout}
                                getFilterSortParams={getFilterSortParams}
                                productCount={sortedProducts.length}
                                sortedProductCount={currentData.length}
                                shopTopFilterStatus={shopTopFilterStatus}
                                setShopTopFilterStatus={setShopTopFilterStatus}
                            />}

                            {/* shop page body */}
                            <div className="shop-page-content__body space-mt--r130 space-mb--r130">
                                <Container>
                                    <Row>
                                        {(!kategorija && !_.isEmpty(sortedProducts)) && <Col
                                            lg={3}
                                            sm={12}
                                            className="order-1 order-lg-0 "
                                        >
                                            {/* shop sidebar */}
                                            <ShopSidebar
                                                getSortParams={getSortParams}
                                            />
                                        </Col>}
                                        {!_.isEmpty(sortedProducts) && <Col lg={kategorija ? 12 : 9} className="order-2 order-lg-2">
                                            {/* shop products */}
                                            <ShopProducts layout={layout} products={currentData} />

                                            {/* shop product pagination */}
                                            <div className="pro-pagination-style">
                                                <Paginator
                                                    totalRecords={sortedProducts.length}
                                                    pageLimit={pageLimit}
                                                    pageNeighbours={2}
                                                    setOffset={setOffset}
                                                    currentPage={currentPage}
                                                    setCurrentPage={setCurrentPage}
                                                    pageContainerClass="mb-0 mt-0"
                                                    pagePrevText="«"
                                                    pageNextText="»"
                                                />
                                            </div>
                                        </Col>}

                                        {_.isEmpty(sortedProducts) &&
                                            <Col>
                                                <div className="item-empty-area text-center">
                                                    <div className="item-empty-area__icon space-mb--30">
                                                        <IoMdCart />
                                                    </div>
                                                    <div className="item-empty-area__text">
                                                        <p className="space-mb--30"> Netika atrasts neviens produkts! Lūdzu pārlādējiet lapu!</p>
                                                        <Link
                                                            href={`/veikals`}
                                                            as={`${process.env.PUBLIC_URL}/veikals`}
                                                        >
                                                            <a className="lezada-button lezada-button--medium" >
                                                                Pārlādēt
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Col>
                                        }
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </LayoutTwo>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.productData,
        categories: state.categoryData
    };
};

export default connect(mapStateToProps)(CustomShop);
