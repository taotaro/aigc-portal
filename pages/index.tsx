import React, { useEffect, useState, useCallback } from "react";
import { NextSeo } from 'next-seo';
import Image from "next/image";
import useTranslation from 'next-translate/useTranslation'
import axiosInstance from "../util/request";
import { throttle } from "../util/index";

export default function Index() {
	const { t } = useTranslation('common');
	const [fixedBgHeight, setFixedBgHeight] = useState(200);

	const scheduleList = [
		{ time: '2:00 – 2:30 pm', desc: '來賓登記' },
		{ time: '2:30 – 2:35 pm', desc: '開幕儀式' },
		{ time: '2:35 – 2:40 pm', desc: '第一位嘉賓分享' },
		{ time: '2:40 – 2:45 pm', desc: '第二位嘉賓分享' },
		{ time: '2:45 – 2:50 pm', desc: '全場合照' },
		{ time: '2:50 – 3:10 pm', desc: '阿里雲及通義產品的介紹' },
		{ time: '3:10 – 3:25 pm', desc: '小組討論A - 如何應用中國發展技術' },
		{ time: '3:25 – 3:40 pm', desc: '小組討論B - 以中文為藍本的大型語言模組應用優勢' },
		{ time: '3:40 – 4:10 pm', desc: '中場休息及茶點招待、Demo試用' },
		{ time: '4:10 – 4:30 pm', desc: '（分開房間）資料登記、中學／小學賽制介紹及注意事項' },
		{ time: '4:30 – 5:00 pm', desc: '問答時間' },
	];

	function onWindowResize() {
		const $fixedBg = document.getElementById('fixed-bg');
		const height = $fixedBg?.getBoundingClientRect()?.height || 200;
		setFixedBgHeight(height);
	}

	const throttledResize = throttle(onWindowResize, 200);

	useEffect(() => {
		window.scrollTo(0, 0);
		onWindowResize();
		window.addEventListener('resize', throttledResize);
		return () => {
			window.removeEventListener('resize', throttledResize);
		}
	}, []);

	const tableColListRender = scheduleList.map((item, index) => {
		return (
			<div className="module-table__row" key={index}>
				<div className="module-table__col">{item.time}</div>
				<div className="module-table__col">{item.desc}</div>
			</div>
		);
	});

	return (
		<>
			<NextSeo title={"雲馳通義 ‧ 洞見萬相千問"} description={'阿里雲香港未來教室 暨「雲馳通義 ‧ 洞見萬相千問」生成式 AI 校際比賽發佈會'} />
			<img id="fixed-bg" className="position-fixed" onLoad={onWindowResize} src="/images/index-bg.png" alt="" style={{ width: '100%', height: 'auto' }} />
			{/* slogan */}
			<section className="title-section position-relative" style={{ height: `${fixedBgHeight}px` }}>
				<h1 className="title">雲馳通義 ‧ 洞見萬相千問</h1>
				<h3 className="subtitle">阿里雲香港未來教室 暨「雲馳通義 ‧ 洞見萬相千問」生成式 AI 校際比賽發佈會</h3>
			</section>
			{/* 介绍 */}
			<section className="position-relative intro-box">
				<div className="intro">
					<img className="intro-tag intro-tag-left" src="/images/tag1.png" alt="tag" />
					<p>為慶祝在港營運10周年，「阿里雲香港未來教室」及「雲馳通義 ‧ 洞見萬相千問」生成式 AI 校際比賽計劃正式啟動。阿里雲冀藉此推動學界同工，透過中國自家研發的雲端技術，於課室及學校內使用科技，提升同學學習成果和效率。</p>
					<img className="intro-tag intro-tag-right" src="/images/tag1.png" alt="tag" />
				</div>
			</section>
			{/* 活動內容 */}
			<section className="position-relative module-box">
				<p className="module-title">活動內容</p>
				<div className="module-content">
					<div className="module-content__left">
						<div className="module-content__title">阿里雲教育產品分享</div>
						<div className="module-content__desc">介紹阿里雲香港在AI教育領域的最新計劃和成果，並展示如何將AI技術應用於教與學環境，以強化學生的創造能力和解難思維。 </div>
					</div>
					<div className="module-content__right">
						<img className="module-content__img" src="/images/activity1.png" alt="阿里雲教育產品分享" />
					</div>
				</div>
				<div className="module-content module-content-reverse">
					<div className="module-content__left">
						<div className="module-content__title">嘉賓演講</div>
						<div className="module-content__desc">邀請AI教育領域的專家、學者和實踐者分享經驗和見解；探討AI教育的趨勢、挑戰和未來發展。 </div>
					</div>
					<div className="module-content__right">
						<img className="module-content__img" src="/images/activity2.png" alt="阿里雲教育產品分享" />
					</div>
				</div>
				<div className="module-content">
					<div className="module-content__left">
						<div className="module-content__title">即場試用阿里雲AI</div>
						<div className="module-content__desc">即場試用阿里雲生成式AI「通義平台」，讓參與者深入了解AI教育，並提供實際操作的機會。 </div>
					</div>
					<div className="module-content__right">
						<img className="module-content__img" src="/images/activity3.png" alt="阿里雲教育產品分享" />
					</div>
				</div>
				<div className="module-content module-content-reverse">
					<div className="module-content__left">
						<div className="module-content__title">比賽介紹</div>
						<div className="module-content__desc">講解「雲馳通義 ‧ 洞見萬相千問」校際生成式 AI 比賽的目的、參賽要求和評分標準。這個創科盛事旨在推動全港中小學生利用AI人工智能，激發創意，並將獨特的意念付諸實行。參賽同學需要運用阿里巴巴旗下AI應用平台「通義千問」、「通義萬相」和「通義星塵」，根據特定主題創作。 </div>
					</div>
					<div className="module-content__right">
						<img className="module-content__img" src="/images/activity4.png" alt="阿里雲教育產品分享" />
					</div>
				</div>
			</section>
			{/* 未來教室日程 */}
			<section className="position-relative module-box">
				<p className="module-title">未來教室日程</p>
				<div className="module-table">
					<div className="module-table__row module-table__header">
						<div className="module-table__col">時間</div>
						<div className="module-table__col">內容</div>
					</div>
					{tableColListRender}
				</div>
			</section>
			{/* 活動支持 */}
			<section className="position-relative module-box">
				<p className="module-title">活動支持</p>
				<div className="module-logos">
					{
						[1, 2, 3].map(item => {
							return (
								<div className="module-logo">
									<img className="module-logo__img" src="/images/alibaba.png" alt="阿里雲教育產品分享" />
								</div>
							)
						})
					}
				</div>
			</section>
		</>
	);
}


Index.EXTEND_INFO = {
	pageName: 'INDEX',
};
