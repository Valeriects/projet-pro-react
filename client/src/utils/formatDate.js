function convertDate(date_time) {
    const date = new Date(date_time);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    const newDate = date.toLocaleDateString('fr-FR', options);

    return (newDate);
}

function convertTime(date_time) {
    const date = new Date(date_time);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const time = `${hours}h${minutes}min`;

    return (time);
}

function formattedTime(time) {
      const [heures, minutes] = time.split(':'); // Séparer l'heure, les minutes et les secondes
    return `${heures}H${minutes}`;
}

export {convertDate, convertTime, formattedTime};