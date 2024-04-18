import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { convertDate, formattedTime } from "../../../utils/formatDate";
import { fetchCountSeats } from "../../../store/slices/session";
import Order from "./Components/Order";


function Session() {
    const dispatch = useDispatch();

    const { id, sessionId, idTimetable } = useParams();

    const [session, setSession] = useState();
    const [orderOpen, setOrderOpen] = useState(false);

    const defaultTariff = 12.5;
    const [tariff, setTariff] = useState(defaultTariff);
    const [inputValue, setInputValue] = useState("");
    
    const { listCount } = useSelector((state) => state.session);
    
    useEffect(() => {
        async function fetchSession(id, idTimetable) {
            try {
                const response = await fetch(`/api/v1/app/movie/${id}/timetable/${idTimetable}`);
                
                if (response.ok) {
                    const [data] = await response.json();
                    setSession(data);
                    return data;
                }
            } catch (err) {
                console.log(err);
            }
        }
        
        fetchSession(id, idTimetable);
        
        dispatch(fetchCountSeats(sessionId));
    }, [])
 
    function toggleOrder() {
        setOrderOpen(!orderOpen);
    }

    function sumTariff(e) {
        const value = parseFloat(e.target.value, 10);

        setInputValue(value);

        if (!isNaN(value)) {
            setTariff(value * defaultTariff); // Multiplier par le tarif par défaut
        } else {
            setTariff(defaultTariff); // Revenir au tarif par défaut si la valeur est invalide ou vide
        }
    }
    

    return (
        <main className="session">

            <section>

                <h2>Séance du film</h2>
                {session &&
                    
                    <article>
                        <figure>
                            <img src={`http://localhost:9000/img/${session.src_img}`} alt={session.alt_img} />

                            <figcaption>
                                <p>{session.title}</p>
                                <p>{session.director}</p>
                                <p>{session.actor}</p>
                                <p>Durée: {formattedTime(session.time)}</p>
                                <p>{session.version_2D_3D}</p>


                                <p>{session.language}</p>

                            </figcaption>

                        </figure>
                        <div>
                            <p>Cinéma: {session.name_cinema}, {session.address_cine}</p>
                            <p>Date de la séance: {convertDate(session.session_date)}</p>
                            <p>Heure de la séance: {formattedTime(session.hours_timetable)}</p>
    
                            <p>Salle n° {session.name_theater}</p>

                            {listCount[0]?.remaining_places && (
                                <p>Nombre de place restantes: <span>{listCount[0]?.remaining_places}</span> sur {listCount[0]?.total_seats}</p>
                            )}

                            <p>Prix : {tariff.toFixed(2)}€</p>

                            <label htmlFor="multiple">Nombre de places: 
                                <input onChange={sumTariff} id="multiple" name="multiple" type="number" min="1" max="10" />
                            </label>

                        </div>

                        <button className="reservation" onClick={toggleOrder}>CLiquez pour réserver</button>

                
                    </article>
                }

                {orderOpen && (
                    <Order session={session} tariff={tariff} inputValue={inputValue}/>

                )}
            </section>
        </main>
    );
}

export default Session;