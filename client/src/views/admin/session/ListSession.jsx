import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { fetchSessions } from "../../../store/slices/session";
import useMenuToggle from "../../../hook/useMenuToggle";
import { convertDate, formattedTime } from "../../../utils/formatDate";

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
                        <th>Film</th>
                        <th>Durée du film</th>
                        <th>Salle</th>
                        <th>Langue du film</th>
                        <th>Prix de la séance</th>
                        <th>Horaire</th>
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
                            <td>{convertDate(item?.session_date)}</td>
                        <td>{item?.title}</td>
                        <td>{formattedTime(item?.time)}</td>
                        <td>{item?.name_theater}</td>
                        <td>{item?.language}</td>
                        <td>{item?.price}€</td>
                        <td>{formattedTime(item?.hours_timetable)}</td>
                        <td>{item?.version_2D_3D}</td>

                    </tr>   
                   ))}
                </tbody>
            </table>
        </main>
    )
}

export default TableSessions;