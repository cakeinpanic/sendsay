module.exports = {
	dataHourly: {
		fixture: [{
			date: "2014-01-31 22",
			value: 3
		}, {
			date: "2014-02-01 00",
			value: 1
		}, {
			date: "2014-02-01 04",
			value: 3
		}, {
			date: "2014-02-01 06",
			value: 7
		}],
		expected: [{
			date: "2014-01-31 22",
			value: 3
		}, {
			date: "2014-01-31 23",
			value: 0
		}, {
			date: "2014-02-01 00",
			value: 1
		}, {
			date: "2014-02-01 01",
			value: 0
		}, {
			date: "2014-02-01 02",
			value: 0
		}, {
			date: "2014-02-01 03",
			value: 0
		}, {
			date: "2014-02-01 04",
			value: 3
		}, {
			date: "2014-02-01 05",
			value: 0
		}, {
			date: "2014-02-01 06",
			value: 7
		}]
	},
	dataDaily: {
		fixture: [{
			date: "2014-01-30",
			value: 3
		}, {
			date: "2014-02-02",
			value: 1
		}, {
			date: "2014-02-03",
			value: 3
		}],
		expected: [{
			date: "2014-01-30",
			value: 3
		}, {
			date: "2014-01-31",
			value: 0
		}, {
			date: "2014-02-01",
			value: 0
		}, {
			date: "2014-02-02",
			value: 1
		}, {
			date: "2014-02-03",
			value: 3
		}]
	},
	dataWeekly: {
		fixture: [{
			date: "2014-01-27",
			value: 3
		}, {
			date: "2014-02-10",
			value: 1
		}, {
			date: "2014-03-03",
			value: 3
		}],
		expected: [{
			date: "2014-01-27",
			value: 3
		}, {
			date: "2014-02-03",
			value: 0
		}, {
			date: "2014-02-10",
			value: 1
		}, {
			date: "2014-02-17",
			value: 0
		}, {
			date: "2014-02-24",
			value: 0
		}, {
			date: "2014-03-03",
			value: 3
		}]
	}, dataMonthly: {
		fixture: [{
			date: "2013-11",
			value: 1
		}, {
			date: "2014-01",
			value: 3
		}, {
			date: "2014-03",
			value: 1
		}, {
			date: "2014-04",
			value: 3
		}],
		expected: [{
			date: "2013-11",
			value: 1
		}, {
			date: "2013-12",
			value: 0
		}, {
			date: "2014-01",
			value: 3
		}, {
			date: "2014-02",
			value: 0
		}, {
			date: "2014-03",
			value: 1
		}, {
			date: "2014-04",
			value: 3
		}]
	}
};
