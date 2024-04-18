import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useMenuToggle from "../../../hook/useMenuToggle";
import CardTime from "./Components/CardTime";

function MovieDetail() {
    useMenuToggle();
    const { id } = useParams();

    const { list } = useSelector((state) => state.movie);
    
    const movie = list.find((movie) => movie.id === parseInt(id));

    const item = movie;
    
    return (
        <main id="movieDetail">
            {movie && (
                <section>
                    <Link to={"/"}>Retour vers l&apos;accueil</Link>
                    
                    <article>

                        <h2>{movie.title}</h2>

                        <img src={`http://localhost:9000/img/${movie.media[0].src_img}`} alt={movie.media[0].alt_img} />
                        
                        <p className="real">Réalisateur: <strong> {movie.director}</strong></p>
                        <p className="actor">Acteurs: <strong>{movie.actor}</strong></p>
                        <p className="categorie">Genre: <strong>{movie.categories.join(" - ")}</strong></p>
                        <p className="dateReal">Date de réalisation: <strong>{movie.release_date}</strong></p>
                        <p className="timeMovie">Durée: <strong>{movie.time}</strong></p>

                    </article>

                    <p className="titleHoraire">Horaires de séances :</p>
                    <CardTime item={item} />
                    
                    <article className="video">

                        <iframe src={movie.media[0].src_video} title={movie.media[0].alt_video} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </article>

                    <article className="synopsys">
                        <p>Résumé:</p>

                        <strong>{movie.synopsis}</strong>

                    </article>

                    <Link to={"/"}>Retour vers l&apos;accueil</Link>
                   
                </section>
            )}

        </main>
    )
}

export default MovieDetail;