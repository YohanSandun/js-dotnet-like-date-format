const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const shortWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const fill = (number, digits) => {
    if (number < Math.pow(10, digits-1)) {
        let filledNumber = number.toString();
        while (filledNumber.length < digits) {
            filledNumber = '0' + filledNumber;
        }
        return filledNumber;
    }
    return number.toString();
}

const tokens = {
    d : date => date.getDate().toString(),
    dd : date => fill(date.getDate(), 2),
    ddd : date => shortWeekdays[date.getDay()],
    dddd : date => weekdays[date.getDay()],
    f: date => parseInt(date.getMilliseconds() / 100).toString(),
    ff: date => fill(parseInt(date.getMilliseconds() / 10), 2),
    fff: date => fill(date.getMilliseconds(), 3),
//  ffff: is not possible in js
//  fffff: is not possible in js
//  ffffff: is not possible in js
    F: date => date.getMilliseconds() > 0 ? parseInt(date.getMilliseconds() / 100).toString() : '',
    FF: date => date.getMilliseconds() > 0 ? fill(parseInt(date.getMilliseconds() / 10), 2) : '',
    FFF: date => date.getMilliseconds() > 0 ? fill(date.getMilliseconds(), 3) : '',
//  FFFF: is not possible in js
//  FFFFF: is not possible in js
//  FFFFFF: is not possible in js
//  g: era
//  gg: era (same as g)
    h: date => (date.getHours() % 12 || 12).toString(),
    hh: date => fill(date.getHours() % 12 || 12, 2),
    H: date => date.getHours().toString(),
    HH: date => fill(date.getHours(), 2),
//  K: time zone info
    m: date => date.getMinutes().toString(),
    mm: date => fill(date.getMinutes(), 2),
    M: date => (date.getMonth()+1).toString(),
    MM: date => fill(date.getMonth()+1, 2),
    MMM: date => shortMonths[date.getMonth()],
    MMMM: date => months[date.getMonth()],
    s: date => date.getSeconds().toString(),
    ss: date => fill(date.getSeconds(), 2),
    t: date => date.getHours() >= 12 ? 'A' : 'P',
    tt: date => date.getHours() >= 12 ? 'AM' : 'PM',
    y: date => parseInt(date.getFullYear().toString().substr(2, 2)).toString(),
    yy: date => date.getFullYear().toString().substr(2, 2),
    yyy: date => fill(date.getFullYear(), 3),
    yyyy: date => date.getFullYear().toString(),
    yyyyy: date => fill(date.getFullYear(), 5),
    z: date => date.getTimezoneOffset() > 0 ? '+' + parseInt(date.getTimezoneOffset() / 60).toString() : parseInt(date.getTimezoneOffset() / 60).toString(),
    zz: date => date.getTimezoneOffset() > 0 ? '+' + fill(parseInt(date.getTimezoneOffset() / 60), 2) : '-' + fill(parseInt(date.getTimezoneOffset()*-1 / 60), 2),
    zzz: date => {
        let h = parseInt(date.getTimezoneOffset() / 60);
        let m = date.getTimezoneOffset() - (h * 60);
        if (date.getTimezoneOffset() > 0) {
            return '+' + fill(h, 2) + ':' + fill(m, 2);
        } else {
            return '-' + fill(h*-1, 2) + ':' + fill(m*-1, 2);
        }
    }
};

const formatDate = (date, format) => {
    let formatted = format;
    let index = 0;

    function skip(char) {
        let segment = '';
        while (index < format.length && format[index] === char) {
            segment += format[index];
            index++;
        }
        return segment;
    }

    let offset = 0;
    while (index < format.length) {
        let oldIndex = index;
        let segment = skip(format[index]);
        if (tokens[segment]) {
            let replace = tokens[segment](date);
            formatted = formatted.substr(0, oldIndex + offset) + replace + formatted.substr(index + offset);
            offset += replace.length - segment.length;
        }
    }

    return formatted;
}

const format = (date, format) => {
    if (!date) {
        return 'Invalid date';
    }
    if (!format) {
        return 'Invalid format';
    }

    if (format.length === 1) {
        //TODO r, s, u
        if (format[0] == 'y') {
            return formatDate(date, 'yyyy MMMM');
        } else if (format[0] == 'd') {
            return formatDate(date, 'MM/dd/yyyy');
        } else if (format[0] == 'f') {
            return formatDate(date, 'dddd, dd MMMM yyyy HH:mm');
        } else if (format[0] == 'g') {
            return formatDate(date, 'MM/dd/yyyy HH:mm');
        } else if (format[0] == 'm') {
            return formatDate(date, 'MMMM dd');
        } else if (format[0] == 'o') {
            return formatDate(date, 'yyyy-MM-ddTHH:mm:ss.fff');
        } else if (format[0] == 't') {
            return formatDate(date, 'HH:mm');
        } else {
            return 'Invalid format';
        }
    }

    return formatDate(date, format);
}

Date.prototype.format = function (formatString) {
    return format(this, formatString);
}