let idx, json, files, video, request;
let wrapper = document.querySelector("#wrapper");

function init() {
	let ids = [];
	let htmlBuilder = "";

	video = document.querySelector("#player");
	
	if(video != null) {
		idx = video.contentWindow.document.scripts[3].innerText.indexOf("; if (!config");
		json = video.contentWindow.document.scripts[3].innerText.substring(44, idx);
		files = JSON.parse(json);
		files = files.request.files.progressive;

		for(let val of files) {
			htmlBuilder += "<div><label for=\"video-"+val.quality+"\">"+val.quality+"</label><button id=\"video-"+val.quality+"\">download</button></div>";
			ids.push(val.quality);
		}
	} else {
		htmlBuilder += "<div>Nenhum video encontrado :(</div>";
	}

	return {
		htmlBuilder: htmlBuilder,
		ids: ids
	};
}

function download(quality) {
	chrome.storage.local.get('quality', function(storage) {
		chrome.storage.local.remove('quality'); // clean up

		video = document.querySelector("#player");

		if(video == null) {
			alert("No video found on this page!");
		} else {
			idx = video.contentWindow.document.scripts[3].innerText.indexOf("; if (!config");
			json = video.contentWindow.document.scripts[3].innerText.substring(44, idx);
			files = JSON.parse(json);
			files = files.request.files.progressive;
			for(let val of files) {
					if(val.quality == quality) {
							console.log(val);
							var link = document.createElement('a');
							link.href = val.url;
							link.download = true;
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);
							break;
					}
			}
		}
	});
}

function addListener(id) {
	let el = document.querySelector("#video-" + id);
	el.onclick = function() {
		chrome.tabs.query(
			{
					active: true, 
					currentWindow: true
			}, 
			function(tabs) {
				chrome.scripting.executeScript(
					{
						target: {tabId: tabs[0].id},
						function: download,
						args: [id]
					}
				);
			}
		)
	};
}

// INIT: mount all download buttons
chrome.tabs.query(
	{
			active: true, 
			currentWindow: true
	}, 
	function(tabs) {
		chrome.scripting.executeScript(
			{
				target: {tabId: tabs[0].id},
				function: init
			},
			(injectionResults) => {
				wrapper.innerHTML += injectionResults[0].result.htmlBuilder;
				for(let val of injectionResults[0].result.ids) {
					addListener(val);
				}
			}
		);
	}
);

