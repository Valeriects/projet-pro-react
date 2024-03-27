
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchMovies } from "../../../store/slices/movie";
import useMenuToggle from "../../../hook/useMenuToggle";

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
                  console.log(res);
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
                console.log(res);
                navigate("/admin/film/:id");
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
            <Link to={"/admin/film"}>Retour à la liste des films</Link>
            <form className="datas" onSubmit={btnUp}>
                {movie && (
                
                    <fieldset>
                        <legend>Données du film n°{ movie?.id }</legend>
                        
                        
                        <label htmlFor="title">Modifier : <span>&quot;{movie?.title}&quot;</span>
                            <input onChange={handleChange} type="text" id="title" name="title" value={movie.title}/>
                        </label>

                       

                        <label htmlFor="categories">Modifier : <span>&quot;{movie?.categories}&quot;</span>
                            <input onChange={handleChange} type="text" id="categories" name="categories" value={movie.categories}/>
                        </label>

                        

                        <label htmlFor="director">Modifier : <span>&quot;{movie?.director}&quot;</span>
                            <input onChange={handleChange} type="text" id="director" name="director" value={movie.director}/>
                        </label>

                        <label htmlFor="actors">Modifier : <span>&quot;{movie?.actors}&quot;</span>
                            <input onChange={handleChange} type="text" id="actors" name="actors" value={movie.actors}/>
                        </label>

                        <label htmlFor="release_date">Modifier : <span>&quot;{movie?.release_date}&quot;</span>
                            <input onChange={handleChange} type="text" id="release_date" name="release_date" value={movie.release_date}/>
                        </label>

                        <label htmlFor="time">Modifier : <span>&quot;{movie?.time}&quot;</span>
                            <input onChange={handleChange} type="text" id="time" name="time" value={movie.time}/>
                        </label>

                        <label htmlFor="synopsis">Modifier : <span>&quot;{movie?.synopsis}&quot;</span>
                            <input onChange={handleChange} type="text" id="synopsis" name="synopsis" value={movie.synopsis}/>
                        </label>

                        {/* <label htmlFor="disabled_access">Modifier : <span>&quot;{movie?.disabled_access}&quot;</span>
                            <input onChange={handleChange} type="text" id="disabled_access" name="disabled_access" value={movie.disabled_access}/>
                        </label>

                        <label htmlFor="infos_cine">Modifier : <span>&quot;{movie?.infos_cine}&quot;</span>
                            <textarea onChange={handleChange} name="infos_cine" id="infos_cine" cols="30" rows="10"></textarea>
                        </label> */}

                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
                )}
            </form>

          

            <button onClick={toggleMsgDelete} ><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></button> 

            {deleteMsgOpen && (
                <article className="msgDelete">
                    <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
 
            <Link to={"/admin/film"}>Retour à la liste des films</Link>
        </main>
    )
}


export default UpDeleteMovie;