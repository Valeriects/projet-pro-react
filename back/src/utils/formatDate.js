function dateFile(date) {
    const currentDate = new Date(date);

    const hours = currentDate.getHours().toString().padStart(2, '0'); // Heures
    const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Minutes

    const dateLocal = currentDate.toLocaleDateString().replace(/\//g, '-'); //date au format local

    const formattedDate = `${dateLocal}_${hours}H${minutes}`;

    return formattedDate;
};

export { dateFile };