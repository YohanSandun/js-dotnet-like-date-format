const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const tokens = {
    d : date => date.getDate().toString(),
    dd : date => date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString(),
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

    while (index < format.length) {
        let oldIndex = index;
        let segment = skip(format[index]);
        if (tokens[segment]) {
            formatted = formatted.substr(0, oldIndex) + tokens[segment](date) + formatted.substr(index);
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

format(new Date(), "dd hello d");