var google = require('../lib/googleapis.js');

var printResult = function(err, result) {
  if (err) {
    console.log('Error occurred: ', err);
  } else {
    console.log('Result: ', result);
  }
};

var oauth2Client = new google.auth.OAuth2(
  '445090274054-vktr8q6jt0ne6pfof5go0a9fcj9jc68b.apps.googleusercontent.com',
  'CfN4Eoo_gL52DG7aIqN6MuXJ'
);
oauth2Client.setCredentials({
  access_token: 'ya29.TwDbT1XJS7eCdx8AAAD8GDTDmpQ86m90IqJNI92BQWxHL1GpWRzp0vIyERiJsw',
  refresh_token: '1/6aglNlBLs1JQ44K9dqYEBGBEpS0EoXsLZGh_skpBYzE'
});

// Add in auth client.
google.options({
  auth: oauth2Client
});

var gmail = google.gmail('v1');
var req = gmail.users.drafts.create({
  userId: 'me',
  resource: {
    message: {
      raw: getMessage()
    }
  },
  media: {
    mimeType: 'message/rfc822'
  }
}, printResult);

/*
var req = gmail.users.messages.send({
  userId: 'me',
  resource: {
    message: {
      raw: getMessage()
    }
  },
  media: {
    mimeType: 'message/rfc822'
  }
}, printResult);
*/

function getMessage() {
  var email = "From: 'me'\r\n" +
    "To: bradvogel@outlook.com\r\n" +
    "Subject: Test Doctype\r\n" +
    "Content-Type: text/html; charset=utf-8\r\n" +
    "\r\n" +
    "<!doctype html>" +
    "<html><body>test <!--[if !mso]>hidden from outlook<!--<![endif]--> </body></html>";

  var base64 = new Buffer(email).toString('base64');
  // Web-safe base64
  var websafeBase64 = base64.replace(/\//g, '_').replace(/\+/g, '-');
  return websafeBase64;
}
