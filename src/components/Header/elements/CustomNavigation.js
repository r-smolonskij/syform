import Link from "next/link";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
const CustomNavigation = () => {
    return (
        <nav className="header-content__navigation space-pr--15 space-pl--15 d-none d-lg-block">
            <ul>
                <li>
                    <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                        <a>Sākums</a>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/veikals"
                        as={process.env.PUBLIC_URL + "/veikals"}
                    >
                        <a>Veikals</a>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/kategorijas"
                        as={process.env.PUBLIC_URL + "/kategorijas"}
                    >
                        <a>Kategorijas</a>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/par-mums"
                        as={process.env.PUBLIC_URL + "/par-mums"}
                    >
                        <a>Par mums</a>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/apmaksa-piegade"
                        as={process.env.PUBLIC_URL + "/apmaksa-piegade"}
                    >
                        <a>Apmaksa/Piegāde</a>
                    </Link>
                </li>

            </ul>
        </nav>
    );
};

export default CustomNavigation;
