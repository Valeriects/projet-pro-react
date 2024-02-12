function addArray (datas_1, datas_2, datas_3) { //todo refaire
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

    for (const data of datas_1) {
        data.categories = categoryBymovieId[data.id] || [];
    }

    const mediaByMovieId = datas_3.reduce(
        (acc, { movieId, src_media, alt, type_media }) => {
            if (!acc[movieId]) {
                acc[movieId] = [];
            }
            acc[movieId].push({ "src": src_media, "alt": alt, "type": type_media });
            return acc;
        },
        {}
    );

    for (const data of datas_1) {
        data.media = mediaByMovieId[data.id] || [];
    }

    return datas_1;
};

function addArray2 (datas_1, datas_2) { //todo refaire
    const timetableBySessionId = datas_2.reduce(
        (acc, { movieId, name_cat }) => {
            if (!acc[movieId]) {
                acc[movieId] = [];
            }
            acc[movieId].push(name_cat);
            return acc;
        },
        {}
    );

    for (const data of datas_1) {
        data.timetables = timetableBySessionId[data.id] || [];
    }

    return datas_1;
};


export { addArray, addArray2 };
