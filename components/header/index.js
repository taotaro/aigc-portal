import React, { useCallback, useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import { checkBrowser, throttle } from "../../util/index";

export default function Header(props) {
    const { isMobile } = checkBrowser();
    const { t, lang } = useTranslation("common");
    const { current, hideDot = false } = props || {};
    const [navLinkStyle, setNavLinkStyle] = useState({ color: "#fff" });
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const NavList = [
        { label: "首頁", current: "INDEX", href: "/#indexModule" },
        { label: "比賽詳情 ", current: "INDEX", href: "/#requirementsModule" },
        {
            label: "比賽指南",
            current: "COMPETITION_GUIDE",
            href: "/competition-guide",
        },
        {
            label: "通義平台",
            current: "",
            href: "https://tongyi.aliyun.com",
        },
        {
            label: "網上報名",
            current: "REGISTRATION",
            href: "/registration",
            style: { color: "#ff6a00" },
        },
    ];

    function SubMenu({ item }) {
        const [dropdownOpen, setDropdownOpen] = useState(false);

        if (item.children) {
            return (
                <li
                    className={`dropdown nav-item ${
                        dropdownOpen ? "show" : ""
                    }`}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <a
                        href={item.href}
                        className="nav-link dropdown-toggle"
                        style={navLinkStyle}
                        role="button"
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen}
                        onClick={(e) => e.preventDefault()}
                    >
                        {item.label}
                    </a>
                    <ul
                        className={`dropdown-menu ${
                            dropdownOpen ? "show" : ""
                        }`}
                        style={{ backgroundColor: "#888" }}
                    >
                        {item.children.map((child, index) => (
                            <li key={child.href + index}>
                                <a
                                    href={child.href}
                                    className="dropdown-item"
                                    style={{
                                        color: "#fff", // White text color for dropdown items
                                        backgroundColor: "#888", // Grey background
                                    }}
                                >
                                    {child.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>
            );
        }

        return (
            <li className="nav-item">
                <a
                    href={item.href}
                    className="nav-link"
                    style={{ ...navLinkStyle, ...item.style }}
                >
                    {item.label}
                </a>
            </li>
        );
    }

    const tabs = NavList.map((item, index) => {
        return <SubMenu key={item.href + index} item={item} />;
    });

    function onWindowScroll() {
        const scrollHeight =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;

        // Change styles when scrolled down on mobile view
        if (scrollHeight > 800) {
            setNavLinkStyle({ color: "#333" });
            setScrolled(true);
        } else {
            setNavLinkStyle({ color: "#fff" });
            setScrolled(false);
        }
    }

    const throttledScroll = throttle(onWindowScroll, 200);

    useEffect(() => {
        window.addEventListener("scroll", throttledScroll);
        return () => {
            window.removeEventListener("scroll", throttledScroll);
        };
    }, []);

    return (
        <header
            className="index-header"
            style={{
                backgroundColor: isMobile && scrolled ? "#888" : "transparent",
                transition: "background-color 0.3s ease",
            }}
        >
            <nav className="navbar navbar-expand-lg navbar-light border-bottom-3">
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                        color: scrolled && isMobile ? "black" : "#fff", // Burger menu color change
                    }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`collapse navbar-collapse ${
                        menuOpen ? "show" : ""
                    }`}
                >
                    <ul
                        className="navbar-nav navbar-main"
                        style={{
                            color: scrolled && isMobile ? "#333" : "black", // Text color change based on scroll
                            backgroundColor:
                                isMobile && scrolled
                                    ? "#f0f0f0"
                                    : "transparent", // Transparent on desktop, changes on mobile scroll
                        }}
                    >
                        {tabs}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
