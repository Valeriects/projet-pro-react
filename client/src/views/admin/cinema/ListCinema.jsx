import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { fetchCinema } from "../../../store/slices/cinema";
import useMenuToggle from "../../../hook/useMenuToggle";

function TableCinema() {
    useMenuToggle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCinema());
    }, []);

    const { listCine } = useSelector((state) => state.cinema);

    return (
        <main className="table">

            <table>
                <caption>Liste des cinémas <Link to={"/admin/cinéma/ajout"}>Ajouter un cinema</Link></caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Actions</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Adresse</th>
                        <th>Ville</th>
                        <th>Téléphone</th>
                        <th>Manager</th>
                        <th>Nombre de salles</th>
                        <th>Accés handicapé</th>
                        <th>Infos</th>
                    </tr>
                </thead>

                <tbody>

                    {listCine.map((item) => (                  
                    <tr key={item.id}>
                        
                        <td>{item.id}</td> 
                        <td className="tdIcone">
                            
                            <Link to={`${item.id}`} ><FontAwesomeIcon icon={faSquarePen} className="iconeTable" />&<FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link> 
                        
                        </td>
                        <td>{item?.name_cinema}</td>
                        <td>{item?.email_cine}</td>
                        <td>{item?.address_cine}</td>
                        <td>{item?.city}</td>
                        <td>{item?.phone_cine}</td>
                        <td>{item?.manager}</td>
                        <td>{item?.nbr_theater}</td>
                        <td>{item?.disabled_access}</td>
                        <td>{item?.infos_cine}</td>

                    </tr>   
                   ))}
                </tbody>
            </table>
        </main>
    )
}

export default TableCinema;