
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchOrders } from "../../../store/slices/orders";
import useMenuToggle from "../../../hook/useMenuToggle";

function UpDeleteOrder() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
 
    const [order, setOrder] = useState(null);

    const { list } = useSelector((state) => state.order);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(fetchOrders());
        if (!order) {
            setOrder(list.find((order) => order.id === Number(id)));
        }

    }, [dispatch, list]);

    const handleChange = (e) => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value
        });
    }


    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/order/${order.id}`, {
                  method: "DELETE"
              });
  
              if (res.ok) {
                  navigate("/admin/réservation");
              }
              
          } catch (err) {
              console.log(err);
          }
  
    }

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/order/${order.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });

            if (res.ok) {
                navigate("/admin/réservation/:id");
            }
              
        } catch (err) {
            console.log(err);
        }
    }

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!order) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link className="aBack" to={"/admin/réservation"}>Retour à la liste des réservations</Link>
            <form className="datas" onSubmit={btnUp}>
                {order && (
                
                    <fieldset>
                        <legend>Données du réservation n°{ order?.id }</legend>
                        <label htmlFor={"sessions_id"}>id de la séance : <span>&quot;{order?.sessions_id}&quot;</span>
                            <input name={"sessions_id"} id={"sessions_id"} type="hidden" value={order.session_id}/>
                        </label>

                        <label htmlFor={"users_id"}>id utilisateur: <span>&quot;{order?.users_id}&quot;</span>
                            <input name={"users_id"} id={"users_id"} type="number" onChange={handleChange}/>
                        </label>
                                
                        <label htmlFor="lastname">Nom: <span>&quot;{order?.lastname}&quot;</span>
                            <input onChange={handleChange} type="text" id="lastname" name="lastname" value={order.lastname}/>
                        </label>

                        <label htmlFor="firstname">Prénom: <span>&quot;{order?.firstname}&quot;</span>
                            <input onChange={handleChange} type="text" id="firstname" name="firstname" value={order.firstname}/>
                        </label>

                        <label htmlFor="email">Email: <span>&quot;{order?.email}&quot;</span>
                            <input onChange={handleChange} type="text" id="email" name="email" value={order.email}/>
                        </label>

                        <label htmlFor="name_cb">Nom sur la CB: <span>&quot;{order?.name_cb}&quot;</span>
                            <input onChange={handleChange} type="text" id="name_cb" name="name_cb" value={order.name_cb}/>
                        </label>

                        <label htmlFor="num_cb">Numéro de la CB: <span>&quot;{order?.num_cb}&quot;</span>
                            <input onChange={handleChange} type="text" id="num_cb" name="num_cb" value={order.num_cb}/>
                        </label>

                        <label htmlFor="cryptogramme">Cryptogramme: <span>&quot;{order?.cryptogramme}&quot;</span>
                            <input onChange={handleChange} type="text" id="cryptogramme" name="cryptogramme" value={order.cryptogramme}/>
                        </label>

                        <label htmlFor="cb_date">Date de la CB: <span>&quot;{order?.cb_date}&quot;</span>
                            <input onChange={handleChange} type="date" id="cb_date" name="cb_date" value={order.cb_date}/>
                        </label>

                        <label htmlFor="order_date">Modifier : <span>&quot;{order?.order_date}&quot;</span>
                            <input onChange={handleChange} type="text" id="order_date" name="order_date" value={order.order_date}/>
                        </label>

                        <label htmlFor="price_order">Total: <span>&quot;{order?.price_order}&quot;</span>
                            <input onChange={handleChange} type="text" id="price_order" name="price_order" value={order.price_order}/>
                        </label>

                        <label htmlFor="nbr_seats_payed">Nombre de places: <span>&quot;{order?.nbr_seats_payed}&quot;</span>
                            <input onChange={handleChange} type="text" id="nbr_seats_payed" name="nbr_seats_payed" value={order.nbr_seats_payed}/>
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
                    <p>Voulez-vous vraiment supprimer cette réservation ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
 
            <Link className="aBack" to={"/admin/réservation"}>Retour à la liste des réservations</Link>
        </main>
    )
}


export default UpDeleteOrder;