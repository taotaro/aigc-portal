import React, { useEffect, useState, useCallback } from "react";
import { NextSeo } from 'next-seo';
import Image from "next/image";
import useTranslation from 'next-translate/useTranslation'
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
			<NextSeo title={"雲馳通義 ‧ 洞見萬相千問"} description={'阿里雲香港未來教室 暨「雲馳通義 ‧ 洞見萬相千問」生成式 AI 校際比賽發佈會'} />
			<img className="position-fixed" src="/images/index-bg.png" alt="" style={{ width: '100%', height: 'auto' }}/>
		</>
	);
}


Index.EXTEND_INFO = {
	pageName: 'INDEX',
};
