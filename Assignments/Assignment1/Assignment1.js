var yargs=require('yargs');
const fs = require('fs');
var fileName = yargs.argv._[0] + '.txt';
const dataBuffer =(fs.readFileSync('listofFileNames.json').toString());
const fileNames=JSON.parse(dataBuffer);
var fileNamesArray= fileNames.fileNamesList;
var fileNotExists = true;
for (i in fileNamesArray) {
    if (fileNamesArray[i] === fileName)
    {
        console.log("File already exists. Please provide new file name");
        fileNotExists = false;
        break;
    }
  }
if (fileNotExists)
{
    fileNamesArray[fileNamesArray.length] = fileName;
    fileNames.fileNamesList = fileNamesArray;
    const fileList = JSON.stringify(fileNames);
    fs.writeFileSync('listofFileNames.json',fileList);  
    var fileInfo = 'You are awesome';
    fs.writeFileSync(fileName,fileInfo);
}
