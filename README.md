# CHANGELOG
- Updated to manifest v3

# HOW TO INSTALL
chrome://extensions/

Activate developer mode and import the extension

For this extension to work you need to open chrome some aditional parameters (tested on v92):
--disable-web-security
--disable-site-isolation-trials
--user-data-dir=

Create a new shortcut with this params
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-site-isolation-trials --user-data-dir=C:\Users\YourUser\Desktop\data

Make sure to close all chromes process

# docs 
https://developer.chrome.com/docs/extensions/reference/scripting/

For execute content script inside a page add the following permissions:
- activeTab
- scripting

Every time you open your extension the js of the popup will be executed.

# Testing cors:
```
function alertContents() {
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if (httpRequest.status === 200) {
			alert(httpRequest.responseText);
		} else {
			alert('There was a problem with the request.');
		}
	}
}

function makeRequest() {
	httpRequest = new XMLHttpRequest();

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	httpRequest.onreadystatechange = alertContents;
	httpRequest.open('GET', 'https://www.globo.com/');
	httpRequest.send();
}
```
