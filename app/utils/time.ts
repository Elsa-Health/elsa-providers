// all utils related to time in here

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
]

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

/*
return dat in format Date Month Year eg 12 Sept 2020
*/
export function getFormattedDate(): string {
    const d = new Date()
    const year = d.getFullYear()
    const date = d.getDate()
    const monthName = months[d.getMonth()]

    // const dayName = days[d.getDay()]
    return `${date} ${monthName} ${year}`
}
