
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { convertDate, formattedTime } from "../../../utils/formatDate";


function Session() {

    const { id, idSession } = useParams();
    const [session, setSession] = useState();
    
    useEffect(() => {
        
        async function fetchSession(id, idSession) {
            try {
                const response = await fetch(`/api/v1/app/movie/${id}/session/${idSession}`);
                
                if (response.ok) {
                    const [data] = await response.json();
                    console.log("data :", data);
                    setSession(data);
                   return data;
                }
            } catch (err) {
                console.log(err);
            }
        }
        
        fetchSession(id, idSession);
    }, [])
    console.log("session :", session);

    return (
        <main className="session">
            <h2>Séance du film</h2>
            {session &&
                
                <article>
                    <img src={`http://localhost:9000/img/${session.src_img}`} alt={session.alt_img} />
                    <p>{session.title}</p>
                    <p>{session.director}</p>
                    <p>{session.actor}</p>
                    <p>{session.time}</p>
                    <p>{session.version_2D_3D}</p>

                    <p>{formattedTime(session.hours_timetable)}</p>

                    <p>{session.language}</p>
                    <p>{session.name_theater}</p>
                    <p>{session.nbre_seats}</p>
                    <p>{session.price}</p>

                    <p>{convertDate(session.session_date)}</p>

                    <p>{session.name_cinema}</p>
            
                </article>
            }
        </main>
    );
}

export default Session;