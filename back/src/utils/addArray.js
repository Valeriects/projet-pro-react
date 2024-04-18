
function addArray (datas_1, datas_2, datas_3, datas_4) { 
    //ajout des catégories
    const categoryBymovieId = datas_2.reduce(
        (acc, { movieId, name_cat }) => {
            if (!acc[movieId]) {
                acc[movieId] = [];
            }
            acc[movieId].push(name_cat);
            return acc;
        },
        {}
    );

    //ajout des médias
    const mediaByMovieId = datas_3.reduce(
        (acc, { movieId, src_img, alt_img, src_video, alt_video }) => {
            if (!acc[movieId]) {
                acc[movieId] = [];
            }
            acc[movieId].push({ "src_img": src_img, "alt_img": alt_img, "src_video": src_video, "alt_video": alt_video });
            return acc;
        },
        {}
    );
 
    //ajout des horaires
    const timeByMovieId = datas_4.reduce(
        (acc, { movieId, hours_timetable, timetableId, sessionId }) => {
            if (!acc[movieId]) {
                acc[movieId] = [];
            }
            acc[movieId].push({"id":timetableId, "horaire":hours_timetable, "sessionId":sessionId});
            return acc;
        },
        {}
    );

    for (const data of datas_1) {
        data.categories = categoryBymovieId[data.id] || []; //j'ajoute une nouvelle clef avec les valeur dans un tableau
        data.media = mediaByMovieId[data.id] || [];
        data.timeTables = timeByMovieId[data.id] || [];
    }

    return datas_1;
};




export { addArray };
