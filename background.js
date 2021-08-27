//startup code executed when extension is installed or updated
chrome.runtime.onInstalled.addListener(function () {

	// every time the user change page we remove the rules to avoid 
	// duplication and add all rules again
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules(
			[
				// first rule
				{
					conditions: [
						// 1st condition
						// if page is developer.chrome.com activated 
						// icon color
						new chrome.declarativeContent.PageStateMatcher(
							{
								pageUrl: {
									hostEquals: ''
								}
							}
						)
					],
					actions: [
						// 1st action
						// Execute page action when user clicks on the icon button
						new chrome.declarativeContent.ShowPageAction()
					]
				}

				// nth rule ...
			]
		)
	});
});