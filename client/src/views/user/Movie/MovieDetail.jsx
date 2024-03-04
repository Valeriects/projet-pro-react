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

                    <img src={`http://localhost:9000/img/${movie.media[0].src}`} alt={movie.media[0].alt} />
                    <iframe width="560" height="315" src={movie.media[1].src} title={movie.media[1].alt} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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