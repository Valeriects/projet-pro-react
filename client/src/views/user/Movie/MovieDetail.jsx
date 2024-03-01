import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";




function MovieDetail() {
    const { id } = useParams();

    const { list } = useSelector((state) => state.movie);

    const movie = list.find((movie) => movie.id === parseInt(id));

    console.log(movie);

    return (
        <main id="movieDetail">
            {movie && (
                <article>
                    <h2>{movie.title}</h2>

                    {/* <img src={movie.src} alt="" /> */}
                    <p>Réalisateur: {movie.director}</p>
                    <p>Acteurs: {movie.actor}</p>
                    <p>Genre: {movie.categories.join(" - ")}</p>
                    <p>Date de réalisation: {movie.release_date}</p>
                    <p>Résumé: {movie.synopsis}</p>
                    <p>Durée: {movie.time}</p>
                    <Link to={"/"}>Accueil</Link>
                   
                </article>
            )}

        </main>
    )
}

export default MovieDetail;