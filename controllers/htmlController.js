const fs = require('fs'); //eslint-disable-line

const drawPage = fs.readFileSync(`${__dirname}/../client/main.html`); //eslint-disable-line
const tools = fs.readFileSync(`${__dirname}/../client/canvasTools.js`); //eslint-disable-line
const css = fs.readFileSync(`${__dirname}/../client/main.css`); //eslint-disable-line

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

module.exports = { //eslint-disable-line
    getDrawPage,
    getCSS,
    getCanvasTools
}