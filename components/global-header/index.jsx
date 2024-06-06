import Head from "next/head";
import React, { useEffect } from "react";

export default function GlobalHeader() {
	
	return (
		<>
			<Head>
				<meta charset="utf-8" />
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="HKTEC 香港的士交易中心 一站式的士牌照交易平台"
				></meta>
				<meta
					name="keywords"
					content="HKTEC 的士牌照 香港的士交易中心 一站式的士牌照交易平台"
				></meta>
				<meta name="google-site-verification" content="J_plchCoG7sFr3wJjxqbLLcrLYkibJ4wUDCmDsiy_gg" />
				<meta property="fb:pages" content="153063591397681"></meta>
				<meta name="robots" content="index, follow"></meta>
				<link rel="manifest" href="/manifest.json" />
				{/* <title>的士牌價．HKTEC 香港的士交易中心</title> */}
				<script type="text/javascript" src="/js/jquery-2.1.4.min.js"></script>
				<script type="text/javascript" src="/js/responsiveslides.min.js"></script>
				<script type="text/javascript" src="/js/bootstrap.js"></script>
			</Head>
		</>
	);
}
