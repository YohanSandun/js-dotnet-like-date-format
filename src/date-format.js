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
    
};

const getTokens = (date, format) => {
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
        return 'TODO';
    }

    console.log(getTokens(date, format));
}

format(new Date(), "dddd-dd ff");