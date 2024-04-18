
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchMovieTheaters } from "../../../store/slices/movieTheater";
import useMenuToggle from "../../../hook/useMenuToggle";
import { fetchCinema } from "../../../store/slices/cinema.js";

function UpDeleteMovieTheater() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
 
    const [movieTheater, setMovieTheater] = useState(null);

    const { list } = useSelector((state) => state.movieTheater);
    const { listCine } = useSelector((state) => state.cinema);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleChange = (e) => {
        setMovieTheater({
            ...movieTheater,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        dispatch(fetchMovieTheaters());
        if (!movieTheater) {
            setMovieTheater(list.find((movieTheater) => movieTheater.id === Number(id)));
        }
        dispatch(fetchCinema());
    }, [dispatch]);


    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/movie-theater/${movieTheater.id}`, {
                  method: "DELETE"
              });
  
              if (res.ok) {
                  navigate("/admin/salle");
              }
              
          } catch (err) {
              console.log(err);
          }
  
    }

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/movie-theater/${movieTheater.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(movieTheater),
            });

            if (res.ok) {
                navigate("/admin/salle/:id");
            }
              
        } catch (err) {
            console.log(err);
        }
    }

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!movieTheater) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link className="aBack" to={"/admin/salle"}>Retour à la liste des salles</Link>
            <form className="datas" onSubmit={btnUp}>
                {movieTheater && (
                
                    <fieldset>
                        <legend>Données du salle n°{ movieTheater?.id }</legend>
                        
                        <p>Nom du cinéma: <span>&quot;{movieTheater?.cinemas_id} - {movieTheater?.name_cinema}&quot;</span></p>
                        <p>accès handicapé: <span>&quot;{movieTheater?.disabled_access}&quot;</span></p>
                        <p>Nom de la salle: <span>&quot;{movieTheater?.name_theater}&quot;</span></p>
                        <p>Nombre de places: <span>&quot;{movieTheater?.nbr_seats}&quot;</span></p>

                        <label htmlFor="cinemas_id">Nom du cinéma :
                            <select onChange={handleChange} name="cinemas_id" id="cinemas_id">
                                <option value="">Choisir le cinéma</option>
                            
                                {listCine.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {item.name_cinema}</option>
                                    
                                ))}
                            </select>
                        </label>
                        <label htmlFor="disabled_access">accès handicapé :
                            <input onChange={handleChange} type="text" id="disabled_access" name="disabled_access"/>
                        </label>
                        <label htmlFor="name_theater">nom de la salle :
                            <input onChange={handleChange} type="text" id="name_theater" name="name_theater"/>
                        </label>
                        <label htmlFor="nbr_seats">nombre de places :
                            <input onChange={handleChange} type="text" id="nbr_seats" name="nbr_seats"/>
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
                    <p>Voulez-vous vraiment supprimer cette salle ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
            <Link className="aBack" to={"/admin/salle"}>Retour à la liste des salles</Link>
 
        </main>
    )
}


export default UpDeleteMovieTheater;