const time = () => {
    const dateObject = new Date();
    const seconds = dateObject.getSeconds();
    const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const minutes = dateObject.getMinutes();
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const hours = dateObject.getHours();
    const formatHours = hours < 10 ? `0${hours}` : hours;
    const dayHandShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const day = dateObject.getDay();
    const stringFormat = `${formatHours}:${formatMinutes}:${formatSeconds}-${dayHandShort[day]}-${date}/${month}/${year}`;
    return stringFormat;
}

export default time