import { Fragment } from "react";
import { HeaderOne } from "../Header";
import { FooterOne, FooterTwo } from "../Footer";

const LayoutTwo = ({ children, aboutOverlay, footerBgClass }) => {
  return (
    <Fragment>
      <HeaderOne aboutOverlay={aboutOverlay} />
      <div className="page-wrap">
        {children}

      </div>
      <FooterTwo footerBgClass={footerBgClass} />
      {/* <FooterOne footerBgClass={footerBgClass} /> */}

    </Fragment>
  );
};

export default LayoutTwo;
