
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { fetchUsers } from "../../../store/slices/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

function UpDeleteUser() {
    
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);

    const { listUser } = useSelector((state) => state.user);
    const [user, setUser] = useState();
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    //   async function btnDelete(e, id) {
    //       e.preventDefault();
    
    const btnDelete = async (id) => {
          try {
              const res = await fetchUsers(`/api/v1/admin/user/${id}`, {
                  method: "DELETE"
              });
  
              if (res.ok) {
                  console.log(res);
                  navigate("/admin/membre");

              }
              
          } catch (err) {
              console.log(err);
          }
  
    }
    
    useEffect(() => {
        dispatch(fetchUsers());
        if (!user) {
            setUser(listUser.find((user) => user.id === Number(id)));
        }
    }, [user]);

    console.log(id)
    // console.log("userid", user.id)

    console.log(user);
    console.log("listuser: ",listUser);

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }


    return (
        <main className="deleteUser">
            <form className="datas">
                 <fieldset>
                    <legend>Données du membre n°{ user?.id }</legend>
                       
                    <label htmlFor="lastname">Nom :
                        <input name="lastname" id="lastname" type="text" value={user?.lastname} />
                    </label>
                    <label htmlFor="firstname">Prénom :
                        <input name="firstname" id="firstname" type="text" value={user?.firstname} />
                    
                    </label>
                    <label  htmlFor="email">Email : 
                        <input name="email" id="email" type="email" value={user?.email} />
                    </label>
                    <label  htmlFor="password">Mot de passe : 
                        <input name="password" id="password" type="password" value={user?.lastname} />
                    </label>
                    <label  htmlFor="birthday">Date de naissance : 
                        <input name="birthday" id="birthday" type="date" value={user?.lastname} />
                    </label>
                    <label  htmlFor="created_date">Nom : 
                        <input name="created_date" id="created_date" type="date" value={user?.lastname} />
                    </label>
                    <label  htmlFor="phone">Téléphone : 
                        <input name="phone" id="phone" type="tel" value={user?.lastname} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                    </label>
                    <label  htmlFor="address">Adresse postale : 
                        <input name="address" id="address" type="text" value={user?.lastname} />
                    </label>
                    <label  htmlFor="roles_id">Rôle : 
                        <input name="roles_id" id="roles_id" type="number" value={user?.lastname} />
                    </label>
                    <label  htmlFor="last_connection_date">Date de dernière connexion : 
                        <input name="last_connection_date" id="last_connection_date" type="date" value={user?.lastname} />
                    </label>
                   
                    
                        
                   
                    
                </fieldset>

                <tbody>
                    <tr>
                        {/* <td>{user.lastname}</td>
                        <td>{user.firstname}</td>
                        <td>{user.email}</td> */}
                       
                        
                    </tr>
                </tbody>

            </form>

          

            <button onClick={toggleMsgDelete} ><FontAwesomeIcon icon={faSquarePen} className="iconeTable" /></button> 

            <button onClick={toggleMsgDelete} ><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></button> 

            {deleteMsgOpen && (
               <article>
                    <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
                    <button onClick={btnDelete(user.id)}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
 
        </main>
    )
}



export default UpDeleteUser;