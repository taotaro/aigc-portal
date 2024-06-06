// 解析location.search并转为对象形式
export function parseUrlQuery(urlStr, decode = true) {
	const url = !urlStr ? window.location.href : urlStr;
	const search = url.substring(url.lastIndexOf('?') + 1);
	const reg = /([^?&=]+)=([^?=&]*)/g;
	const hash = {};
	search.replace(reg, (match, $1, $2) => {
		const key = decodeURI($1);
		let value = decode ? decodeURI($2) : $2;
		if (value === 'undefined' || value === 'null') {
			value = '';
		}
		hash[key] = value || '';
		return match;
	});
	return hash;
}

export function getIn(data, array, initial = null) {
	let obj = Object.assign({}, data);
	for (let i = 0; i < array.length; i++) {
		if (typeof obj !== 'object' || obj === null) {
			return initial;
		}
		const prop = array[i];
		obj = obj[prop];
	}
	if (obj === undefined || obj === null) {
		return initial;
	}
	return obj;
}

export function formatPriceValue(value, addZero = true) {
	if (!value || isNaN(value)) {
		return '-';
	}
	const splitValues = `${value}`.split('.');
	// 存在小数点时分隔整数部分
	if (splitValues.length > 1) {
		return `${splitValues[0]}`.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + `${splitValues[1].slice(0, 2)}`;
	}
	return `${value}`.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (addZero ? '.00' : '');
}

export function sub(a, b) {
	let c, d, e;
	try {
		c = a.toString().split(".")[1].length;
	} catch (f) {
		c = 0;
	}
	try {
		d = b.toString().split(".")[1].length;
	} catch (f) {
		d = 0;
	}
	return e = Math.pow(10, Math.max(c, d)), (a * e - b * e) / e;
}

export function mul(arg1, arg2) {
	var r1 = arg1.toString(), // 将传入的数据转化为字符串
		r2 = arg2.toString(),
		m, resultVal, d = arguments[2];
	m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0); // 获取两个数字的小数位数的和
	// 乘积的算法就是去掉小数点做整数相乘然后除去10的所有小数位的次方
	resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);

	return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
}

// 判断是否为移动端浏览器
export function checkBrowser() {
	if (!global.navigator || !global.navigator.userAgent) {
		return { isIos: false, isMobile: false };
	}
	const isIos = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
	const isMobile = isIos || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent);
	return {
		isIos,
		isMobile
	};
}

export function throttle(func, delay) {
	let lastCall = 0;
	return function (...args) {
		const now = new Date().getTime();
		if (now - lastCall < delay) {
			return;
		}
		lastCall = now;
		return func(...args);
	};
}