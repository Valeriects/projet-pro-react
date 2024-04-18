import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { fetchOrders } from "../../../store/slices/orders";
import useMenuToggle from "../../../hook/useMenuToggle";

function TableOrder() {
    useMenuToggle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    }, []);

    const { list } = useSelector((state) => state.order);

    return (
        <main className="table">

            <table>
                <caption>Liste des réservations</caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Actions</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Nom de la CB</th>
                        <th>Numéro de la CB</th>
                        <th>Cryptogramme</th>
                        <th>Date de la CB</th>
                        <th>Id du membre</th>
                        <th>Date de l&apos;achat</th>
                        <th>Id de la séance</th>
                    </tr>
                </thead>

                <tbody>
                    {list.map((item) => (                  
                    <tr key={item.id}>
                        <td>{item.id}</td> 
                        <td className="tdIcone">
                            <Link to={`${item.id}`} ><FontAwesomeIcon icon={faSquarePen} className="iconeTable" />&<FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></Link> 
                        </td>
                        <td>{item?.lastname}</td>
                        <td>{item?.firstname}</td>
                        <td>{item?.email}</td>
                        <td>{item?.name_cb}</td>
                        <td>{item?.num_cb}</td>
                        <td>{item?.cryptogramme}</td>
                        <td>{item?.cb_date}</td>
                        <td>{item?.users_id}</td>
                        <td>{item?.order_date}</td>
                        <td>{item?.sessions_id}</td>

                    </tr>   
                   ))}
                </tbody>
            </table>
        </main>
    )
}

export default TableOrder;