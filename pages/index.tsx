import React, { useEffect, useState, useCallback } from "react";
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation'
import Slider from "../components/slider/index";
import axiosInstance from "../util/request";
import { getIn } from "../util/index";

export default function Index() {
	const { t } = useTranslation('common');

	const DEFAULT_SLIDERS = [
		{
			title: t("homepage.slider.bannerTitle1"),
			subTitle: t("homepage.slider.bannerSubTitle1"),
			jumpUrl: "services",
			buttonText: t("homepage.slider.bannerButton1"),
			imageUrl:
				"https://hktec.s3.ap-southeast-1.amazonaws.com/home/banner1-min.jpeg?x-oss-process=image/resize,h_770,w_1448,m_fixed",
		},
		{
			title: t("homepage.slider.bannerTitle2"),
			subTitle: t("homepage.slider.bannerSubTitle2"),
			jumpUrl: "features",
			buttonText: t("homepage.slider.bannerButton2"),
			imageUrl:
				"https://hktec.s3.ap-southeast-1.amazonaws.com/home/banner2.jpeg?x-oss-process=image/resize,h_770,w_1448,m_fixed",
		},
		{
			title: t("homepage.slider.bannerTitle3"),
			subTitle: t("homepage.slider.bannerSubTitle3"),
			jumpUrl: "invest",
			buttonText: t("homepage.slider.bannerButton3"),
			imageUrl:
				"https://hktec.s3.ap-southeast-1.amazonaws.com/home/banner3.jpeg?x-oss-process=image/resize,h_770,w_1448,m_fixed",
		},
	];

	const [sliders, updateSliders] = useState<any[] | null>([]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<NextSeo
				title={"的士牌價．HKTEC 香港的士交易中心"}
				description={'一站式的士牌照交易平台'}
			/>
			<Slider sliders={sliders} />
		</>
	);
}


Index.EXTEND_INFO = {
	pageName: 'INDEX',
};
