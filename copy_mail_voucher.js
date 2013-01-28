var REQUEST = null;
var CONTEXT = null;

function copy(text) {
    var clip = document.getElementById("clipboard_area");
    clip.value = text;
    clip.select();
    document.execCommand("copy");
}

(function () {
    var props = {
        //"title": chrome.i18n.getMessage('title'),
        "title": "メール起票フォーマットでコピー",
        "contexts": ["image", "link", "page"],
        "onclick": function (info, tab) {
            var alt, text;
            if(REQUEST != null){
                alt = REQUEST.alt || "";
                text = REQUEST.text || "";
                REQUEST = null;
            }

            if(info.srcUrl != null){
                copy("![" + alt + "](" + info.srcUrl + ")");
            }else if(info.linkUrl != null){
                copy("[" + text + "](" + info.linkUrl + ")");
            }else{
                chrome.tabs.getSelected(null, function(tab){
                    copy("[" + tab.title + "](" + info.pageUrl + ")")
                });
            }
            console.log("copyed");
        }
    }
    if(CONTEXT){
        chrome.contextMenus.update(CONTEXT, props);
    }else{
        CONTEXT = chrome.contextMenus.create(props);
    }
}());

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        REQUEST = request;
    }
);
