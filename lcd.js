(function () {
	"use strict";

	function fillArray(length, cb) {
		return Array
			.apply(null, Array(length))
			.map(cb);
	}

	function getPrimesList(max) {
		var primesList = fillArray(max + 2, function (el, i) {
			return i
		});
		for (var i = 2; i < max + 2; i++) {
			if (!!primesList[i]) {
				for (var j = i * 2; j < max + 2; j += i) {
					primesList[j] = 0;
				}
			}
		}
		return primesList.filter(function (num) {
			return num > 1
		});
	}

	function getProductOfPrimes(number, primesList) {
		return primesList.map(function (primeNumber) {
			var power = 0;
			while (number > 0 && number % primeNumber === 0) {
				number = number / primeNumber;
				power++;
			}
			return power;
		})
	}

	function getLCD(number) {
		var LCD = 1;
		var primesList = getPrimesList(number);
		var primesProduction = fillArray(number, function (el, i) {
			return getProductOfPrimes(i + 1, primesList);
		});

		primesList.map(function (primeNumber, i) {
			var power = 0;
			primesProduction.map(function (dividers) {
				if (power < dividers[i]) {
					power = dividers[i]
				}
			});
			LCD *= Math.pow(primeNumber, power)
		});

		return LCD;
	}

	console.log(getLCD(20));
})();