var assert = require('assert');
var getLCD = require('../lcd.js');

var fillEmptyDates = require('../dates.js').fillEmptyDates;
var fillDatesMode = require('../dates.js').fillMode;
var datesTestData = require('./dateData.js');

describe('dates', function() {

	function test(data, mode) {
		var result = fillEmptyDates(data.fixture, mode);
		assert.deepEqual(result, data.expected);
	}

	it('hourly', function() {
		test(datesTestData.dataHourly, fillDatesMode.HOURLY);
	});
	it('daily', function() {
		test(datesTestData.dataDaily, fillDatesMode.DAILY);
	});
	it('weekly', function() {
		test(datesTestData.dataWeekly, fillDatesMode.WEEKLY);
	});
	it('monthly', function() {
		test(datesTestData.dataMonthly, fillDatesMode.MONTHLY);
	});
});

describe('lcd', function() {
	var expected = [1, 1, 2, 6, 12, 60, 60, 420, 840, 2520, 2520, 27720, 27720, 360360, 360360, 360360, 720720, 12252240, 12252240, 232792560];
	it('count first 20', function() {
		var result = [];
		for (var i = 0; i < 20; i++) {
			result.push(getLCD(i));
		}
		assert.deepEqual(result, expected)
	});
});