var clientId = 'CLIENT_ID'; // TODO: change to real client identifier
var scopes = 'https://www.googleapis.com/auth/urlshortener'; // TODO: change this to Gmail API

function gapiAuth(authNow : boolean) {
	gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: authNow}, function(result) {
		var btn = document.getElementById('authorize-button');

		if (result && !result.error) {
			btn.style.visibility = 'hidden';
			gapiInitialized();
		} else {
			btn.style.visibility = '';
			btn.onclick = gapiAuth;
		}
	});
}

function gapiLoaded() {
	gapi.client.setApiKey('API_KEY'); // TODO: Add API key here
}

function gapiInitialized() {
		// TODO: Change to Gmail API
		gapi.client.load('urlshortener', 'v1').then(function() {
			document.alert('loaded!');
		});
}

$(document).ready(function() {
	console.log('ready!');
});
