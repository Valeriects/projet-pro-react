
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchMediaMovie } from "../../../store/slices/mediaMovie";
import { fetchMedia } from "../../../store/slices/media.js";
import { fetchMovies } from "../../../store/slices/movie.js";
import useMenuToggle from "../../../hook/useMenuToggle";


function UpDeleteRole() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
 
    const [mediaMovie, setMediaMovie] = useState(null);
    const { listMediaMovie} = useSelector((state) => state.mediaMovie);
    const { listMedia} = useSelector((state) => state.media);
    const { list} = useSelector((state) => state.movie);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(fetchMediaMovie());
        dispatch(fetchMedia());
        dispatch(fetchMovies());
    }, [dispatch]);

    useEffect(() => {
        if (!mediaMovie) {
            setMediaMovie(listMediaMovie.find((mediaMovie) => mediaMovie.id === Number(id)));
        }
    }, [listMediaMovie, id]);


    const handleChange = (e) => {
        setMediaMovie({
            ...mediaMovie,
            [e.target.name]: e.target.value,
        });

        console.log(e.target.value)
    }

    // console.log("mediaMovie :", mediaMovie);

    const btnDelete = async () => {
        try {
            const res = await fetch(`/api/v1/admin/movie-media/${mediaMovie.id}`, {
                method: "DELETE"
            });
            console.log("2222");
  
            if (res.ok) {
                console.log(res);
                navigate("/admin/média-film");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/movie-media/${mediaMovie.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(mediaMovie),
            });

            if (res.ok) {
                console.log(res);
                // navigate(`/admin/média-film/${mediaMovie.id}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!mediaMovie) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link to={"/admin/média-film"}>Retour à la liste des Médias en lien avec les films</Link>
            <form className="datas" onSubmit={btnUp}>
                {mediaMovie && (
                
                    <fieldset>
                        <legend>Données du média lié au film n°{ mediaMovie?.id }</legend>
                        
                        <p>Titre du film: <span>&quot;{mediaMovie?.title}&quot;</span></p>
                        <p>Nom du média: <span>&quot;{mediaMovie?.alt_img}&quot;</span></p>

                        <label htmlFor="movies_id">Modifier l&apos;ID du film {mediaMovie?.title}:
                            {/* <input onChange={(e) => setMediaMovie({...mediaMovie, movies_id: e.target.value})} type="text" id="movies_id" name="movies_id" value={mediaMovie?.movies_id}/> */}
                             <select onChange={handleChange} name="movies_id" id="movies_id">
                                <option value="">Choisir le film</option>
                            
                                {list.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {item.title}</option>
                                    
                                ))}
                            </select>
                        </label>

                        <label htmlFor="media_id">Modifier l&apos;ID du média {mediaMovie?.alt_img}:
                            <select onChange={handleChange} name="media_id" id="media_id">
                                <option value="">Choisir l&apos;affiche</option>
                            
                                {listMedia.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {item.alt_img}</option>
                                    
                                ))}
                            </select>
                            {/* <input onChange={(e) => setMediaMovie({...mediaMovie, media_id: e.target.value})} type="text" id="media_id" name="media_id" value={mediaMovie?.media_id}/> */}
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
                    <p>Voulez-vous vraiment supprimer ce lien entre ce film et ce média ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
            <Link to={"/admin/média-film"}>Retour à la liste des Médias en lien avec les films</Link>
 
        </main>
    )
}


export default UpDeleteRole;