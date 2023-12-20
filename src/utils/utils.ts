export function convertDateFormat(inputDateStr : Date) {
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

  export function compileTimes(dateStrings : Date[]) {
    const dates = dateStrings.map(dateString => new Date(dateString));
    const timestamps = dates.map(date => date.getTime());
  
    return {
      to: timestamps[1],
      from: timestamps[0]
    };
  }
  export function compileTime(dateString : Date) {
    const dates  = new Date(dateString);
    return  dates.getTime();
  
  }
  export function getHourAndMinutesFromTimestamp(timestamp :number) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }
  export function getDateFromTimestamp(timestamp : number) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }
  

  
 export  function getPrettyTime(inputTime: string): string {
    const year = inputTime.substring(0, 4);
    const month = inputTime.substring(4, 6);
    const day = inputTime.substring(6, 8);
    const hours = inputTime.substring(8, 10);
    const minutes = inputTime.substring(10, 12);
  
    const parsedDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
  
    const prettyTime = parsedDate.toLocaleDateString('en-US', options);
  
    return prettyTime;
  }
  
