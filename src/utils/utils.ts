export function convertDateFormat (inputDateStr: Date) {
    // Create a Date object from the input string
    const inputDate = new Date(inputDateStr);

    // Extract the components of the date
    const year = inputDate.getFullYear();
    const month = ('0' + (inputDate.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ('0' + inputDate.getDate()).slice(-2);
    const hours = ('0' + inputDate.getHours()).slice(-2);
    const minutes = ('0' + inputDate.getMinutes()).slice(-2);

    // Construct the desired format
    const outputDateStr = `${year}-${month}-${day} ${hours}:${minutes}`;

    return outputDateStr;
}

export function compileTimes (dateStrings: Date[]) {
    const dates = dateStrings.map(dateString => new Date(dateString));
    const timestamps = dates.map(date => date.getTime());
    return {
        to: timestamps[1],
        from: timestamps[0]
    };
}
export function compileTime (dateString: Date) {
    const dates = new Date(dateString);
    return dates.getTime();
}
export function getHourAndMinutesFromTimestamp (timestamp: number) {
    const date = new Date(timestamp);
    const formattedTime = date.toLocaleTimeString('uz-UZ', {
        timeZone: 'Asia/Tashkent',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });

    return formattedTime;
}
export function getDateFromTimestamp (timestamp: number) {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
        timeZone: 'Asia/Tashkent',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    return formattedDate;
}

export function getPrettyTime(inputTime: string): string {
    const utcDate = new Date(inputTime);

    const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Tashkent",
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false  
    };

    // Formatting the date using the specified options and converting it to a string
    const prettyTime = utcDate.toLocaleDateString('en-US', options);

    return prettyTime;
}


export function getOneMinuteBeforeCurrentTime (): string {
    // Get the current time
    let currentTime = new Date();

    // Subtract one hour and 59 minutes
    currentTime.setHours(currentTime.getHours() - 2);
    currentTime.setMinutes(currentTime.getMinutes() + 59);

    // Format the result as "HH:mm"
    let hours = currentTime.getHours().toString().padStart(2, '0');
    let minutes = currentTime.getMinutes().toString().padStart(2, '0');
    let formattedTime = `${hours}:${minutes}`;

    return formattedTime;
}
export function timestampToHumanDate (timestamp: number): string {
    // Create a new Date object using the timestamp and convert it to GMT
    const date = new Date(timestamp); // Multiply by 1000 to convert seconds to milliseconds
    const gmtString = date.toUTCString();

    return gmtString;
}
