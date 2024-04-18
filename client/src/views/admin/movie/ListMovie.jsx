import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { fetchMovies } from "../../../store/slices/movie";
import useMenuToggle from "../../../hook/useMenuToggle";

function TableMovie() {
    useMenuToggle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovies());
    }, []);

    const { list } = useSelector((state) => state.movie);

    return (
        <main className="table">

            <table>
                <caption>Liste des films <Link to={"/admin/film/ajout"}>Ajouter un film</Link></caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Action</th>
                        <th>Titre</th>
                        <th>Genre</th>
                        <th>Réalisateur</th>
                        <th>Acteurs</th>
                        <th>Description de l&apos;affiche</th>
                        <th>Src affiche</th>
                        <th>Description de la vidéo</th>
                        <th>Src vidéo</th>
                        <th>Date de réalisation</th>
                        <th>Durée</th>
                        <th>Synopsis</th>
                    </tr>
                </thead>

                <tbody>
                    {list.map((item) => (                  
                    <tr key={item.id}>
                        
                        <td>{item.id}</td> 
                        <td className="tdIcone">
                            
                            <Link to={`${item.id}`} ><FontAwesomeIcon icon={faSquarePen} className="iconeTable" />&<FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link> 
                        
                        </td>
                        <td>{item?.title}</td>
                        <td>{item?.categories.join(' - ')}</td>
                        <td>{item?.director}</td>
                        <td>{item?.actor}</td>
                        <td>
                            {item?.media[0]?.alt_img ? (
                                item?.media[0]?.alt_img

                            ) : <Link to={"/admin/média-film"}>associer un média</Link> 
                            }
                            
                        </td>
                        <td>
                            {item?.media[0]?.src_img ? (
                                <>
                                    <img src={`http://localhost:9000/img/${item?.media[0]?.src_img}`} alt={item?.media[0]?.alt_img} />
                                    {item?.media[0]?.src_img}
                                </>

                            ) : (' Pas de données ')
                            } 
                        </td>
                            <td>
                                 {item?.media[0]?.alt_video ? 
                                 ( 
                                item?.media[0]?.alt_video
                                 ) : ("Pas de données") 
                                 } 
                            </td>
                            <td>
                                 {item?.media[0]?.src_video ? (item?.media[0]?.src_video) : ("Pas de données")} 
                            </td>
                        <td>{item?.release_date}</td>
                        <td>{item?.time}</td>
                        <td>{item?.synopsis}</td>

                    </tr>   
                   ))}
                </tbody>
            </table>

            
        </main>
    )
}

export default TableMovie;