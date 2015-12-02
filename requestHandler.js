var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");


function start(response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload"  enctype="multipart/form-data"  method="post">' +
        '<input name="upload" type="file">' +
        '<input type="submit" value="Submit file" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.uploadDir = "./tmp";
    form.parse(request, function (error, fields, files) {
        console.log("parsing done");
        fs.renameSync(files.upload.path, "/Program Files/nodejs/temp/test.jpg");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/Program Files/nodejs/temp/test.jpg", "binary", function (err, file) {
        if (err) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(file, "binary");
            response.end();
        }

    });
}


exports.start = start;
exports.upload = upload;
exports.show = show;