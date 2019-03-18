const getLastDigital = require('./get-last-digital');
module.exports = function onCommandNew(app) {
    var result = [];
    var seq = app.start;
    var d = new Date(app.date);
    while (result.length < app.number) {
        if (app.gender == "male") {
            if (seq % 2 != 1) {
                seq += 1;
            }
        } else if (app.gender == "female") {
            if (seq % 2 != 0) {
                seq += 1;
            }
        }
        if (seq > 999) {
            seq -= 999;
            d = d.setDate(d.getDate() + 1);
            continue;
        }

        var year = d.getFullYear();
        var month = (d.getMonth() + 1 + "").padStart(2, '0');
        var date = (d.getDate() + "").padStart(2, '0');
        var pnr = year + month + date + (seq + '').padStart(3, '0');
        pnr = pnr + getLastDigital(pnr);
        result.push(pnr);
        seq++;
    }
    for (var idx = 0; idx < result.length; idx++) {
        console.log(result[idx]);
    }
}

