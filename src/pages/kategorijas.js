import Link from "next/link";
import { LayoutTwo } from "../components/Layout";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { SectionTitleThree } from "../components/SectionTitle";
import {
    CategoryGrid, CategoryGridTwo,
} from "../components/Category";
import { connect } from "react-redux";

const ProductCategories = ({ categories }) => {
    return (
        <LayoutTwo>
            <div className="element-wrapper space-mt--r100 space-mb--r100">
                <div className="about-title-container text-center">
                    <h1 className="space-mb--r100">
                        Kategorijas
                    </h1>
                </div>
                <CategoryGridTwo spaceBottomClass="space-mb--r100" categories={categories} />
            </div>
        </LayoutTwo>
    );
};

const mapStateToProps = (state) => {
    return {
        categories: state.categoryData,
    };
};

export default connect(mapStateToProps)(ProductCategories);
