export const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

export function getStatusCode(id) {
    switch(id) {
        case 0: return 'Idle';
        case 1: return 'OK';
        case 2: return 'No Changes';
        case 3: return 'Processing';
        case 4: return 'Error';
    }

    return 'Unknown';
}

export function getFormattedTime(date) {
    if (date) {
        const dateParsed = new Date(date);
        const hours = `0${dateParsed.getHours()}`.substr(-2);
        const mins = `0${dateParsed.getMinutes()}`.substr(-2);
        const secs = `0${dateParsed.getSeconds()}`.substr(-2);
        return `${hours}:${mins}:${secs}`;
    }

    return 'Unknown';
}

export function getFormattedDate(date) {
    if (date) {
        const dateParsed = new Date(date);
        var day = dateParsed.getDate();
        var monthIndex = dateParsed.getMonth();
        var year = dateParsed.getFullYear();
        return `${day} ${monthNames[monthIndex]} ${year} ${getFormattedTime(date)}`;
    }

    return '';
}