import React, { useCallback, useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import { checkBrowser, throttle } from "../../util/index";

export default function Header(props) {
	const { isMobile } = checkBrowser();
	const { t, lang } = useTranslation("common");
	const { current, hideDot = false } = props || {};
	const [navLinkStyle, setNavLinkStyle] = useState({ color: '#fff' });

	const NavList = [
		{ label: "首頁", current: "INDEX", href: "/#indexModule" },
		{ label: "活動內容", current: "INDEX", href: "/#articleModule" },
		{ label: "未來教室日程", current: "INDEX", href: "/#classRoomModule" },
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
		const scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		if (scrollHeight > 980) {
			setNavLinkStyle({ color: '#333' });
		} else {
			setNavLinkStyle({ color: '#fff' });
		}
	}

	const throttledScroll = throttle(onWindowScroll, 200);

	useEffect(() => {
		window.addEventListener('scroll', throttledScroll);
		return () => {
			window.removeEventListener('scroll', throttledScroll);
		}
	}, []);

	return (
		<header className="index-header">
			<nav className="navbar navbar-expand-lg navbar-light border-bottom-3">
				<ul className="navbar-nav navbar-main">
					{tabs}
				</ul>
			</nav>
		</header>
	);
}
