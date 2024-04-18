import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { fetchMovieTheaters } from "../../../store/slices/movieTheater";
import useMenuToggle from "../../../hook/useMenuToggle";

function TableMovieTheater() {
    useMenuToggle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovieTheaters());
    }, []);

    const { list } = useSelector((state) => state.movieTheater);

    return (
        <main className="table">


            <table>
                <caption>Liste des salles <Link to={"/admin/salle/ajout"}>Ajouter une salle</Link></caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Actions</th>
                        <th>id du cinéma</th>
                        <th>accès handicapé</th>
                        <th>nom de la salle</th>
                        <th>nombre de places</th>
                    </tr>
                </thead>

                <tbody>

                    {list.map((item) => (                  
                    <tr key={item.id}>
                        
                            <td>{item.id}</td> 
                        <td className="tdIcone">
                            
                            <Link to={`${item.id}`} ><FontAwesomeIcon icon={faSquarePen} className="iconeTable" />&<FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link> 
                        
                        </td>
                        <td>{item?.cinemas_id} - {item.name_cinema}</td>
                        <td>{item?.disabled_access}</td>
                        <td>{item?.name_theater}</td>
                        <td>{item?.nbr_seats}</td>
                    </tr>   
                   ))}
                </tbody>
            </table>
        </main>
    )
}

export default TableMovieTheater;