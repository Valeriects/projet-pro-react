function convertDate(date_time) {
    const date = new Date(date_time);
    const dateTime = date.toISOString();
    const dayDate = date.toLocaleDateString();

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;

    return (dateTime, dayDate, time);
}

export default convertDate;