import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { fetchSessions } from "../../../store/slices/session";
import useMenuToggle from "../../../hook/useMenuToggle";

function TableSessions() {
    useMenuToggle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSessions());
    }, []);

    const { list } = useSelector((state) => state.session);
 

    console.log(list);

    return (
        <main className="table">


            <table>
                <caption>Liste des rôles <Link to={"/admin/séance/ajout"}>Ajouter une séance</Link></caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Actions</th>
                        <th>Date de la séance</th>
                        <th>Id du film</th>
                        <th>Id de la salle</th>
                        <th>Langue du film</th>
                        <th>Prix de la séance</th>
                        <th>id de l&apos;horaire</th>
                        <th>Version 2D ou 3D</th>
                    </tr>
                </thead>

                <tbody>

                    {list.map((item) => (                  
                    <tr key={item.id}>
                        
                        <td>{item.id}</td> 
                        <td className="tdIcone">
                            
                            <Link to={`${item.id}`} ><FontAwesomeIcon icon={faSquarePen} className="iconeTable" />&<FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link> 
                        
                        </td>
                        <td>{item?.session_date}</td>
                        <td>{item?.movies_id}</td>
                        <td>{item?.movie_theaters_id}</td>
                        <td>{item?.language}</td>
                        <td>{item?.price}</td>
                        <td>{item?.timetables_id}</td>
                        <td>{item?.version_2D_3D}</td>

                    </tr>   
                   ))}
                </tbody>
            </table>
        </main>
    )
}

export default TableSessions;