#!/usr/bin/env node
var pnrUtils = require('./pnr-utils')
var cmdPnrNew = require('./pnr-new')
var cmdPnrCheck = require('./pnr-check')
var app = require('commander');

var defaultDate = pnrUtils.randomDate();
var defaultSeq = parseInt(Math.random() * 999 + 1);

app.version("1.0.0");
app.command("new")
    .option("-d, --date [date]", `the birth date of the person. `, defaultDate)
    .option("-n, --number [n]", "how many personal number do you want to new.", 1)
    .option("-s, --start [n]", `the start sequence.`, defaultSeq)
    .option("-g, --gender [value]", "the gender of the person. available values are 'any','male' and 'female'.", 'any')
    .action((cmd) => {        
        cmdPnrNew(cmd);
    });

app.command("check <pnr>")
    .option("-g --gender [value]", "gender of the person. available values are 'any', 'male' and 'female'.", "any")
    .arguments("personal number you want to check.")
    .action((pnr,cmd) => {
        cmdPnrCheck(cmd, pnr);
    });

app.command("*").action((args) => {
    console.error("bad command input");
});

app.parse(process.argv);






