import React, { useCallback, useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import { checkBrowser, throttle } from "../../util/index";

export default function Header(props) {
  const { isMobile } = checkBrowser();
  const { t, lang } = useTranslation("common");
  const { current, hideDot = false } = props || {};
  const [navLinkStyle, setNavLinkStyle] = useState({ color: "#fff" });
  const [menuOpen, setMenuOpen] = useState(false);

  const NavList = [
    { label: "首頁", current: "INDEX", href: "/#indexModule" },
    { label: "游戏资讯", current: "INDEX", href: "/#gameInfoModule" },
    { label: "比賽要求", current: "INDEX", href: "/#requirementsModule" },
    { label: "日程", current: "INDEX", href: "/#scheduleModule" },
    { label: "立即報名", current: "REGISTRATION", href: "/registration" },
    // { label: "活動評委", current: "JUDGES", href: "/judges" },
    { label: "活動條款及細則", current: "TERMS", href: "/terms" },
  ];

  function SubMenu({ item }) {
    return (
      <li className="dropdown nav-item">
        <a href={item.href} className="nav-link" style={navLinkStyle}>
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
    if (scrollHeight > 980) {
      setNavLinkStyle({ color: "#333" });
    } else {
      setNavLinkStyle({ color: "#fff" });
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
    <header className="index-header">
      <nav className="navbar navbar-expand-lg navbar-light border-bottom-3">
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav navbar-main" style={{ color: "black" }}>
            {tabs}
          </ul>
        </div>
      </nav>
    </header>
  );
}
