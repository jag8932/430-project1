const http = require('http');
const url = require('url');
const query = require('querystring');

const clientHandler = require('./controllers/htmlController');
const saveHandler = require('./controllers/saveController');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
// URL Struct to help organize routing. Learned this from Tony

const urlStruct = {
    GET: {
        '/': clientHandler.getDrawPage,
        '/canvasTools.js': clientHandler.getCanvasTools,
        '/main.css': clientHandler.getCSS,
        '/getSaved': saveHandler.getSaves,
        '/getSaveByName': saveHandler.getSaveByName
    },
    POST: {
        '/saveArt' : saveHandler.postSave
    }
}

const handlePost = (req, res, handler) => {
    const body = [];

    req.on('error', (err) => {
        console.dir(err);
        res.statusCode = 400;
        res.end();
    });

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', ()=> {
        const bodyString = Buffer.concat(body).toString();
        const bodyParams = query.parse(bodyString);

        handler(req, res, bodyParams);
    });
};
const onRequest = (req, res) => {
    const parseUrl = url.parse(req.url);
    // Parse req.url into a string and check if the url struct has valid
    // routes. If so call their methods. 

    if (urlStruct[req.method][parseUrl.pathname]) {
        if (req.method === 'GET') {
            urlStruct[req.method][parseUrl.pathname](req, res);
        } 
        if (req.method === 'POST') {
            handlePost(req, res, urlStruct[req.method][parseUrl.pathname]);
        } 
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({
            message: "The page you are looking for cannot be found."
        }));
        res.end();
    }
}
http.createServer(onRequest).listen(port);