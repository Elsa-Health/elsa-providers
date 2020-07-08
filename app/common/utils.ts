export function fullFormatDate(timeStamp: Date | string | number) {
    const dateObj = new Date(timeStamp);

    const date = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${date} ${getMonthName(dateObj).substr(0, 3)} ${year}`;
}

export function getMonthName(timeStamp: Date | string | number) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return months[new Date(timeStamp).getMonth()];
}

export function friendlyFormatDate(timeStamp: Date | string | number) {
    const dateObj = new Date(timeStamp);

    const date = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    return `${date}-${month + 1}-${year}`;
}
