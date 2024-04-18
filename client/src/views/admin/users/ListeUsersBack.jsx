import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";


import { fetchUsers } from "../../../store/slices/user";
import useMenuToggle from "../../../hook/useMenuToggle";
import {convertDate, convertTime} from "../../../utils/formatDate.js";
function ListUsers() {
    useMenuToggle();
    const dispatch = useDispatch();
    const { listUser } = useSelector((state) => state.user);
   

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);


    return (

        <main className="table">

            <table>
                <caption>Liste des membres de votre site web</caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>actions</th>
                        <th>dernière connexion</th>
                        <th>role</th>
                        <th>prénom</th>
                        <th>nom</th>
                        <th>date de naissance</th>
                        <th>email</th>
                        <th>téléphone</th>
                        <th>adresse postale</th>
                        <th>date de création</th>
                    </tr>
                </thead>

                <tbody>
                    {listUser.map((item) => 
                              
                        //je n'affiche pas l'utilisateur avec le role de l'admin
                        item.roles_id !== 1 && (
                            
                        <tr key={item.id}>
                            
                            <td>{item.id}</td>
                            <td className="tdIcone">
                                <Link to={`${item.id}`} ><FontAwesomeIcon icon={faSquarePen} className="iconeTable" />&<FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link>  
                            </td>
                                <td>{convertDate(item.last_connection_date)} à {convertTime(item.last_connection_date)}</td>
                            <td>{item.roles_id}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{convertDate(item.birthday)}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{convertDate(item.created_date)}</td>

                        </tr>   
      
            ))}
                </tbody>

                {/* <tfoot><tr><td></td></tr></tfoot> */}
            </table>

        </main>

    )

}

export default ListUsers;