exports.topicTime = function(timeInMs) {
	var cur = new Date();
	var flag = false;
	var dstr;
	var difInSecond = (cur.getTime() - timeInMs) / 1000;
	if (difInSecond < 60) {
		if (difInSecond <= 0) difInSecond = 1;

		dstr = Math.ceil(difInSecond) + "秒前";
		flag = true;
	} else if (difInSecond < 1800) {
		var aa = Math.ceil((difInSecond / 60))

		dstr = aa + "分钟前";
		flag = true;
	} else {
		var ctime = new Date();
		ctime.setTime(timeInMs);
		if (cur.getFullYear() == ctime.getFullYear() && cur.getMonth() == ctime.getMonth() && cur.getDate() == ctime.getDate()) {
			dstr = ctime.toString("HH:mm");
		} else {
			dstr = ctime.toString("MM月dd日");
		}
	}
	return dstr;
}

Date.prototype._toString = Date.prototype.toString;
Date.prototype.toString = function(c) {
	var a = this;
	var b = function b(d) {
		return (d.toString().length == 1) ? "0" + d : d
	};
	return c ? c.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g, function(d) {
		switch (d) {
			case "hh":
				return b(a.getHours() < 13 ? a.getHours() : (a.getHours() - 12));
			case "h":
				return a.getHours() < 13 ? a.getHours() : (a.getHours() - 12);
			case "HH":
				return b(a.getHours());
			case "H":
				return a.getHours();
			case "mm":
				return b(a.getMinutes());
			case "m":
				return a.getMinutes();
			case "ss":
				return b(a.getSeconds());
			case "s":
				return a.getSeconds();
			case "yyyy":
				return a.getFullYear();
			case "yy":
				return a.getFullYear().toString().substring(2, 4);
			case "dddd":
				return a.getDayName();
			case "ddd":
				return a.getDayName(true);
			case "dd":
				return b(a.getDate());
			case "d":
				return a.getDate().toString();
			case "MMMM":
				return a.getMonthName();
			case "MMM":
				return a.getMonthName(true);
			case "MM":
				return b((a.getMonth() + 1));
			case "M":
				return a.getMonth() + 1;
			case "t":
				return a.getHours() < 12 ? Date.CultureInfo.amDesignator.substring(0, 1) : Date.CultureInfo.pmDesignator.substring(0, 1);
			case "tt":
				return a.getHours() < 12 ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
			case "zzz":
			case "zz":
			case "z":
				return ""
		}
	}) : this._toString()
}