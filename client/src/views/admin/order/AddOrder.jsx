import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";

function AddOrder() {
    useMenuToggle();
    const navigate = useNavigate();
    const [order, setOrder] = useState("");
    
    const handleChange = (e) => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value
        });
    }


    async function submitAdd(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/v1/admin/order", {
                method: "POST",            
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/réservation");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link to={"/admin/réservation"}>Retour à la liste des réservations</Link>
            <form onSubmit={submitAdd}>
                 <fieldset>
                        <legend>Création des données d&apos;une réservation</legend>
                        
                        <label htmlFor="lastname">Nom :
                            <input onChange={handleChange} type="text" id="lastname" name="lastname" value={order.lastname}/>
                        </label>
                    
                        <label htmlFor="firstname">Prénom :
                            <input onChange={handleChange} type="text" id="firstname" name="firstname" value={order.firstname}/>
                        </label>

                        <label htmlFor="email">Email :
                            <input onChange={handleChange} type="text" id="email" name="email" value={order.email}/>
                        </label>

                        <label htmlFor="name_cb">Nom sur la CB :
                            <input onChange={handleChange} type="text" id="name_cb" name="name_cb" value={order.name_cb}/>
                        </label>

                        <label htmlFor="num_cb">Numéro de la CB :
                            <input onChange={handleChange} type="text" id="num_cb" name="num_cb" value={order.num_cb}/>
                        </label>

                        <label htmlFor="cryptogramme">Cryptogramme :
                            <input onChange={handleChange} type="text" id="cryptogramme" name="cryptogramme" value={order.cryptogramme}/>
                        </label>

                        <label htmlFor="cb_date">Date de la CB :
                            <input onChange={handleChange} type="text" id="cb_date" name="cb_date" value={order.cb_date}/>
                        </label>

                        <label htmlFor="price_order">Total :
                            <input onChange={handleChange} type="text" id="price_order" name="price_order" value={order.price_order}/>
                        </label>

                        <label htmlFor="sessions_id">Id de la séance à réserver :
                            <input onChange={handleChange} type="text" id="sessions_id" name="sessions_id" value={order.sessions_id}/>
                        </label>

                        <label htmlFor="users_id">Id du membre :
                        <input onChange={handleChange} type="text" id="users_id" name="users_id" value={order.users_id} />
                        </label>
                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link to={"/admin/réservation"}>Retour à la liste des réservations</Link>
        </>
    );
}

export default AddOrder;