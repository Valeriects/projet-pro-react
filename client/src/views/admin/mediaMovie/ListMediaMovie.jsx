import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { fetchMediaMovie } from "../../../store/slices/mediaMovie";
import useMenuToggle from "../../../hook/useMenuToggle";

function TableMediaMovie() {
    useMenuToggle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMediaMovie());
    }, []);

    const { listMediaMovie } = useSelector((state) => state.mediaMovie);
 

    console.log(listMediaMovie);

    return (
        <main className="table">


            <table>
                <caption>Liste des liens entre média et film <Link to={"/admin/média-film/ajout"}>Ajouter un lien entre un film et son média</Link></caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Actions</th>
                        <th>ID du média</th>
                        <th>Nom du média</th>
                        <th>ID du film</th>
                        <th>Nom du film</th>
                    </tr>
                </thead>

                <tbody>

                    {listMediaMovie.map((item) => (                  
                    <tr key={item.id}>
                        
                        <td>{item.id}</td> 
                        <td className="tdIcone">
                            
                            <Link to={`${item.id}`} ><FontAwesomeIcon icon={faSquarePen} className="iconeTable" />&<FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link> 
                        
                        </td>
                        <td>{item?.media_id}</td>
                        <td>
                            <img src={`http://localhost:9000/img/${item?.src_img}`} alt={item?.alt_img} />
                            {item?.alt_img}
                        </td>
                        <td>{item?.movies_id}</td>
                        <td>{item?.title}</td>

                    </tr>   
                   ))}
                </tbody>
            </table>
        </main>
    )
}

export default TableMediaMovie;