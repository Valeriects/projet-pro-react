import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { fetchRoles} from "../../../store/slices/role";

function TableRole() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRoles());
    }, []);

    const { list } = useSelector((state) => state.role);
 

    console.log(list);

    return (
        <main className="table">


            <table>
                <caption>Liste des rôles <Link to={"/admin/role/ajout"}>Ajouter un rôle</Link></caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Actions</th>
                        <th>Nom des rôles</th>
                    </tr>
                </thead>

                <tbody>

                    {list.map((item) => (                  
                    <tr key={item.id}>
                        
                        <td>{item.id}</td> 
                        <td className="tdIcone">
                            
                            <Link to={`${item.id}`} ><FontAwesomeIcon icon={faSquarePen} className="iconeTable" />&<FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link> 
                        
                        </td>
                        <td>{item?.name_role}</td>

                    </tr>   
                   ))}
                </tbody>
            </table>
        </main>
    )
}

export default TableRole;