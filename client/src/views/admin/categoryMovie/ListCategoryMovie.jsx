import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { fetchCategoryMovies } from "../../../store/slices/categoryMovie";
import useMenuToggle from "../../../hook/useMenuToggle";

function TableCategoryMovie() {
    useMenuToggle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoryMovies());
    }, []);

    const { list } = useSelector((state) => state.categoryMovie);
 

    console.log(list);

    return (
        <main className="table">

            <table>
                <caption>Liste des catégories <Link to={"/admin/catégorie-film/ajout"}>Ajouter un lien entre un film et une catégorie</Link></caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Actions</th>
                        <th>Id du film</th>
                        <th>Titre du film</th>
                        <th>Id de la catégorie</th>
                        <th>Nom de la catégorie</th>
                    </tr>
                </thead>

                <tbody>
                    {list.map((item) => (                  
                    <tr key={item.id}>
                        
                        <td>{item.id}</td> 
                        <td className="tdIcone">
                            <Link to={`${item.id}`} ><FontAwesomeIcon icon={faSquarePen} className="iconeTable" />&<FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link> 
                        </td>
                        <td>{item?.movies_id}</td>
                        <td>{item?.title}</td>
                        <td>{item?.categories_id}</td>                     
                        <td>{item?.name_cat}</td>                     
                    </tr>   
                   ))}
                </tbody>
            </table>
        </main>
    )
}

export default TableCategoryMovie;