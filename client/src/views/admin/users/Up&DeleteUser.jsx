
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { fetchUsers } from "../../../store/slices/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

function UpDeleteUser() {
    
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
    const [roles_id, setRoles_id] = useState("2");

    const radioChange = e => {
        setRoles_id(e.target.value)
    }

    const { listUser } = useSelector((state) => state.user);


    const [user, setUser] = useState();
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(fetchUsers());
        if (!user) {
            setUser(listUser.find((user) => user.id === Number(id)));
        }
    }, []);
    
    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/user/${user.id}`, {
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

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/user/${user.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/membre");

            }
              
        } catch (err) {
            console.log(err);
        }
    }
    console.log(id)

    console.log(user);
    console.log("listuser: ",listUser);

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!user) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link to={"/admin/membre"}>Retour à la liste des membres</Link>
            <form className="datas">
                 <fieldset>
                    <legend>Données du membre n°{ user?.id }</legend>
                       
                    <p>Nom: <span>{user?.lastname}</span></p>
                    <p>Prénom: <span>{user?.firstname}</span></p>
                    <p>Email: <span>{user?.email}</span></p>
                    <p>Mot de passe: <span>{user?.password}</span></p>
                    <p>Date de naissance: <span>{user?.birthday}</span></p>
                    <p>Date de création du compte: <span>{user?.created_date}</span></p>
                    <p>Téléphone: <span>{user?.phone}</span></p>
                    <p>Adresse postale: <span>{user?.address}</span></p>
                    <p>Date de dernière connexion: <span>{user?.last_connection_date}</span></p>

                    
                    <label htmlFor="member">Rôle membre:
                        <input type="radio" name="roles_id" id="member" value="2" checked={roles_id === "2"} onChange={radioChange}/>
                        {/* <input type="text" id="roles_id" name="roles_id" value={user?.roles_id} /> */}
                    </label>
                    <label htmlFor="admin">Rôle admin:
                        <input type="radio" name="roles_id" id="admin" value="1" checked={roles_id === "1"} onChange={radioChange} />
                        {/* <input type="text" id="roles_id" name="roles_id" value={user?.roles_id} /> */}
                    </label>
                        <button onClick={btnUp} >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    <select name="" id=""></select>
                    
                </fieldset>
      

            </form>
          

            <button onClick={toggleMsgDelete} ><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></button> 

            {deleteMsgOpen && (
               <article className="msgDelete">
                    <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
            <Link to={"/admin/membre"}>Retour à la liste des membres</Link>
        </main>
    )
}



export default UpDeleteUser;