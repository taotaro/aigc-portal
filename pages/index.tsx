import React, { useEffect, useState, useCallback } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { throttle } from "../util/index";

export default function Index() {
  const { t } = useTranslation("common");
  const [fixedBgHeight, setFixedBgHeight] = useState(200);

  const scheduleList1 = [
    { time: "2:00 – 2:30 pm", desc: "來賓登記" },
    { time: "2:30 – 2:35 pm", desc: "歡迎辭" },
    { time: "2:35 – 2:40 pm", desc: "全場合照" },
    { time: "2:40 – 2:50 pm", desc: "阿里雲教育方案概覽簡介" },
    {
      time: "2:50 – 3:00 pm",
      desc: (
        <div className="module-table__col-mul">
          <p>利用「阿里雲學院認證」系統提升教與學成效</p>
          <ul>
            <li>何謂「阿里雲學院認證」</li>
            <li>如何挑選適合自己的課程</li>
            <li>如何運用認證內容快速提升掌握科技的能力</li>
          </ul>
        </div>
      ),
    },
    {
      time: "3:00 – 4:00 pm",
      desc: "阿里雲學院活動證書工作坊 (即場取得 Alibaba Cloud Academy Event Certificate)",
    },
    {
      time: "4:00 – 4:15 pm",
      desc: "嘉賓對談及互節環節：認證課程對實際教學的幫助",
    },
    { time: "4:15 – 4:30 pm", desc: "中場休息及茶點招待" },
    { time: "4:30 – 4:45 pm", desc: "中學／小學賽制介紹及注意事項" },
    { time: "4:45 – 5:00 pm", desc: "問答時間" },
  ];

  const scheduleList2 = [
    { time: "2:00 – 2:30 pm", desc: "來賓登記" },
    { time: "2:30 – 2:35 pm", desc: "歡迎辭" },
    { time: "2:35 – 2:40 pm", desc: "全場合照" },
    { time: "2:40 – 2:50 pm", desc: "阿里雲教育方案概覽簡介" },
    {
      time: "2:50 – 3:00 pm",
      desc: (
        <div className="module-table__col-mul">
          <p>通義AI平台的教育實踐應用</p>
          <ul>
            <li>介紹「通義」AI平台</li>
            <li>如何引導同學利用AI科技創作，同時培養資訊素養</li>
          </ul>
        </div>
      ),
    },
    {
      time: "3:00 – 3:45 pm",
      desc: "試驗工作坊 ：即場試用「通義萬相」圖像生成功能進行繪圖創作",
    },
    { time: "3:45 – 4:00 pm", desc: "嘉賓對談及互節環節：教育應用實例" },
    { time: "4:00 – 4:15 pm", desc: "中場休息及茶點招待" },
    { time: "4:15 – 4:30 pm", desc: "中學／小學賽制介紹及注意事項" },
    { time: "4:30 – 5:00 pm", desc: "問答時間" },
  ];

  const LogoList = [
    { name: "Alibaba", logo: "/images/ali.jpeg" },
    { name: "GamingNoodleSoup", logo: "/images/gns.png" },
    { name: "Materia Logic", logo: "/images/ml.png" },
    { name: "HKACE", logo: "/images/hkace.png" },
    { name: "Aitle", logo: "/images/aitle.png" },
    { name: "SteelSeries", logo: "/images/steelseries.png" },
  ];

  function onWindowResize() {
    const $fixedBg = document.getElementById("fixed-bg");
    const height = $fixedBg?.getBoundingClientRect()?.height || 200;
    setFixedBgHeight(height);
  }

  const throttledResize = throttle(onWindowResize, 200);

  useEffect(() => {
    window.scrollTo(0, 0);
    onWindowResize();
    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
    };
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
      <NextSeo
        title={"阿里雲AI未來教室"}
        description={"雲遊通義 – 阿里雲香港10週年校際生成式AI比賽發佈會"}
      />
      <img
        id="fixed-bg"
        className="position-fixed"
        onLoad={onWindowResize}
        src="/images/index-bg.jpeg"
        alt=""
        style={{ width: "100%", height: "auto" }}
      />
      {/* slogan */}
      <section
        className="title-section position-relative"
        style={{ height: `${fixedBgHeight}px`, padding: "24px" }}
        id="indexModule"
      >
        <h1 className="title">
          雲遊通義 – 阿里雲香港10週年校際生成式AI比賽簡介
        </h1>
        {/* <h3 className="subtitle">
          <p>雲遊通義 – 阿里雲香港10週年</p>
          <p>校際生成式AI比賽發佈會</p>
        </h3> */}
      </section>
      <div className="module-container">
        {/* 介绍 */}
        <section
          className="position-relative module-box"
          style={{
            paddingTop: "80px",
            marginBottom: "0px",
            paddingBottom: "0px",
          }}
        >
          <p className="module-title">比賽簡介</p>
        </section>
        <section
          // className="position-relative intro-box"
          style={{
            paddingTop: "80px",
            paddingBottom: "80px",
            marginTop: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center", // Ensure the text inside the section is centered
          }}
        >
          {/* <p className="module-title">比賽簡介</p> */}
          <div className="intro" style={{ margin: "24px" }}>
            <img
              className="intro-tag intro-tag-left"
              src="/images/tag1.png"
              alt="tag"
            />
            <div
              style={{ padding: "24px", fontSize: "24px", fontWeight: "bold" }}
            >
              <div className="text-left">
                阿里雲有幸一直為香港各行各業的數碼轉型盡一分力，積累了豐富的行業經驗。人工智能作為新世代的科技熱點及未來趨勢之一，與雲端科技息息相關，為慶祝在港營運10周年，我們特別舉辦「雲遊通義
                –
                阿里雲香港10週年校際生成式AI比賽」，透個此次活動旨在通過與學界合作，提升教師與學生在雲端及AI領域的學習成果和效率，促進持續創新，共同培育未來科技人才。
              </div>
            </div>

            <img
              className="intro-tag intro-tag-right"
              src="/images/tag1.png"
              alt="tag"
            />
          </div>
        </section>
        {/* game goal */}
        <section className="position-relative module-box" id="gameInfoModule">
          <p className="module-title">比賽目標</p>
          <div className="module-content" style={{ padding: "36px" }}>
            <div className="module-content__left">
              {/* <div className="module-content__title">活動資訊</div> */}
              <div className="module-content__desc">
                <ul style={{ paddingLeft: "20px", textIndent: "-2px" }}>
                  <li>
                    推動全港中小及特殊需要學生利用AI人工智能，激發創意，並將獨特的意念付諸實行。
                  </li>
                  <li>
                    介紹阿里雲AI技術應用於教與學環境，以強化學生的創造能力和解難思維。
                  </li>
                  <li>
                    {" "}
                    邀請AI教育領域的專家、學者和實踐者分享經驗和見解；探討AI教育的趨勢、挑戰和未來發展。
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* things to note */}
        <section className="position-relative module-box" id="gameInfoModule">
          <p className="module-title">注意事項</p>
          <div className="module-content" style={{ padding: "36px" }}>
            <div className="module-content__left">
              {/* <div className="module-content__title">阿里雲教育產品分享</div> */}
              <div className="module-content__desc">
                <ul style={{ paddingLeft: "20px", textIndent: "-2px" }}>
                  <li>
                    參賽組別分為小學組、中學組及展能組（為特殊學校學生開設）。
                  </li>
                  <li>參賽者由學校老師代表提名，並以隊際形式報名。</li>
                  <li>參賽者必須為2024至2025學年仍然就讀該校的全日制學生。</li>
                  <li>每隊隊伍由 2 – 4 人組成，每間學校不限報名隊伍數量。</li>
                  <li>
                    參賽者需要使用阿里雲旗下AI應用平台「通義千問」及「通義萬相」進行比賽。
                  </li>
                  <li>工作坊及賽事作品內容均以中文進行。</li>
                  <li>參賽費用全免。</li>
                </ul>
              </div>
            </div>
            {/* <div className="module-content__right">
              <img
                className="module-content__img"
                src="/images/activity1.png"
                alt="阿里雲教育產品分享"
              />
            </div> */}
          </div>
        </section>
        {/* certificates and prizes */}
        <section className="position-relative module-box" id="gameInfoModule">
          <p className="module-title">證書及獎品</p>
          <p
            style={{
              padding: "36px 36px 0px 36px",
              fontWeight: "bold",
              fontSize: "28px",
            }}
          >
            隊伍獎項
          </p>
          <div className="module-content" style={{ padding: "36px" }}>
            <div className="module-table">
              {" "}
              <div
                className="module-table__row module-table__header"
                style={{ border: "1px solid black" }}
              >
                <div className="module-table__col">獎項</div>
                <div className="module-table__col">獎品</div>
              </div>
              <div className="module-table__row ">
                <div className="module-table__col">冠軍（一名）</div>
                <div className="module-table__col">
                  贊助參觀阿里巴巴杭州總部
                  港幣XXXX元獎金、SteelSeries電競產品、阿里雲代金券XXX元
                </div>
              </div>
              <div className="module-table__row ">
                <div className="module-table__col">亞軍（一名）</div>
                <div className="module-table__col">
                  港幣XXXX元獎金、SteelSeries電競產品、阿里雲代金券XXX元
                </div>
              </div>
              <div className="module-table__row ">
                <div className="module-table__col">季軍（一名）</div>
                <div className="module-table__col">
                  港幣XXXX元獎金、SteelSeries電競產品、阿里雲代金券XXX元
                </div>
              </div>
            </div>
            <div className="module-content__left">
              {/* <div className="module-content__title">活動資訊</div> */}
              <div className="module-content__desc">
                <p>
                  所有合資格的參賽者均可獲得由阿里雲頒發的「阿里雲生成式AI校際比賽」
                  參賽證書，優勝得獎作品將有機會在阿里雲香港峰會展示。
                </p>
              </div>
            </div>
          </div>
          <p
            style={{
              padding: "36px 36px 0px 36px",
              fontWeight: "bold",
              fontSize: "28px",
            }}
          >
            學校獎項
          </p>
          <div className="module-content" style={{ padding: "36px" }}>
            {/* <div className="module-content__title">活動資訊</div> */}
            <div
              className="module-content__desc"
              style={{ marginTop: "-10px" }}
            >
              派出最多同學參賽的學校將獲頒最踴躍參與獎，將得到阿里雲代金券XXX元。
            </div>
          </div>
        </section>
        {/* 精彩內容包括 */}
        <section
          className="position-relative module-box"
          id="requirementsModule"
        >
          <p className="module-title">比賽要求</p>
          <div className="module-content" style={{ padding: "36px" }}>
            <div className="module-table">
              <div
                className="module-table__row "
                style={{ borderTop: " 1px solid #242424" }}
              >
                <div className="module-table__col">小學組</div>
                <div className="module-table__col">創作AI故事圖書</div>
                <div className="module-table__col">
                  參賽者需要學習使用「通義千問」大語言模型和「通義萬相」文生圖模型，創作圍繞大會指定主題的故事圖書，並利用AI技術來豐富故事情節。
                </div>
              </div>
              <div className="module-table__row ">
                <div className="module-table__col">中學組</div>
                <div className="module-table__col">創作AI小說圖集</div>
                <div className="module-table__col">
                  參賽者需要學習使用「通義千問」大語言模型和「通義萬相」文生圖模型，創作圍繞大會指定主題的小說圖集，並利用AI技術來豐富故事情節。
                </div>
              </div>
              <div className="module-table__row ">
                <div className="module-table__col">展能組</div>
                <div className="module-table__col">創作AI圖像作品</div>
                <div className="module-table__col">
                  歡迎具特殊需要的同學參與。參賽者需要使用「通義萬相」文生圖模型，依照要求創作圖像作品。
                </div>
              </div>
            </div>
          </div>
          <p
            style={{
              padding: "36px 36px 0px 36px",
              fontWeight: "bold",
              fontSize: "28px",
            }}
          >
            小學組要求
          </p>
          <div className="module-content" style={{ padding: "36px" }}>
            {/* <div className= */}
            <div
              className="module-content__desc"
              style={{ marginTop: "-10px" }}
            >
              創作AI 故事圖書：
              <ul style={{ paddingLeft: "20px", textIndent: "-2px" }}>
                <li>2-4人一組參賽，組員須為同校同學。</li>
                <li>參賽者需要學習使用：</li>
                <ul>
                  1.
                  <a
                    href="https://tongyi.aliyun.com/qianwen"
                    target="_blank"
                    style={{ color: "#ff6a00" }}
                  >
                    「通義千問」大語言模型
                  </a>{" "}
                </ul>
                <ul>
                  2.
                  <a
                    href="https://tongyi.aliyun.com/wanxiang"
                    target="_blank"
                    style={{ color: "#ff6a00" }}
                  >
                    「通義萬相」文生圖模型
                  </a>{" "}
                </ul>
                <li>
                  所有參賽者必須參加最少一場由阿里雲香港舉辦的實體工作坊；缺席者將會被取消參賽資格。
                </li>
                <li>參賽者須根據大會指定主題創作一本故事圖書。</li>
                <li>參賽者可自由透過「通義千問」生成或創作內容。</li>
                <li>所有參賽圖像必須以「通義萬相」 生成。</li>
                <li>
                  參賽作品檔案須以A5大小的PDF檔案格式繳交，其中包含封面(1頁)、內容(上限為30頁)、封底(1頁)。
                </li>
                <li>如有需要，作品可附有不多於1,000字的中文內文。</li>
                <li>
                  故事需展現參賽者的想像力，並包括簡單的開端、發展和結局。
                </li>
                <li>
                  參賽隊伍必須同時提交以「通義」工具生成圖像及文字內容的相關模型提示
                  (prompt)詳情。
                </li>
                <li>
                  大會將根據參賽作品的AI模型的技術使用、創意和原創性、內容與主題的相關性、呈現方式和格式來進行評分。
                </li>
              </ul>
            </div>
          </div>
          <p
            style={{
              padding: "36px 36px 0px 36px",
              fontWeight: "bold",
              fontSize: "28px",
            }}
          >
            中學組要求
          </p>
          <div className="module-content" style={{ padding: "36px" }}>
            {/* <div className="module-content__title">活動資訊</div> */}
            <div
              className="module-content__desc"
              style={{ marginTop: "-10px" }}
            >
              創作AI小說圖集：
              <ul style={{ paddingLeft: "20px", textIndent: "-2px" }}>
                <li>2-4人一組參賽，組員須為同校同學。</li>
                <li>參賽者需要學習使用：</li>
                <ul>
                  1.
                  <a
                    href="https://tongyi.aliyun.com/qianwen"
                    target="_blank"
                    style={{ color: "#ff6a00" }}
                  >
                    「通義千問」大語言模型
                  </a>{" "}
                </ul>
                <ul>
                  2.
                  <a
                    href="https://tongyi.aliyun.com/wanxiang"
                    target="_blank"
                    style={{ color: "#ff6a00" }}
                  >
                    「通義萬相」文生圖模型
                  </a>{" "}
                </ul>
                <li>
                  所有參賽者必須參加最少一場由阿里雲香港舉辦的實體工作坊；缺席者將會被取消參賽資格。
                </li>
                <li>參賽者須根據大會指定主題創作一本小說圖集。</li>
                <li>
                  參賽者必須使用「通義千問」
                  的「虛擬人物」功能創作人物為故事主角，及後可自由透過「通義千問」生成或創作內容。
                </li>
                <li>
                  參賽作品須至少附有1張圖像；作品所有圖像必須以「通義萬相」
                  生成。
                </li>
                <li>
                  參賽作品檔案須以A5大小的PDF檔案格式繳交，其中包含封面(1頁)、內容(上限100頁)、封底(1頁)。
                </li>
                <li>
                  作品最多分為5個章節，全書不少於3,000字，不多於5,000字中文內文。
                </li>
                <li>
                  故事需展現參賽者的想像力，並包括簡單的開端、發展和結局。
                </li>
                <li>
                  參賽隊伍必須同時提交以「通義」工具生成圖像及文字內容的相關模型提示
                  (prompt)詳情。
                </li>
                <li>
                  大會將根據參賽作品的AI模型的技術使用、創意和原創性、內容與主題的相關性、呈現方式和格式來進行評分。
                </li>
              </ul>
            </div>
          </div>
          <p
            style={{
              padding: "36px 36px 0px 36px",
              fontWeight: "bold",
              fontSize: "28px",
            }}
          >
            展能組要求
          </p>
          <div className="module-content" style={{ padding: "36px" }}>
            {/* <div className="module-content__title">活動資訊</div> */}
            <div
              className="module-content__desc"
              style={{ marginTop: "-10px" }}
            >
              創作AI小說圖集：
              <ul style={{ paddingLeft: "20px", textIndent: "-2px" }}>
                <li>2-4人一組參賽，組員須為同校同學。</li>
                <li>參賽者需要學習使用：</li>
                <ul>
                  1.
                  <a
                    href="https://tongyi.aliyun.com/qianwen"
                    target="_blank"
                    style={{ color: "#ff6a00" }}
                  >
                    「通義千問」大語言模型
                  </a>{" "}
                </ul>
                <ul>
                  2.
                  <a
                    href="https://tongyi.aliyun.com/wanxiang"
                    target="_blank"
                    style={{ color: "#ff6a00" }}
                  >
                    「通義萬相」文生圖模型
                  </a>{" "}
                </ul>
                <li>
                  所有參賽者必須參加最少一場由阿里雲香港舉辦的實體工作坊；缺席者將會被取消參賽資格。
                </li>
                <li>參賽者須以「通義萬相」生成一幅圖像作品。</li>
                <li>參賽者可自由選擇主題，以鼓勵表達個人興趣、情感及需要。</li>
                <li>所有參賽圖像必須以「通義萬相」 生成。</li>
                <li>參賽作品檔案須以A3大小的PDF格式繳交。</li>
                <li>
                  如有需要，作品可附有不多於200字的中文介紹，並使用「通義千問」幫助內容創作。
                </li>
                <li>
                  參賽隊伍必須同時提交以「通義」工具生成圖像及文字內容的相關模型提示
                  (prompt)詳情。
                </li>
                <li>
                  大會將根據參賽作品的AI模型的技術使用、創意和原創性、內容與主題的相關性、呈現方式和格式來進行評分。
                </li>
                {/* <li>
                大會將根據參賽作品的AI模型的技術使用、創意和原創性、內容與主題的相關性、呈現方式和格式來進行評分。
              </li> */}
              </ul>
            </div>
          </div>
          <p
            style={{
              padding: "36px 36px 0px 36px",
              fontWeight: "bold",
              fontSize: "28px",
            }}
          >
            評分標準
          </p>
          <div className="module-content" style={{ padding: "36px" }}>
            <div className="module-table">
              {" "}
              <div
                className="module-table__row module-table__header"
                style={{ border: "1px solid black" }}
              >
                <div className="module-table__col" style={{ width: "70%" }}>
                  評分範疇
                </div>
                <div className="module-table__col" style={{ width: "70%" }}>
                  佔分比重
                </div>
              </div>
              <div className="module-table__row ">
                <div className="module-table__col" style={{ width: "70%" }}>
                  <div
                    className="module-content__desc"
                    style={{ fontSize: "18px", marginTop: "0px" }}
                  >
                    1. AI模型的技術使用：
                    <li>
                      學生是否有效地運用「通義千問」大語言模型和「通義萬相」文生圖模型？
                    </li>
                    AI生成的元素是否良好地融入了創作內容？
                  </div>
                </div>
                <div className="module-table__col" style={{ width: "70%" }}>
                  35%
                </div>
              </div>
              <div className="module-table__row ">
                <div className="module-table__col" style={{ width: "70%" }}>
                  <div
                    className="module-content__desc"
                    style={{ fontSize: "18px", marginTop: "0px" }}
                  >
                    2. 創意和原創性：{" "}
                    <li>參賽同學創作的AI故事書是否獨特和具想像力？</li>
                    <li>作品是否表現了新穎和具創意的想法？</li>
                  </div>
                </div>
                <div className="module-table__col" style={{ width: "70%" }}>
                  25%
                </div>
              </div>
              <div className="module-table__row ">
                <div className="module-table__col" style={{ width: "70%" }}>
                  <div
                    className="module-content__desc"
                    style={{ fontSize: "18px", marginTop: "0px" }}
                  >
                    3. 內容與主題的相關性： <li>創作內容是否緊扣題旨？</li>
                    <li>內容是否良好地呈現主題？</li>
                  </div>
                </div>
                <div className="module-table__col" style={{ width: "70%" }}>
                  20%
                </div>
              </div>
              <div className="module-table__row ">
                <div className="module-table__col" style={{ width: "70%" }}>
                  <div
                    className="module-content__desc"
                    style={{ fontSize: "18px", marginTop: "0px" }}
                  >
                    4. 呈現方式和格式：{" "}
                    <li>故事是否脈絡清晰？敘事是否流暢？</li>
                    <li>視覺上是否吸引人？圖像是否配置得當？</li>
                  </div>
                </div>
                <div className="module-table__col" style={{ width: "30%" }}>
                  20%
                </div>
              </div>
            </div>
            <div className="module-content__left">
              {/* <div className="module-content__title">活動資訊</div> */}
              <div className="module-content__desc">
                <p>注：參賽作品須為原創，禁止抄襲。違者有可能被取消資格。</p>
              </div>
            </div>
          </div>
          <p
            style={{
              padding: "36px 36px 0px 36px",
              fontWeight: "bold",
              fontSize: "28px",
            }}
          >
            比賽日程
          </p>
          <div className="module-content" style={{ padding: "36px" }}>
            <div className="module-table">
              {" "}
              <div
                className="module-table__row module-table__header"
                style={{ border: "1px solid black" }}
              >
                <div className="module-table__col">日期</div>
                <div className="module-table__col">內容</div>
              </div>
              <div className="module-table__row ">
                <div className="module-table__col">2024年8月19日（星期一）</div>
                <div className="module-table__col">開始報名</div>
              </div>
              <div className="module-table__row ">
                <div className="module-table__col">2024年9月20日（星期五）</div>
                <div className="module-table__col">截止報名</div>
              </div>
              <div className="module-table__row ">
                <div className="module-table__col">
                  2024年10月25日（星期五）或之前{" "}
                </div>
                <div className="module-table__col">遞交作品</div>
              </div>
              <div className="module-table__row ">
                <div className="module-table__col">
                  2024年11月20日（星期三）{" "}
                </div>
                <div className="module-table__col">比賽結果公佈</div>
              </div>
            </div>
          </div>
        </section>
        {/* schedule workshop */}
        <section className="position-relative module-box" id="scheduleModule">
          <p className="module-title">比賽工作坊</p>
          <div className="module-content" style={{ padding: "36px" }}>
            <div className="module-content__left">
              {/* <div className="module-content__title">活動資訊</div> */}
              <div className="module-content__desc">
                <div>日期：2024年10月3日（星期四） </div>
                <div>時間：待定</div>
                <div>地點：待定</div>
              </div>
            </div>
          </div>
        </section>
        {/* schedule workshop */}
        <section className="position-relative module-box" id="scheduleModule">
          <p className="module-title">頒獎禮</p>
          <div className="module-content" style={{ padding: "36px" }}>
            <div className="module-content__left">
              {/* <div className="module-content__title">活動資訊</div> */}
              <div className="module-content__desc">
                <div>日期：2024年11月27日（星期三）</div>
                <div>時間：待定</div>
                <div>地點：待定</div>
                <div>*部分安排可能會更改，以不作另行通知</div>
              </div>
            </div>
          </div>
        </section>

        <section className="position-relative module-box">
          <div className="module-button">
            <a href="/registration" target="__blank">
              立即註冊
            </a>
          </div>
        </section>
        <section className="position-relative module-box" id="gameInfoModule">
          <p className="module-title">活動查詢及聯絡</p>
          <div className="module-content" style={{ padding: "36px" }}>
            <div className="module-content__left">
              {/* <div className="module-content__title">活動資訊</div> */}
              <div
                className="module-content__desc"
                style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
              >
                如有任何活動問題，歡迎聯絡{" "}
                <a
                  href="mailto:edu@gamenoodlesoup.com"
                  // target="_blank"
                  style={{ color: "#ff6a00", wordBreak: "break-all" }}
                >
                  Gamenoodlesoup
                </a>
                (edu@gamenoodlesoup.com / 30011280)
              </div>
            </div>
            <div className="module-content__desc">
              <div style={{ marginBottom: "24px" }}>
                參賽者必須同意在參與活動時遵守活動條款及細則，
                <a
                  href="https://aigc-portal-dev.materia-logic.com/terms"
                  target="_blank"
                  style={{ color: "#ff6a00" }}
                >
                  詳情請按此查閱
                </a>
                。
              </div>
              <div>
                是次活動所收集的資料只用作活動登記、通訊及相關用途，並只限Alibaba
                Cloud及其授權之服務承辦商存取。登記者有權要求查閱、更正或刪除其個人資料。如有查詢，與我們聯絡。有關詳情亦可瀏覽{" "}
                <a
                  href="https://www.alibabacloud.com/help/tc/legal/latest/alibaba-cloud-international-website-privacy-policy"
                  target="_blank"
                  style={{ color: "#ff6a00" }}
                >
                  Alibaba Cloud的私隱政策
                </a>{" "}
                。
              </div>
            </div>
          </div>
        </section>
        {/* 活動支持 */}
        <section className="position-relative module-box">
          <p className="module-title">活動主辦</p>
          <div className="module-logos">
            {LogoList.filter((item) => item.name === "Alibaba").map((item) => {
              return (
                <div
                  className={`module-logo module-logo-${item.name}`}
                  key={item.name}
                >
                  <img
                    className="module-logo__img"
                    src={item.logo}
                    alt={item.name}
                  />
                </div>
              );
            })}
          </div>
          <p className="module-title" style={{ paddingTop: "24px" }}>
            支持單位
          </p>
          <div className="module-logos">
            {LogoList.filter((item) => item.name !== "Alibaba").map((item) => {
              return (
                <div
                  className={`module-logo module-logo-${item.name}`}
                  key={item.name}
                >
                  <img
                    className="module-logo__img"
                    src={item.logo}
                    alt={item.name}
                  />
                </div>
              );
            })}
          </div>
        </section>
        {/* footer */}
      </div>
    </>
  );
}

Index.EXTEND_INFO = {
  pageName: "INDEX",
};
