// read CSV
// write JSON
const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

const parserParameters = {
    noheader:false,
    trim:true,
    delimiter:"auto",
    toArrayString: true
}

const csvFilePath = "./customer-data.csv"; //declared here to maintain easier
const jsonFilePath = path.join(__dirname,"customer-data.json");

let buff = [];
csv().fromFile(csvFilePath).on('json',(jsonObj) => {
    console.log(jsonObj);
    buff.push(jsonObj);
    }).on('done', (error) => {
        console.log("Finnished");
        // console.log(buff.length);
        fs.writeFile(jsonFilePath, JSON.stringify(buff, undefined, 2), {encoding:"utf-8"}, (err) =>{
            if(err) console.log("Error writing JSON-file: ", err);
        });
    }).on('error', (error)=> {
        console.log("Something went wrong during read and parse: ", error);
    });
