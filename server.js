var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        if (pathname !== "/favicon.ico") {
            route(handle, pathname, response, request);
            console.log("Request for+" + pathname + "received")
        }
    }

    http.createServer(onRequest).listen(8822);
    console.log("Server has started.");
}

exports.start = start;