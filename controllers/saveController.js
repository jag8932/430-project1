const fs = require('fs'); //eslint-disable-line
const querystring = require('querystring'); //eslint-disable-line
const url = require('url'); //eslint-disable-line
const saves = require('../saved/storage.json'); //eslint-disable-line
// Eslint was freaking out over 'require()'
async function getSaves(req, res) { //eslint-disable-line
    try {
        const saves = await findAllSaves();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(saves));
    } catch(error) {
        console.log(error);
    }
}

 function getSaveByName (req, res) {
    //This bit of code is from stackoverflow https://stackoverflow.com/questions/53596375/nodejs-without-express-how-to-get-query-params
    //Even though the code is deprecated it works and I require nothing more from it so I stuck with it. 
    const parsedUrl = url.parse(req.url);
    const query = querystring.parse(parsedUrl.query);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(findSaveByName(query.name)));
}
const postSave = (req, res, body) => { //eslint-disable-line
    try {
        let parsedBody
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(function () {
            for (const prop in body) {
                 parsedBody = JSON.parse(prop);
            }
         fs.readFile(`${__dirname}/../saved/storage.json`, function (error, content) { //eslint-disable-line
            if (error) throw error;
            let parseContent = JSON.parse(content);
            parseContent.push(parsedBody);

            fs.writeFileSync(`${__dirname}/../saved/storage.json`, JSON.stringify(parseContent)); //eslint-disable-line
         })
            return parsedBody
        });
    }
    catch(error) {
        console.log(error); //eslint-disable-line
    }
}

function findAllSaves() {
    return new Promise((resolve, reject) => { //eslint-disable-line
        resolve(saves);
    }) 
}

// Finds save by name by reading the storage json file. Simpley loops through file and compares the save file name with the name passed in.
const findSaveByName = (name) => {
    let jsonFile = fs.readFileSync(`${__dirname}/../saved/storage.json`); //eslint-disable-line
     jsonFile = JSON.parse(jsonFile);

    for (let i = 0; i < jsonFile.length; i++) {
        if (jsonFile[i].name === name) {
            return jsonFile[i];
        }
    }
    
}
module.exports = { //eslint-disable-line
    getSaves,
    getSaveByName,
    postSave
}