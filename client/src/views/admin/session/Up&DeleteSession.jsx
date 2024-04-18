
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchSessions } from "../../../store/slices/session";
import useMenuToggle from "../../../hook/useMenuToggle";

import { fetchMovies } from "../../../store/slices/movie.js";
import { fetchMovieTheaters } from "../../../store/slices/movieTheater.js";
import { fetchTimes } from "../../../store/slices/timetable.js";
import { formattedTime } from "../../../utils/formatDate.js";

function UpDeleteSession() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
    const [session, setSession] = useState(null);

    const { list } = useSelector((state) => state.session);
    const listMovie = useSelector((state) => state.movie.list);
    const listTheater = useSelector((state) => state.movieTheater.list);
    const listTimetable = useSelector((state) => state.timeTable.list);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSessions());
        if (!session) {
            setSession(list.find((session) => session.id === Number(id)));
        }
        dispatch(fetchMovies());
        dispatch(fetchMovieTheaters());
        dispatch(fetchTimes());
    }, [dispatch, list]);
    
    const handleChange = (e) => {
        setSession({
            ...session,
            [e.target.name]: e.target.value
        });
    }

    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/session-movie/${session.id}`, {
                  method: "DELETE"
              });
  
              if (res.ok) {
                  navigate("/admin/séance");
              }
          } catch (err) {
              console.log(err);
          }  
    }

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/session-movie/${session.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(session),
            });

            if (res.ok) {
                navigate("/admin/séance");
            }
        } catch (err) {
            console.log(err);
        }
    }

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!session) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link className="aBack" to={"/admin/séance"}>Retour à la liste des séances</Link>
            <form className="datas" onSubmit={btnUp}>
                {session && (
                
                    <fieldset>
                        <legend>Données de la séance n°{ session?.id }</legend>
                        
                        <p>Langue: <span>&quot;{session?.language}&quot;</span></p>
                        <p>id de la salle: <span>&quot;{session?.movie_theaters_id}&quot;</span></p>
                        <p>id du film: <span>&quot;{session?.movies_id}&quot;</span></p>
                        <p>Prix: <span>&quot;{session?.price}&quot;</span></p>
                        <p>date: <span>&quot;{session?.session_date}&quot;</span></p>
                        <p>id horaire: <span>&quot;{session?.timetables_id}&quot;</span></p>
                        <p>version 2d ou 3D: <span>&quot;{session?.version_2D_3D}&quot;</span></p>

                        <label htmlFor="language">Langue du film :
                            <input onChange={handleChange} type="text" id="language" name="language" />
                        </label>
                        <label htmlFor="movie_theaters_id">Id de la salle :
                            <select onChange={handleChange} name="movie_theaters_id" id="movie_theaters_id">
                                <option value="">Choisir la salle</option>
                            
                                {listTheater.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {item.name_theater}</option>
                                    
                                ))}
                            </select>

                        </label>
                        <label htmlFor="movies_id">Id du film :
                             <select onChange={handleChange} name="movies_id" id="movies_id">
                                <option value="">Choisir le film</option>
                            
                                {listMovie.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {item.title}</option>
                                    
                                ))}
                            </select>
                        </label>
                        <label htmlFor="price">Prix de la séance :
                            <input onChange={handleChange} type="text" id="price" name="price"/>
                        </label>
                        <label htmlFor="session_date">Date de la séance :
                            <input onChange={handleChange} type="date" id="session_date" name="session_date"/>
                        </label>
                        <label htmlFor="timetables_id">Id de l&apos;horaire :
                            <select onChange={handleChange} name="timetables_id" id="timetables_id">
                                <option value="">Choisir l&apos;horaire</option>
                            
                                {listTimetable.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {formattedTime(item.hours_timetable)}</option>
                                    
                                ))}
                            </select>
                        </label>
                        <label htmlFor="version_2D_3D">Version 2D ou 3D :
                            <input onChange={handleChange} type="text" id="version_2D_3D" name="version_2D_3D"/>
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
                    <p>Voulez-vous vraiment supprimer cette séance ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
            <Link className="aBack" to={"/admin/séance"}>Retour à la liste des séances</Link>
 
        </main>
    )
}


export default UpDeleteSession;