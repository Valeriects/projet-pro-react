
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { fetchUsers } from "../../../store/slices/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";

function UpDeleteUser() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
    const { listUser } = useSelector((state) => state.user);
    const [user, setUser] = useState();
    
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }   
    
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
                body: JSON.stringify(user),
            });

            if (res.ok) {
                navigate(`/admin/membre/${user.id}`);

            }
              
        } catch (err) {
            console.log(err);
        }
    }

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!user) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link className="aBack" to={"/admin/membre"}>Retour à la liste des membres</Link>
            <form className="datas" onSubmit={btnUp}>
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

                    
                    <select name="roles_id" id="roles_id" onChange={handleChange}>
                        
                        <option value="">Rôle du membre { user?.roles_id }</option>
                        <option value="2">Membre</option>
                        <option value="1">Admin</option>
                        <option value="5">Manager</option>
                    </select>

                    <button type="submit">
                        <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                    </button>
                    
                </fieldset>

            </form>
          

            <button onClick={toggleMsgDelete} className="btnDelete"><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></button> 

            {deleteMsgOpen && (
               <article className="msgDelete">
                    <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
            <Link className="aBack" to={"/admin/membre"}>Retour à la liste des membres</Link>
        </main>
    )
}



export default UpDeleteUser;