
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchRoles } from "../../../store/slices/role";
import useMenuToggle from "../../../hook/useMenuToggle";

function UpDeleteRole() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
 
    const [role, setRole] = useState(null);

    const { list } = useSelector((state) => state.role);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(fetchRoles());
        if (!role) {
            setRole(list.find((role) => role.id === Number(id)));
        }

    }, [dispatch,list]);


    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/role/${role.id}`, {
                  method: "DELETE"
              });
  
              if (res.ok) {
                  navigate("/admin/role");
              }
              
          } catch (err) {
              console.log(err);
          }
  
    }

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/role/${role.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(role),
            });

            if (res.ok) {
                navigate("/admin/role/:id");
            }
              
        } catch (err) {
            console.log(err);
        }
    }

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!role) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link className="aBack" to={"/admin/role"}>Retour à la liste des rôles</Link>
            <form className="datas" onSubmit={btnUp}>
                {role && (
                
                    <fieldset>
                        <legend>Données du rôle n°{ role?.id }</legend>
                        
                        <p>Nom: <span>&quot;{role?.name_role}&quot;</span></p>

                        <label htmlFor="name_role">Modifier le nom du rôle :
                            <input onChange={(e) => setRole({...role, name_role: e.target.value})} type="text" id="name_role" name="name_role" value={role.name_role}/>
                        </label>
                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
                )}
      

            </form>
          

            <button onClick={toggleMsgDelete} className="btnDelete"><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></button> 

            {deleteMsgOpen && (
               <article className="msgDelete">
                    <p>Voulez-vous vraiment supprimer ce rôle ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
            <Link className="aBack" to={"/admin/role"}>Retour à la liste des rôles</Link>
 
        </main>
    )
}


export default UpDeleteRole;