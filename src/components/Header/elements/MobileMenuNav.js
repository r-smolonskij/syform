import { useEffect } from "react";
import Link from "next/link";
import {
  IoIosCart
} from "react-icons/io";

const MobileMenuNav = ({ getActiveStatus }) => {
  useEffect(() => {
    const offCanvasNav = document.querySelector(
      "#offcanvas-mobile-menu__navigation"
    );
    const offCanvasNavSubMenu = offCanvasNav.querySelectorAll(
      ".mobile-sub-menu"
    );
    const anchorLinks = offCanvasNav.querySelectorAll("a");

    for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
      offCanvasNavSubMenu[i].insertAdjacentHTML(
        "beforebegin",
        "<span class='menu-expand'><i></i></span>"
      );
    }

    const menuExpand = offCanvasNav.querySelectorAll(".menu-expand");
    const numMenuExpand = menuExpand.length;

    for (let i = 0; i < numMenuExpand; i++) {
      menuExpand[i].addEventListener("click", (e) => {
        sideMenuExpand(e);
      });
    }

    for (let i = 0; i < anchorLinks.length; i++) {
      anchorLinks[i].addEventListener("click", () => {
        getActiveStatus(false);
      });
    }
  });

  const sideMenuExpand = (e) => {
    e.currentTarget.parentElement.classList.toggle("active");
  };
  return (
    <nav
      className="offcanvas-mobile-menu__navigation"
      id="offcanvas-mobile-menu__navigation"
    >
      <ul>
        <li className="menu-item-has-children">
          <Link href="/" as={process.env.PUBLIC_URL + "/"}>
            <a>Sākums</a>
          </Link>
        </li>
        <li className="menu-item-has-children">
          <Link href="/veikals" as={process.env.PUBLIC_URL + "/veikals"}>
            <a>Veikals</a>
          </Link>
        </li>
        <li className="menu-item-has-children">
          <Link href="/kategorijas" as={process.env.PUBLIC_URL + "/kategorijas"}>
            <a>Kategorijas</a>
          </Link>
        </li>
        <li className="menu-item-has-children">
          <Link href="/par-mums" as={process.env.PUBLIC_URL + "/par-mums"}>
            <a>Par mums</a>
          </Link>
        </li>
        <li className="menu-item-has-children">
          <Link href="/apmaksa-piegade" as={process.env.PUBLIC_URL + "/apmaksa-piegade"}>
            <a>Apmaksa/Piegāde</a>
          </Link>
        </li>
        <li className="menu-item-has-children">
          <Link href="/grozs" as={process.env.PUBLIC_URL + "/grozs"}>
            <a>Grozs <IoIosCart /> </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenuNav;
