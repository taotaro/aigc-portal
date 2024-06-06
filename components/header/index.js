import React, { useCallback, useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import { checkBrowser } from "../../util/index";

export default function Header(props) {
	const { isMobile } = checkBrowser();
	const { t, lang } = useTranslation("common");
	const { current, hideDot = false } = props || {};

	const NavList = [
		{ label: t("nav.index"), current: "INDEX", href: "/#/index" },
		{ label: t("nav.activity"), current: "INDEX", href: "/#/index" },
		{ label: t("nav.future"), current: "INDEX", href: "/#/index" },
	];


	function SubMenu({ item }) {
		return (
			<li className="dropdown nav-item">
				<a href="#" className="nav-link" data-toggle="dropdown">
					{item.label}
				</a>
			</li>
		);
	}

	const tabs = NavList.map((item, index) => {
		return <SubMenu key={item.href + index} item={item} />;
	});

	return (
		<div className="fixed-top">
			<header>
				<div className="top-nav">
					<div className="container-fluid">
						<nav className="navbar navbar-expand-lg navbar-light">
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav navbar-main">
									{tabs}
								</ul>
							</div>
						</nav>
					</div>
				</div>
			</header>
			{!hideDot && (
				<section className="innerpage_banner py-5">
					<div className="dot1"></div>
				</section>
			)}
		</div>
	);
}
