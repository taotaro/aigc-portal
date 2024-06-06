import React, { useCallback, useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { HashLink as Link } from "react-router-hash-link";
import { checkBrowser } from "../../util/index";
import CalculatorDialog from "../calculator-dialog";

export default function Header(props) {
	const { isMobile } = checkBrowser();
	const { t, lang } = useTranslation("common");
	const { current, hideDot = false } = props || {};
	const [showDialog, toggleSetDialog] = useState(false);
	const TABS = [
		{
			label: t("Home"),
			current: "INDEX",
			href: "/",
			submenu: []
		},
		{
			label: t("OurServicesMenu"),
			current: "OUR_SERVICES",
			href: "/services",
			submenu: [
				{
					label: t("Introduction"),
					current: "INTRO",
					href: "/intro",
					submenu: []
				},
				{
					label: t("services.ContentTitle1"),
					current: "SERVICES1",
					href: "/services"
				},
				{
					label: t("services.ContentTitle2"),
					current: "SERVICES2",
					href: "/services"
				},
				{
					label: t("services.ContentTitle3"),
					current: "SERVICES3",
					href: "/services"
				},
				{
					label: t("services.ContentTitle4"),
					current: "SERVICES4",
					href: "/services"
				}
			]
		},
		{
			label: t("AdvantagesOfTaxiLicensing"),
			current: "FEATURES",
			href: "/features",
			submenu: []
		},
		{
			label: t("InvestmentModel"),
			current: "INVESTMENT",
			href: "/invest",
			submenu: [
				{
					label: t("InStock"),
					current: "INVESTMENT1",
					href: "/invest"
				},
				{
					label: t("ForwardContract"),
					current: "INVESTMENT2",
					href: "/invest"
				}
			]
		},
		{
			label: t("BuyingAndSellingNotice"),
			current: "FINANCE",
			href: "/business",
			submenu: [
				{
					label: t("business.contentTitle3"),
					current: "FINANCE",
					href: "/process"
				},
				{
					label: t("business.contentTitle1"),
					current: "FINANCE1",
					href: "/business"
				},
				{
					label: t("business.contentTitle2"),
					current: "FINANCE2",
					href: "/business"
				},
				{
					label: t("CommonProblem"),
					current: "QA",
					href: "/questions"
				}
			]
		},
		// {
		//   label: t("TransactionProcess"),
		//   current: "TRANSACTION",
		//   href: "/transaction",
		//   submenu: []
		// },
		{
			label: t("PriceCalculator"),
			current: "PRICE",
			href: "/price",
			submenu: []
		},
		{
			label: t("LatestMarketInformation"),
			current: "NEWS",
			href: "/news",
			submenu: []
		},

		{
			label: t("ContributionCalculator"),
			current: "CALCULATOR",
			submenu: []
		},

		{
			label: t("ContactUs"),
			current: "CONTACT",
			href: "/contact",
			submenu: []
		}
	];

	const onTabItemClick = useCallback(item => {
		if (item.current === "CALCULATOR") {
			toggleSetDialog(true);
		}
	}, []);

	const onMouseEnter = useCallback(e => {
		if (isMobile) {
			return;
		}
		$(e.currentTarget)
			.find(".dropdown-toggle")
			.toggleClass("show");
		$(e.currentTarget)
			.find(".dropdown-menu")
			.toggleClass("show");
		$(e.currentTarget).toggleClass("show");
	}, []);

	const onMouseLeave = useCallback(e => {
		if (isMobile) {
			return;
		}
		$(e.currentTarget)
			.find(".dropdown-toggle")
			.toggleClass("show");
		$(e.currentTarget)
			.find(".dropdown-menu")
			.toggleClass("show");
		$(e.currentTarget).toggleClass("show");
	}, []);

	const onNavItemClick = useCallback(e => {
		e.stopPropagation();
	}, []);

	const switchLanguageHandler = language => {
		setLanguage(language);
	};

	function SubMenu({ item }) {
		// ${current === item.current ? "active" : "" }
		return (
			<li
				className="dropdown nav-item"
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<a
					href="#"
					className={`dropdown-toggle nav-link`}
					data-toggle="dropdown"
				>
					{item.label}
					<b className="caret"></b>
				</a>
				<div className="dropdownTransparent"></div>
				<ul
					style={{ marginTop: "10px" }}
					className="dropdown-menu agile_short_dropdown"
				>
					{item.submenu.map((item, i) => (
						<li key={item.href + i} onClick={onNavItemClick}>
							<a
								data-toggle="collapse"
								data-target=".navbar-collapse"
								className="dropdown-item"
								href={item.href + "#" + item.current}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</li>
		);
	}

	const tabs = TABS.map((item, index) => {
		// active
		// ${current === item.current ? "active" : ""}
		return (
			<>
				{item.submenu.length == 0 ? (
					<li className="nav-item" key={item.href + index}>
						<a
							onClick={() => {
								onTabItemClick(item);
							}}
							className={`nav-link`}
							href={`${item.href || "javascript: void(0)"}`}
						>
							{item.label} <span className="sr-only">(current)</span>
						</a>
					</li>
				) : (
					<>
						<SubMenu key={item.href + index} item={item} />
					</>
				)}
			</>
		);
	});

	return (
		<div>
			<header className="">
				<CalculatorDialog
					show={showDialog}
					onHide={() => {
						toggleSetDialog(false);
					}}
				/>
				<div className="top-nav">
					<div className="container-fluid">
						<nav className="navbar navbar-expand-lg navbar-light">
							<div className="navbarContent">
								<a href="/">
									<img
										src="https://hktec.s3.ap-southeast-1.amazonaws.com/general/HKTEC_Logo_new.png"
										alt=""
										className="hktexLogo"
									/>
								</a>
								<button
									className="navbar-toggler"
									type="button"
									data-toggle="collapse"
									data-target="#navbarSupportedContent"
									aria-controls="navbarSupportedContent"
									aria-expanded="false"
									aria-label="Toggle navigation"
								>
									<span className="navbar-toggler-icon"></span>
								</button>
							</div>
							<div
								className="collapse navbar-collapse justify-content-center"
								id="navbarSupportedContent"
							>
								<ul className="navbar-nav ml-auto navbar-main">
									{tabs}
									<li className="switchLang nav-item">
										<button
											className={lang === "cn" ? "SelectedLanguage" : ""}
											onClick={() => {
												switchLanguageHandler("cn");
											}}
										>
											简
										</button>
										<span className="langDiv">/</span>
										<button
											className={lang === "hk" ? "SelectedLanguage" : ""}
											onClick={() => {
												switchLanguageHandler("hk");
											}}
										>
											繁
										</button>
									</li>
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
