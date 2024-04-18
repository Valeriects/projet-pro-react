import PropTypes from "prop-types";
import { useState, useRef } from "react";

function Order({ session, tariff, inputValue }) {
    const sessionRef = useRef();
    const nbr_seatsRef = useRef();
    const totalRef = useRef();
    const [order, setOrder] = useState({});
    
    const handleChange = (e) => {

        setOrder((prevOrder) => ({
            ...prevOrder,
            [e.target.name]: e.target.value
        }));

    }


    const handleSubmit = async (e) => {
         e.preventDefault();
        try {
            await fetch(`/api/v1/app/order`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });
              
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <form onSubmit={handleSubmit} className="orderForm">
            <fieldset>
                <legend>Votre réservation</legend>
              
                <label htmlFor={"sessions_id"}>
                    <input name={"sessions_id"} id={"sessions_id"} type="hidden" value={session.session_id} ref={sessionRef} readOnly/>
                </label>

                <label htmlFor={"users_id"}>id utilisateur:
                    <input name={"users_id"} id={"users_id"} type="number" onChange={handleChange}/>
                </label>
                <label htmlFor={"lastname"}>Nom:
                    <input name={"lastname"} id={"lastname"} type="text" onChange={handleChange}/>
                </label>
                <label htmlFor={"firstname"}>Prénom:
                    <input name={"firstname"} id={"firstname"} type="text" onChange={handleChange}/>
                </label>

                <label htmlFor={"email"}>Email:
                    <input name={"email"} id={"email"} type="email" onChange={handleChange}/>
                </label>

                <label htmlFor={"nbr_seats_payed"}>Nombre de places:
                    <input name={"nbr_seats_payed"} id={"nbr_seats_payed"} type="number" value={inputValue} ref={nbr_seatsRef} readOnly/>
                </label>
                <label htmlFor={"price_order"}>Total:
                    <input name={"price_order"} id={"price_order"} type="number" value={tariff} ref={totalRef} readOnly/>€
                </label>

                <label htmlFor={"name_cb"}>Nom sur la CB:
                    <input name={"name_cb"} id={"name_cb"} type="text" onChange={handleChange}/>
                </label>

                <label htmlFor={"num_cb"}>Numéro de la CB:
                    <input name={"num_cb"} id={"num_cb"} type="number" value={session.num_cb} onChange={handleChange}/>
                </label>
                <label htmlFor={"cb_date"}>Date de la CB:
                    <input name={"cb_date"} id={"cb_date"} type="date" onChange={handleChange}/>
                </label>
                <label htmlFor={"cryptogramme"}>Cryptogramme:
                    <input name={"cryptogramme"} id={"cryptogramme"} type="number" onChange={handleChange}/>
                </label>

                    
                <button type="submit">Validez</button>
            </fieldset>
        </form>
    )
}

Order.propTypes = {
    session: PropTypes.isRequired,
    tariff: PropTypes.number.isRequired,
    inputValue: PropTypes.number.isRequired,
}

export default Order;