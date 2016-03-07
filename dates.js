var MODE = {
	HOURLY: 'yh',
	DAILY: 'yd',
	WEEKLY: 'yw',
	MONTHLY: 'ym'
};

module.exports = {
	fillEmptyDates: fillEmptyDates,
	fillMode: MODE
};

var Helper = function(mode) {

	var modeCoefficient = {};

	modeCoefficient[MODE.HOURLY] = 1;
	modeCoefficient[MODE.DAILY] = 24;
	modeCoefficient[MODE.WEEKLY] = 7 * modeCoefficient[MODE.DAILY];

	var dateCoeff = 1000 * 60 * 60 * modeCoefficient[mode];

	function countGap(date1, date2) {
		return Math.round((date1.getTime() - date2.getTime()) / dateCoeff);
	}

	function countGapMonthly(date1, date2) {
		var yearGap = date1.getYear() - date2.getYear();
		return date1.getMonth() - date2.getMonth() + yearGap * 12;
	}

	function composeNext(date) {
		var newDate = new Date(date.getTime());
		switch (mode) {
			case MODE.HOURLY:
				newDate.setMinutes(61);
				break;
			case MODE.DAILY:
				newDate.setHours(25);
				break;
			case MODE.WEEKLY:
				newDate.setHours(24 * 7 + 1);
				break;
			case MODE.MONTHLY:
				newDate.setDate(32);
				break;
		}
		return {date: newDate, value: 0};
	}


	function parseDate(str) {
		var splitString = str.split(' ');
		var date = new Date(splitString[0]);

		var hours = +splitString[1] || 0;
		date.setHours(hours);

		return date;
	}

	function formatDateBack(date) {

		function formatNumber(number) {
			return number.toLocaleString('en', {minimumIntegerDigits: 2});
		}

		var dateString = date.getFullYear() + '-' + formatNumber(date.getMonth() + 1);

		if (mode !== MODE.MONTHLY) {
			dateString += '-' + formatNumber(date.getDate());
		}
		if (mode === MODE.HOURLY) {
			dateString += ' ' + formatNumber(date.getHours())
		}
		return dateString;
	}

	return {
		countGap: (mode === MODE.MONTHLY) ? countGapMonthly : countGap,
		formatDateBack: formatDateBack,
		parseDate: parseDate,
		composeNextDate: composeNext
	}
};

function fillEmptyDates(data, mode) {
	var helper = new Helper(mode);

	var filledData = data.map(function(dataItem) {
		return {
			date: helper.parseDate(dataItem.date),
			value: dataItem.value
		};
	});

	for (var i = 0; i < filledData.length - 1; i++) {
		var gap = helper.countGap(filledData[i + 1].date, filledData[i].date);
		if (gap > 1) {
			for (var j = 0; j < gap - 1; j++) {
				filledData.splice(i + j + 1, 0, helper.composeNextDate(filledData[i + j].date))
			}
			i += j;
		}
	}

	return filledData.map(function(item) {
		item.date = helper.formatDateBack(item.date);
		return item;
	});
}
