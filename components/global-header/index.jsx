import Head from "next/head";
import React, { useEffect } from "react";

export default function GlobalHeader() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta
          name="description"
          content="阿里雲香港未來教室 暨「雲馳通義 ‧ 洞見萬相千問」生成式 AI 校際比賽發佈會"
        ></meta>
        <meta
          name="keywords"
          content="阿里雲香港未來教室 暨「雲馳通義 ‧ 洞見萬相千問」生成式 AI 校際比賽發佈會"
        ></meta>
        <meta name="robots" content="index, follow"></meta>
        {/* <link rel="manifest" href="/manifest.json" /> */}
        {/* <title>雲馳通義 ‧ 洞見萬相千問</title> */}
        <script type="text/javascript" src="/js/jquery-2.1.4.min.js"></script>
        <script type="text/javascript" src="/js/aliplayercomponents-1.1.0.min.js"></script>
        <script
          type="text/javascript"
          src="/js/responsiveslides.min.js"
        ></script>
        <script type="text/javascript" src="/js/bootstrap.js"></script>
      </Head>
    </>
  );
}
