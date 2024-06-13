import React, { useEffect, useState, useCallback } from "react";
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation'
import { throttle } from "../util/index";

export default function Index() {
	const { t } = useTranslation('common');
	const [fixedBgHeight, setFixedBgHeight] = useState(200);

	const scheduleList1 = [
		{ time: '2:00 – 2:30 pm', desc: '來賓登記' },
		{ time: '2:30 – 2:35 pm', desc: '歡迎辭' },
		{ time: '2:35 – 2:40 pm', desc: '全場合照' },
		{ time: '2:40 – 2:50 pm', desc: '阿里雲教育方案概覽簡介' },
		{
			time: '2:50 – 3:00 pm', desc: (<div className="module-table__col-mul">
				<p>利用「阿里雲學院認證」系統提升教與學成效</p>
				<ul>
					<li>何謂「阿里雲學院認證」</li>
					<li>如何挑選適合自己的課程</li>
					<li>如何運用認證內容快速提升掌握科技的能力</li>
				</ul>
			</div>)
		},
		{ time: '3:00 – 4:00 pm', desc: '阿里雲學院活動證書工作坊 (即場取得 Alibaba Cloud Academy Event Certificate)' },
		{ time: '4:00 – 4:15 pm', desc: '嘉賓對談及互節環節：認證課程對實際教學的幫助' },
		{ time: '4:15 – 4:30 pm', desc: '中場休息及茶點招待' },
		{ time: '4:30 – 4:45 pm', desc: '中學／小學賽制介紹及注意事項' },
		{ time: '4:45 – 5:00 pm', desc: '問答時間' },
	];

	const scheduleList2 = [
		{ time: '2:00 – 2:30 pm', desc: '來賓登記' },
		{ time: '2:30 – 2:35 pm', desc: '歡迎辭' },
		{ time: '2:35 – 2:40 pm', desc: '全場合照' },
		{ time: '2:40 – 2:50 pm', desc: '阿里雲教育方案概覽簡介' },
		{
			time: '2:50 – 3:00 pm', desc: (<div className="module-table__col-mul">
				<p>通義AI平台的教育實踐應用</p>
				<ul>
					<li>介紹「通義」AI平台</li>
					<li>如何引導同學利用AI科技創作，同時培養資訊素養</li>
				</ul>
			</div>)
		},
		{ time: '3:00 – 3:45 pm', desc: '試驗工作坊 ：即場試用「通義萬相」圖像生成功能進行繪圖創作' },
		{ time: '3:45 – 4:00 pm', desc: '嘉賓對談及互節環節：教育應用實例' },
		{ time: '4:00 – 4:15 pm', desc: '中場休息及茶點招待' },
		{ time: '4:15 – 4:30 pm', desc: '中學／小學賽制介紹及注意事項' },
		{ time: '4:30 – 5:00 pm', desc: '問答時間' },
	];

	const LogoList = [
		{ name: 'Alibaba', logo: '/images/ali.jpeg' },
		{ name: 'GamingNoodleSoup', logo: '/images/gns.png' },
		{ name: 'Materia Logic', logo: '/images/ml.png' },
		{ name: 'HKACE', logo: '/images/hkace.png' },
		{ name: 'Aitle', logo: '/images/aitle.png' },
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

	const tableColListRender1 = scheduleList1.map((item, index) => {
		return (
			<div className="module-table__row" key={index}>
				<div className="module-table__col">{item.time}</div>
				<div className="module-table__line"></div>
				<div className="module-table__col">{item.desc}</div>
			</div>
		);
	});

	const tableColListRender2 = scheduleList2.map((item, index) => {
		return (
			<div className="module-table__row" key={index}>
				<div className="module-table__col">{item.time}</div>
				<div className="module-table__line"></div>
				<div className="module-table__col">{item.desc}</div>
			</div>
		);
	});

	return (
		<>
			<NextSeo title={"阿里雲AI未來教室"} description={'雲遊通義 – 阿里雲香港10週年校際生成式AI比賽發佈會'} />
			<img id="fixed-bg" className="position-fixed" onLoad={onWindowResize} src="/images/index-bg.jpeg" alt="" style={{ width: '100%', height: 'auto' }} />
			{/* slogan */}
			<section className="title-section position-relative" style={{ height: `${fixedBgHeight}px` }} id="indexModule">
				<h1 className="title">阿里雲AI未來教室</h1>
				<h3 className="subtitle">
					<p>雲遊通義 – 阿里雲香港10週年</p>
					<p>校際生成式AI比賽發佈會</p>
				</h3>
			</section>
			<div className="module-container">
				{/* 介绍 */}
				<section className="position-relative intro-box">
					<div className="intro">
						<img className="intro-tag intro-tag-left" src="/images/tag1.png" alt="tag" />
						<p className="text-left">
							阿里雲有幸一直為香港各行各業的數碼轉型盡一分力，積累了豐富的行業經驗。為慶祝在港營運10周年，我們特別舉辦「阿里雲AI未來教室」及「雲遊通義 – 阿里雲香港10週年校際生成式AI比賽」。人工智能作為新世代的科技熱點及未來趨勢之一，與雲端科技息息相關，此次活動旨在通過與學界合作，提升教師與學生在雲端及AI領域的學習成果和效率，促進持續創新，共同培育未來科技人才。
						</p>
						<img className="intro-tag intro-tag-right" src="/images/tag1.png" alt="tag" />
					</div>
				</section>
				{/*  */}
				<section className="position-relative module-box" id="articleModule">
					<p className="module-title">活動資訊</p>
					<div className="module-content">
						<div className="module-content__left">
							<div className="module-content__title">活動資訊</div>
							<div className="module-content__desc">
								<p>📅 日期 - 2024年7月10日（星期三）及 7月11日（星期四）</p>
								<p>🕓 時間 - 下午3:30 - 5:00（2:30 開始登記）</p>
								<p>🌏 地點 - 阿里巴巴辦公室23樓研討室（銅鑼灣勿地臣街1號時代廣場1座23樓）</p>
								<p>🤖 對象 - 中小學資訊科技學科教師 及 對AI課題有興趣的教職員</p>
								<div className="mt-2">*出席活動並合資格的教育工作者可獲頒「阿里雲學院活動證書」</div>
							</div>
						</div>
					</div>
				</section>
				{/* 活動內容 */}
				<section className="position-relative module-box" id="articleModule">
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
							<div className="module-content__desc">講解「雲遊通義 – 阿里雲香港10週年校際生成式AI比賽」目的、參賽要求和評分標準。此次活動旨在通過與學界合作，推動全港中小學生利用AI人工智能，激發創意，並將獨特的意念付諸實行。參賽同學需要運用阿里巴巴旗下AI應用平台「通義千問」、「通義萬相」和「通義星塵」，根據特定主題創作。</div>
						</div>
						<div className="module-content__right">
							<img className="module-content__img" src="/images/activity4.png" alt="阿里雲教育產品分享" />
						</div>
					</div>
				</section>
				{/* 精彩內容包括 */}
				<section className="position-relative module-box" id="classRoomModule">
					<p className="module-title">精彩內容包括</p>
					<div className="module-table">
						<div className="module-table__row module-table__header">
							<div className="module-table__col">7月10日限定</div>
						</div>
						<div className="module-table-texts">
							<p>未來教室 1：阿里雲AI——阿里雲學院 & 通義 AI教室</p>
							<p>阿里雲學院 及 通義AI平台的教育實踐應用</p>
							<ul>
								<li>介紹「阿里雲學院」- 如何運用認證內容快速提升掌握科技的能力</li>
								<li>介紹「通義」AI平台 及「阿里雲學院」上的 AI 相關證書內容</li>
								<li>試驗工作坊 ：即場探索「阿里雲學院」及「通義」AI平台</li>
								<li>更多教育應用實例</li>
								<li>嘉賓對談及互節環節</li>
								<li>*出席活動並合資格的教育工作者可獲頒「阿里雲學院活動證書」</li>
							</ul>
						</div>
					</div>
					<div className="module-table">
						<div className="module-table__row module-table__header">
							<div className="module-table__col">7月11日限定</div>
						</div>
						<div className="module-table-texts">
							<p>未來教室 2：阿里雲AI——通義AI平台教室</p>
							<p>通義AI平台的教育實踐應用</p>
							<ul>
								<li>介紹「通義」AI平台</li>
								<li>如何引導同學利用AI科技創作，同時培養資訊素養</li>
								<li>試驗工作坊 ：即場試用「通義萬相」圖像生成功能進行繪圖創作</li>
								<li>更多教育應用實例</li>
								<li>嘉賓對談及互動環節</li>
								<li>*出席活動並合資格的教育工作者可獲頒「阿里雲學院活動證書」</li>
							</ul>
						</div>
					</div>
				</section>
				{/* 未來教室日程 */}
				{/* <section className="position-relative module-box" id="classRoomModule">
					<p className="module-title">未來教室日程</p>
					<div className="module-table">
						<div className="module-table__row module-table__header">
							<div className="module-table__col">時間 July 10 2024</div>
							<div className="module-table__col">內容</div>
						</div>
						{tableColListRender1}
					</div>
					<div className="module-table">
						<div className="module-table__row module-table__header">
							<div className="module-table__col">時間 July 12 2024</div>
							<div className="module-table__col">內容</div>
						</div>
						{tableColListRender2}
					</div>
				</section> */}
				<section className="position-relative module-box">
					<img className="module-poster" src="/images/poster.jpeg" alt="poster" />
				</section>
				<section className="position-relative module-box">
					<div className="module-button">
						<a href="https://survey.aliyun.com/apps/zhiliao/08tKHXN_I" target="__blank">立即註冊</a>
					</div>
				</section>
				{/* 活動支持 */}
				<section className="position-relative module-box">
					<p className="module-title">活動支持</p>
					<div className="module-logos">
						{
							LogoList.filter(item => item.name === 'Alibaba').map(item => {
								return (
									<div className={`module-logo module-logo-${item.name}`} key={item.name}>
										<img className="module-logo__img" src={item.logo} alt={item.name} />
									</div>
								)
							})
						}
					</div>
					<div className="module-logos">
						{
							LogoList.filter(item => item.name !== 'Alibaba').map(item => {
								return (
									<div className={`module-logo module-logo-${item.name}`} key={item.name}>
										<img className="module-logo__img" src={item.logo} alt={item.name} />
									</div>
								)
							})
						}
					</div>
				</section>
			</div>
		</>
	);
}


Index.EXTEND_INFO = {
	pageName: 'INDEX',
};
