var apiModule = (function() {
	var commonUrl = 'https://api.sendsay.ru';

	var loginAction = 'login';
	var messageAction = 'sys.message';
	var logoutRequest = {action: 'logout'};

	function sendRequestToUrl(url, request) {
		var data = new FormData();
		data.append('apiversion', 100);
		data.append('json', 1);
		data.append('request', JSON.stringify(request));

		return fetch(url, {
			method: 'post',
			body: data
		}).then(function(response) {
			return response.json();
		})
	}

	return function SendMessage(login, password) {
		var url = commonUrl;
		var loginRequest = {
			action: loginAction,
			login: login,
			passwd: password
		};

		function sendRequest(request) {
			return sendRequestToUrl(url, request);
		}

		function onAuth(response) {
			if (response.errors) {
				return Promise.reject(response.errors)
			}
			var redirect = response['REDIRECT'];
			if (redirect) {
				url += redirect;
				return sendRequest(loginRequest);
			}
			return response;
		}

		function logout(messageResponse) {
			if (!messageResponse.errors) {
				return sendRequest(logoutRequest);
			}
			return Promise.reject(messageResponse.errors);
		}

		function send(email, message) {
			var messageRequest = {
				action: messageAction,
				email: email,
				message: message
			};

			function sendMessage(authResponse) {
				messageRequest.session = authResponse.session;
				return sendRequest(messageRequest);
			}

			return sendRequest(loginRequest)
				.then(onAuth)
				.then(sendMessage)
				.then(logout)
				.then(function() {
					console.log('Sent message and logged out successfully ')
				})
				.catch(function(errors) {
					var error = errors[0];
					var explanaition = error.explain ? ': ' + error.explain : '';
					console.error(error.id + explanaition)
				})
		}

		this.send = send;

	}
})();


var module = new apiModule('demo', 'demo');
var invalidCredentialsModule = new apiModule('demo1', 'demo');

module.send();
module.send('test@test.test', 'test');

invalidCredentialsModule.send();
invalidCredentialsModule.send('test@test.test', 'test');
