module.exports = function getLastDigital(pnr) {
    var magic = [0, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    var sum = 0;
    for (var idx = 0; idx < pnr.length; idx++) {
        var a = pnr.charCodeAt(idx) - 48;
        var b = a * magic[idx];
        var c = parseInt(b % 10 + b / 10);
        sum += c;
    }
    var d = (10 - sum % 10) % 10;
    return d + '';
}