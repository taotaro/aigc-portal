export const ENV = process.env.NODE_ENV;

// 接口请求域名
export const DOMAIN = ENV === "development" ? "https://hk-tec.org" : "https://hk-tec.org";

export const DEFAULT_PROMO_INFO = [
	{
		boxPosition: "left",
		boxText: "",
		boxTextzhHK: "",
		boxType: "video",
		createTime: "2021-10-25 16:39:22",
		id: 1,
		imageUrl: "",
		jumpUrl: "",
		updateTime: "2021-10-25 16:46:07",
		videoUrl: "https://www.youtube.com/watch?v=i3rxO9Njo4k"
	},
	{
		boxPosition: "right",
		boxText: "Test1",
		boxTextzhHK: "Test1",
		boxType: "text",
		createTime: "2021-10-25 16:39:48",
		id: 2,
		imageUrl: "",
		jumpUrl: "",
		updateTime: "2021-10-25 16:46:02",
		videoUrl: "https://www.youtube.com/watch?v=D3owqp72SJE"
	}
];
