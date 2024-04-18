import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { fetchTimes } from "../../../store/slices/timetable";
import useMenuToggle from "../../../hook/useMenuToggle";

function TableTimeTables() {
    useMenuToggle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTimes());
    }, []);

    const { list } = useSelector((state) => state.timeTable);

    return (
        <main className="table">
            <table>
                <caption>Liste des horaires <Link to={"/admin/horaire/ajout"}>Ajouter un horaire</Link></caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Actions</th>
                        <th>Horaires</th>
                    </tr>
                </thead>

                <tbody>

                    {list.map((item) => (                  
                    <tr key={item.id}>
                        
                        <td>{item.id}</td> 
                        <td className="tdIcone">
                            
                            <Link to={`${item.id}`} ><FontAwesomeIcon icon={faSquarePen} className="iconeTable" />&<FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link> 
                        
                        </td>
                        <td>{item?.hours_timetable}</td>

                    </tr>   
                   ))}
                </tbody>
            </table>
        </main>
    )
}

export default TableTimeTables;