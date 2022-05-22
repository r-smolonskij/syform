import {
  IoIosPhonePortrait,
  IoMdMail,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoPinterest,
  IoMdPerson
} from "react-icons/io";

import Link from "next/link";

const MobileMenuWidgets = () => {
  return (
    <div className="offcanvas-mobile-menu__widgets">
      <Link href="/" as={process.env.PUBLIC_URL + "/"}>
        <a>
          <img
            src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
            className="img-fluid"
            alt=""
          />
        </a>
      </Link>
    </div>
  );
};

export default MobileMenuWidgets;
