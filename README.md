# CHANGELOG
- Updated to manifest v3

# HOW TO INSTALL
chrome://extensions/

For this extension to work you need to open chrome with this aditional parameter (tested on v92)
--disable-web-security

create a new short and add this param
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-site-isolation-trials --user-data-dir=C:\Users\YourUser\Desktop\data

make sure to close all chromes process

# docs 
https://developer.chrome.com/docs/extensions/reference/scripting/
For execute content script inside a page add the following permissions:
- activeTab
- scripting

every time you open your extension the js of the popup will execute

# Testing cors:
```function alertContents() {
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