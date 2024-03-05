import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";


import { fetchUsers } from "../../../store/slices/user";
// import CardMsgDelete from "./CardMsgDelete";
// import convertDate from "../../../utils/formatDate.js";
function ListUsers() {
    const dispatch = useDispatch();
    const { listUser } = useSelector((state) => state.user);
    // const [newListUser, setNewListUser] = useState(listUser);

    // const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);

    // async function btnDelete(e, id) {
    //     e.preventDefault();
    //     try {
    //         const res = await fetchUsers(`/api/v1/admin/user/${id}`, {
    //             method: "DELETE"
    //         });

    //         if (res.ok) {
    //             console.log(res);
    //         }
            
    //     } catch (err) {
    //         console.log(err);
    //     }

    // }

    // function toggleMsgDelete() {
    //     setDeleteMsgOpen(!deleteMsgOpen);
    // }

    useEffect(() => {
        dispatch(fetchUsers());
        // setNewListUser(listUser);
    }, []);
  

    console.log(listUser);

    return (

        <main id="membre" className="table">

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
                        <th>mot de passe</th>
                        <th>date de création</th>
                    </tr>
                </thead>

                <tbody>
                    {listUser.map((item) => 
                              
                        //je n'affiche pas l'utilisateur avec le role de l'admin
                        item.roles_id !== 1 && (
                            
                        <tr key={item.id}>
                            {/* {console.log(convertDate(item.last_connection_date))} */}
                            
                            <td>{item.id}</td>
                            <td className="tdIcone">
                                <Link to={`/modify/${item.id}`}><FontAwesomeIcon icon={faSquarePen} className="iconeTable" /></Link>
                                    <Link to={`suppression/${item.id}`} ><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link>  
                                    {/* <button onClick={toggleMsgDelete} ><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></button>   */}
                            {/* { (deleteMsgOpen && item.id) && (
                                        <CardMsgDelete key={item.id} msg={item} />
                                    // <article>
                                    //     <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
                                    //     <button onClick={(e)=>btnDelete(e, item?.id)}>OUI</button>
                                    //     <button onClick={toggleMsgDelete}>NON</button>
                                    // </article>
                            )} */}
                               
                            </td>
                            <td>{item.last_connection_date}</td>
                            <td>{item.roles_id}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.birthday}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{item.password}</td>
                            <td>{item.created_date}</td>

                        </tr>   

                            
    
                            
      
            ))}
                </tbody>

                {/* <tfoot><tr><td></td></tr></tfoot> */}
            </table>

        </main>

    )

}

export default ListUsers;