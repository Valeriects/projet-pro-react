// import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
function TableCategories() {
    const navigate = useNavigate();
    const { list } = useSelector((state) => state.category);
    
    async function deleteCategory(e, id) {
            e.preventDefault();
        try {
            const response = await fetch(`/api/v1/category/delete/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                navigate('/admin');
            }

        } catch (err) {
            console.log(err);
        }
    }

    console.log(list);
    return (
            <table>
                <caption>Liste des catégories <Link to={"/admin/ajout-categorie"}>Ajouter une catégorie</Link></caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Actions</th>
                        <th>Nom</th>
                    </tr>
                </thead>

                <tbody>
                    {list.map((item) => (

                        <tr key={item?.id}>
                            
                            <td>{item?.id}</td>
                            <td className="tdIcone">
                                <Link to={`/admin/modifier-categorie/${item?.id}`}><FontAwesomeIcon icon={faSquarePen} 
                                    className="iconeTable" /></Link>
                                
                                {/* <Link to={`/admin/supprimer-categorie/${item?.id}`}><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link> */}
                                <button type="submit" onClick={(e) =>deleteCategory(e,item.id)}><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></button>
                                {/* <button type="submit" ><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></button> */}
                                {/* <Link to={`/delete/${item.id}`}><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link> */}
                            </td>
                            <td>{item?.cat_name}</td>

                        </tr>   
                    ))}
                </tbody>
            </table>
    )
}

export default TableCategories;