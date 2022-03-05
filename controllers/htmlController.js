const fs = require('fs');

const drawPage = fs.readFileSync(`${__dirname}/../client/main.html`);
const tools = fs.readFileSync(`${__dirname}/../client/canvasTools.js`);
const css = fs.readFileSync(`${__dirname}/../client/main.css`);

const getCSS = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(css);
    res.end();
}

const getCanvasTools = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(tools);
    res.end();
}
const getDrawPage = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(drawPage);
    res.end();
}

module.exports = {
    getDrawPage,
    getCSS,
    getCanvasTools
}