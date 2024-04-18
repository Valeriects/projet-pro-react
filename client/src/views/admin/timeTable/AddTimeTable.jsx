import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";

function AddTimeTable() {
    useMenuToggle();
    const navigate = useNavigate();
    const [timeTable, settimeTable] = useState("");
    


    async function submitAdd(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/v1/admin/timetable", {
                method: "POST",            
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(timeTable),
            });

            if (res.ok) {
                navigate("/admin/horaire");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link className="aBack" to={"/admin/horaire"}>Retour à la liste des horaires</Link>
            <form onSubmit={submitAdd}>
                 <fieldset>
                        <legend>Création de l&apos;horaire</legend>
                     

                        <label htmlFor="hours_timetable">Nouvel horaire:
                            <input onChange={(e) => settimeTable({...timeTable, hours_timetable: e.target.value})} type="time" id="hours_timetable" name="hours_timetable"/>
                        </label>
                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link className="aBack" to={"/admin/horaire"}>Retour à la liste des horaires</Link>
        </>
    );
}

export default AddTimeTable;