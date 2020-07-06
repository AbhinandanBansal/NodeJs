const fs = require('fs');

const data = (fs.readFileSync('JSONData.json').toString());

const info = JSON.parse(data);

info.title = 'Abhi';

const infoJSON = JSON.stringify(info);

fs.writeFileSync('JSONData.json',infoJSON);