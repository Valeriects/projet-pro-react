
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchSessions } from "../../../store/slices/session";
import useMenuToggle from "../../../hook/useMenuToggle";

function UpDeleteSession() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
    const [session, setSession] = useState(null);

    const { list } = useSelector((state) => state.session);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSessions());
        if (!session) {
            setSession(list.find((session) => session.id === Number(id)));
        }
    }, [dispatch,list]);

    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/session-movie/${session.id}`, {
                  method: "DELETE"
              });
  
              if (res.ok) {
                  console.log(res);
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
                console.log(res);
                navigate("/admin/séance/:id");
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
            <Link to={"/admin/séance"}>Retour à la liste des séances</Link>
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
                            <input onChange={(e) => setSession({ ...session, language: e.target.value })} type="text" id="language" name="language" />
                            <input type="radio" name="" id="" />
                        </label>
                        <label htmlFor="movie_theaters_id">Id de la salle :
                            <input onChange={(e) => setSession({...session, movie_theaters_id: e.target.value})} type="text" id="movie_theaters_id" name="movie_theaters_id"/>
                        </label>
                        <label htmlFor="movies_id">Id du film :
                            <input onChange={(e) => setSession({...session, movies_id: e.target.value})} type="text" id="movies_id" name="movies_id"/>
                        </label>
                        <label htmlFor="price">Prix de la séance :
                            <input onChange={(e) => setSession({...session, price: e.target.value})} type="text" id="price" name="price"/>
                        </label>
                        <label htmlFor="session_date">Date de la séance :
                            <input onChange={(e) => setSession({...session, session_date: e.target.value})} type="text" id="session_date" name="session_date"/>
                        </label>
                        <label htmlFor="timetables_id">Id de l&apos;horaire :
                            <input onChange={(e) => setSession({...session, timetables_id: e.target.value})} type="text" id="timetables_id" name="timetables_id"/>
                        </label>
                        <label htmlFor="version_2D_3D">Version 2D ou 3D :
                            <input onChange={(e) => setSession({...session, version_2D_3D: e.target.value})} type="text" id="version_2D_3D" name="version_2D_3D"/>
                        </label>
                        
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
            <Link to={"/admin/séance"}>Retour à la liste des séances</Link>
 
        </main>
    )
}


export default UpDeleteSession;