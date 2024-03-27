
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchCategory } from "../../../store/slices/category";
import useMenuToggle from "../../../hook/useMenuToggle";

function UpDeleteCategory() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
 
    const [category, setCategory] = useState(null);

    const { listCategory } = useSelector((state) => state.category);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(fetchCategory());
        if (!category) {
            setCategory(listCategory.find((category) => category.id === Number(id)));
        }

    }, [dispatch,listCategory]);


    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/category/${category.id}`, {
                  method: "DELETE"
              });
  
              if (res.ok) {
                  console.log(res);
                  navigate("/admin/categorie");
              }
              
          } catch (err) {
              console.log(err);
          }
  
    }

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/category/${category.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({name_cat : category.name_cat}),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/categorie/:id");
            }
              
        } catch (err) {
            console.log(err);
        }
    }

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!category) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link to={"/admin/categorie"}>Retour à la liste des catégories</Link>
            <form className="datas" onSubmit={btnUp}>
                {category && (
                
                    <fieldset>
                        <legend>Données de la catégorie n°{ category?.id }</legend>
                        
                        <p>Nom: <span>&quot;{category?.name_cat}&quot;</span></p>

                        <label htmlFor="name_cat">Modifier le nom :
                            <input onChange={(e) => setCategory({...category, name_cat: e.target.value})} type="text" id="name_cat" name="name_cat" value={category.name_cat}/>
                        </label>
                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
                )}
      

            </form>
          

            <button onClick={toggleMsgDelete} ><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></button> 

            {deleteMsgOpen && (
               <article className="msgDelete">
                    <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
            <Link to={"/admin/categorie"}>Retour à la liste des catégories</Link>
 
        </main>
    )
}


export default UpDeleteCategory;