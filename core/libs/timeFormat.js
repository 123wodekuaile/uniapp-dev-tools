// padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
try {
	if (!String.prototype.padStart) {
		// 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
		String.prototype.padStart = function (maxLength, fillString = ' ') {
			if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
				'fillString must be String')
			let str = this
			// 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
			if (str.length >= maxLength) return String(str)

			let fillLength = maxLength - str.length,
				times = Math.ceil(fillLength / fillString.length)
			while (times >>= 1) {
				fillString += fillString
				if (times === 1) {
					fillString += fillString
				}
			}
			return fillString.slice(0, fillLength) + str;
		}
	}
} catch (error) {
	console.log("timeFormat fillString error", error);
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
export function timeFormat(dateTime = null, fmt = 'yyyy-mm-dd hh:MM:ss') {
	try {
		// 如果为null,则格式化当前时间
		if (!dateTime) dateTime = Number(new Date());
		// 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
		if (dateTime.toString().length == 10) dateTime *= 1000;
		let date = new Date(dateTime);
		let ret;
		let opt = {
			"y+": date.getFullYear().toString(), // 年
			"m+": (date.getMonth() + 1).toString(), // 月
			"d+": date.getDate().toString(), // 日
			"h+": date.getHours().toString(), // 时
			"M+": date.getMinutes().toString(), // 分
			"s+": date.getSeconds().toString() // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			};
		};
		return fmt;
	} catch (error) {
		console.log("timeFormat error", error);
		return "unknown error"
	}
}

export function timeFromNow(timestamp) {
	try {
		const now = new Date().getTime();
		let diff = timestamp - now;

		// 确定是过去还是未来
		const suffix = diff > 0 ? "后" : "前";
		diff = Math.abs(diff);

		// 计算时间差异
		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const months = Math.floor(days / 30);
		const years = Math.floor(days / 365);

		// 根据时间差异返回相应的字符串
		if (seconds < 60) {
			return `${seconds}秒${suffix}`;
		} else if (minutes < 60) {
			return `${minutes}分钟${suffix}`;
		} else if (hours < 24) {
			return `${hours}小时${suffix}`;
		} else if (days < 30) {
			return `${days}天${suffix}`;
		} else if (months < 12) {
			return `${months}个月${suffix}`;
		} else {
			return `${years}年${suffix}`;
		}
	} catch (error) {
		console.log("timeFromNow error", error);
	}
}