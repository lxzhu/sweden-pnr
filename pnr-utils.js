function randomDate() {
    var today = new Date();
    var rand = 0 - Math.random() * 100 * 365;
    today.setDate(rand);
    return today.getFullYear() + '-'
        + (today.getMonth() + 1 + '').padStart(2, '0') + '-'
        + (today.getDate() + '').padStart(2, '0');
}

function removeTime(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMinutes(0);
    return date;
}

module.exports = {
    pnrRegex: /^(\d{2}|\d{4})(\d{2})(\d{2})[-\s]?(\d{3})(\d)$/,
    randomDate: randomDate,
    removeTime: removeTime
};