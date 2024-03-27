import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { fetchCategory } from "../../../store/slices/category";
import useMenuToggle from "../../../hook/useMenuToggle";

function TableCategories() {
    useMenuToggle();
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategory());
    }, []);

    const { listCategory } = useSelector((state) => state.category);
 

    console.log(listCategory);

    return (
        <main className="table">


            <table>
                <caption>Liste des catégories <Link to={"/admin/categorie/ajout"}>Ajouter une catégorie</Link></caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Actions</th>
                        <th>Nom</th>
                    </tr>
                </thead>

                <tbody>

                    {listCategory.map((item) => (                  
                    <tr key={item.id}>
                        
                        <td>{item.id}</td> 
                        <td className="tdIcone">
                            
                            <Link to={`${item.id}`} ><FontAwesomeIcon icon={faSquarePen} className="iconeTable" />&<FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link> 
                        
                        </td>
                        <td>{item?.name_cat}</td>

                    </tr>   
                   ))}
                </tbody>
            </table>
        </main>
    )
}

export default TableCategories;