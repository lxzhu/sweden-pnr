const getLastDigital = require('./get-last-digital')
const pnrUtils = require('./pnr-utils')

module.exports = function (app, pnr) {
    if (!pnr) {
        console.error("argument pnr is missing.");
    } else {
        if (!pnrUtils.pnrRegex.test(pnr)) {
            console.error("input pnr does not match regex:", pnrUtils.pnrRegex);
        } else {
            var match = pnrUtils.pnrRegex.exec(pnr);
            var year = parseInt(match[1]);
            var month = parseInt(match[2]);
            var date = parseInt(match[3]);
            var seq = parseInt(match[4]);
            var lastDigital = match[5];
            if (year < 100) {
                year += 1900;
            }
            var birthDate = pnrUtils.removeTime(new Date());

            birthDate.setFullYear(year);
            birthDate.setMonth(month - 1);
            birthDate.setDate(date);
            if (birthDate.getFullYear() != year
                || birthDate.getMonth() != month - 1
                || birthDate.getDate() != date) {
                console.error(`${match[1]}${match[2]}${match[3]} is not a date`);
                return;
            }
            var today = pnrUtils.removeTime(new Date());
            if (birthDate.getTime() > today.getTime()) {
                console.error(`${match[1]}${match[2]}${match[3]} is after today.`);
                return;
            }
            if (seq == 0) {
                console.error(`false:${match[4]} is not a correct sequence number.`);
                return;
            }
            if (app.gender == 'male' && seq % 2 != 1) {
                console.error(`false ${match[4]} is not a correct sequence number for male.`)
                return;
            }
            if (app.gender == 'female' && seq % 2 != 0) {
                console.error(`false ${match[4]} is not a correct sequence number for female.`)
                return;
            }
            var pnrWithoutLastDigital = `${year}${match[2]}${match[3]}${match[4]}`;
            var expectedLastDigital = getLastDigital(pnrWithoutLastDigital);
            if (expectedLastDigital != lastDigital) {
                console.error(`false: expected:${expectedLastDigital}, actual:${lastDigital}`);
                return;
            }
            console.info("true");
        }
    }
}