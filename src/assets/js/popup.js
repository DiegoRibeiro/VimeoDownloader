console.log("popup");

let idx, json, files, video, request;
let video1080 = document.getElementById("video-1080");

console.log(video1080);

video1080.onclick = function() {
    console.log("click!");

    chrome.tabs.query(
        {
            active: true, 
            currentWindow: true
        }, 
        function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id, 
                {
                    code: `
                        video = document.querySelector(".video");
                        if(video == null) {
                            alert("Go to a page that has a video");
                        }
                        else {
                            idx = video.children[0].contentWindow.document.scripts[3].innerText.indexOf("; if (!config");
                            json = document.querySelector(".video").children[0].contentWindow.document.scripts[3].innerText.substring(44, idx);
                            files = JSON.parse(json);
                            files = files.request.files.progressive;
                            for(let val of files) {
                                if(val.quality == "1080p") {
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
                        
                    `
                }
            );
        }
    );
}

/*request = new XMLHttpRequest();
request.open('GET', val.url);
request.onreadystatechange = function() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            alert(request.responseText);
        } else {
            alert('There was a problem with the request.');
        }
    }
}
request.send();*/