
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchMovies } from "../../../store/slices/movie";
import useMenuToggle from "../../../hook/useMenuToggle";
import { convertDate } from "../../../utils/formatDate.js";

function UpDeleteMovie() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
 
    const [movie, setMovie] = useState(null);

    const { list } = useSelector((state) => state.movie);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(fetchMovies());
        if (!movie) {
            setMovie(list.find((movie) => movie.id === Number(id)));
        }

    }, [dispatch, list]);

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }


    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/movie/${movie.id}`, {
                  method: "DELETE"
              });
  
              if (res.ok) {
                  navigate("/admin/film");
              }
              
          } catch (err) {
              console.log(err);
          }
  
    }

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/movie/${movie.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(movie),
            });

            if (res.ok) {
                window.location.href = `/admin/film/${movie.id}`;
            }
              
        } catch (err) {
            console.log(err);
        }
    }

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!movie) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link className="aBack" to={"/admin/film"}>Retour à la liste des films</Link>
            <form className="datas" onSubmit={btnUp}>
                {movie && (
                
                    <fieldset>
                        <legend>Données du film n°{ movie?.id }</legend>
                        
                        
                        <label htmlFor="title">Titre : <span>&quot;{movie?.title}&quot;</span>
                            <input onChange={handleChange} type="text" id="title" name="title" value={movie.title}/>
                        </label>

                        <label htmlFor="director">Réalisateur : <span>&quot;{movie?.director}&quot;</span>
                            <input onChange={handleChange} type="text" id="director" name="director" value={movie.director}/>
                        </label>

                        <label htmlFor="actor">3 acteurs principaux :<span>&quot;{movie?.actor}&quot;</span>
                            <input onChange={handleChange} type="text" id="actor" name="actor" value={movie.actor}/>
                        </label>

                        <label htmlFor="release_date">Date de réalisation : <span>&quot;{convertDate(movie?.release_date)}&quot;</span>
                            <input onChange={handleChange} type="date" id="release_date" name="release_date" value={movie.release_date}/>
                        </label>

                        <label htmlFor="time">Durée : <span>&quot;{movie?.time}&quot;</span>
                            <input onChange={handleChange} type="time" id="time" name="time" value={movie.time}/>
                        </label>

                        <label htmlFor="synopsis">Synopsis : <span>&quot;{movie?.synopsis}&quot;</span>
                            <textarea onChange={handleChange} name="synopsis" id="synopsis" cols="50" rows="30"></textarea>
                        </label>

                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
                )}
            </form>

          

            <button onClick={toggleMsgDelete} className="btnDelete"><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></button> 

            {deleteMsgOpen && (
                <article className="msgDelete">
                    <p>Voulez-vous vraiment supprimer ce film ? Si oui, alors il faudra d&apos;abord surrpimer le lien entre le film et son média : 
                        <Link to={"/admin/média-film"}>média-film</Link>.
                    </p>
                    
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
 
            <Link className="aBack" to={"/admin/film"}>Retour à la liste des films</Link>
        </main>
    )
}


export default UpDeleteMovie;