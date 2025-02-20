const fs = require("fs");
const path = require("path");

async function saveGet(api, name, des, response) {
  console.log("started the saveGet function");
  const filePath = path.join(__dirname, "report.txt");
  console.log("setting the data to append");
  const dataToAppend = `${"************************************************\n"}"name:"${name}\n"what is it: "${des}\n"end point:"${api}\n"the wanted response:"${response}\n${"************************************************\n"}`;

  console.log("creating the directory");
  fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
    console.log("creating the directory");
    if (err) throw err;
    console.log("sending the data to the file ");
    fs.appendFileSync(filePath, dataToAppend);
    console.log("creating the directory");
    console.log('The "data to append" was appended to file!');
  });
  return dataToAppend;
}

module.exports = saveGet;
