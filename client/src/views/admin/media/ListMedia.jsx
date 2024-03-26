import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { fetchMedia } from "../../../store/slices/media";

function TableMedia() {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMedia());
    }, []);

    const { listMedia } = useSelector((state) => state.media);
 

    console.log(listMedia);

    return (
        <main className="table">

            <table>
                <caption>Liste des médias <Link to={"/admin/média/ajout"}>Ajouter un média</Link></caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Actions</th>
                        <th>Alt affiche</th>
                        <th>Src affiche</th>
                        <th>Alt vidéo</th>
                        <th>Src vidéo</th>
                    </tr>
                </thead>

                <tbody>
                    {listMedia.map((item) => (                  
                    <tr key={item.id}>
                        
                        <td>{item.id}</td> 
                        <td className="tdIcone">
                            <Link to={`${item.id}`} ><FontAwesomeIcon icon={faSquarePen} className="iconeTable" />&<FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link> 
                        </td>
                        <td>{item?.alt_img}</td>
                        <td>{item?.src_img}</td>
                        <td>{item?.alt_video}</td>                     
                        <td>{item?.src_video}</td>                     
                    </tr>   
                   ))}
                </tbody>
            </table>
        </main>
    )
}

export default TableMedia;