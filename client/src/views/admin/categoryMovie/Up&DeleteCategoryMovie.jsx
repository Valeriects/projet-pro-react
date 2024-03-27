
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchCategoryMovies } from "../../../store/slices/categoryMovie";
import useMenuToggle from "../../../hook/useMenuToggle";

function UpDeleteCategoryMovie() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
 
    const [catMovie, setCatMovie] = useState(null);

    const { list } = useSelector((state) => state.categoryMovie);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(fetchCategoryMovies());
        if (!catMovie) {
            setCatMovie(list.find((catMovie) => catMovie.id === Number(id)));
        }

    }, [dispatch, list]);

    const handleChange = (e) => {
        setCatMovie({
            ...catMovie,
            [e.target.name]: e.target.value
        });
    }


    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/category-movie/${catMovie.id}`, {
                  method: "DELETE"
              });
  
              if (res.ok) {
                  console.log(res);
                  navigate("/admin/catégorie-film");
              }
          } catch (err) {
              console.log(err);
          }
  
    }

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/category-movie/${catMovie.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(catMovie),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/catégorie-film/:id");
            }
              
        } catch (err) {
            console.log(err);
        }
    }

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!catMovie) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link to={"/admin/catégorie-film"}>Retour à la liste des liens entre catégorie et films</Link>
            <form className="datas" onSubmit={btnUp}>
                {catMovie && (
                
                    <fieldset>
                        <legend>Données du lien tentre un film et sa catégorie n°{ catMovie?.id }</legend>
                        
                        
                        <label htmlFor="movies_id">Modifier l&apos;id du film: &quot;<span>{catMovie?.movies_id}</span>&quot;
                            <input onChange={handleChange} type="text" id="movies_id" name="movies_id" value={catMovie.movies_id}/>
                        </label>

                        <label htmlFor="categories_id">Modifier l&apos;id de la catégorie: <span>&quot;{catMovie?.categories_id}&quot;</span>
                            {/* <input  onChange={(e) => setCatMovie({...catMovie, categories_id: e.target.value})} type="text" id="categories_id" name="categories_id" value={catMovie.categories_id}/> */}
                            <input onChange={handleChange} type="text" id="categories_id" name="categories_id" value={catMovie.categories_id}/>
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
            <Link to={"/admin/catégorie-film"}>Retour à la liste des liens entre catégorie et films</Link>
        </main>
    )
}

export default UpDeleteCategoryMovie;