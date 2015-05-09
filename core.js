var apiKey = 'AIzaSyBIQzcxjrs9f-jv4iMB8-pGZatxqgRrcz4';

var gapiAuthInfo = {
    client_id: '1020312901975-rqme2cmcjidsv6cq93o7fo8npqm617v7.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/gmail.modify',
    immediate: false
}

function gapiAuth() {
    console.log('Authorizing...');
	gapi.auth.authorize(gapiAuthInfo,
        function(result) {
            console.log('Authorized, moving on');
            var btn = document.getElementById('authorize-button');

            if (result && !result.error) {
                btn.style.visibility = 'hidden';
                gapiInitialized();
            } else {
                console.log('auth failed');
                btn.style.visibility = '';
                btn.onclick = gapiAuth;
            }
        });
}

function gapiLoaded() {
    console.log('gapiLoaded');
	gapi.client.setApiKey(apiKey); // TODO: Add API key here
}

function gapiInitialized() {
    console.log('gapiInitialized');

    // TODO: Change to Gmail API
    gapi.client.load('gmail', 'v1').then(function() {
        console.log('fetching threads');
        var request = gapi.client.gmail.users.threads.list({'userId': 'me'});
        request.execute(function(response) {
            console.log('fetched about ' + response.resultSizeEstimate + ' threads');
            var threads = response.threads;
            for (var i = 0; i < threads.length; i++) {
                $("#mailbox").add("li").text(threads[i].snippet)
            };
        });
    });
}

$("#authorize-button").click(gapiAuth);
