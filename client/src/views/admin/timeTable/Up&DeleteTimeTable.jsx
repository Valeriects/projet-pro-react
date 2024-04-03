
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchTimes } from "../../../store/slices/timetable";
import useMenuToggle from "../../../hook/useMenuToggle";

function UpDeleteTimeTable() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
 
    const [timeTable, setTimeTable] = useState(null);

    const { list } = useSelector((state) => state.timeTable);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(fetchTimes());
        if (!timeTable) {
            setTimeTable(list.find((timeTable) => timeTable.id === Number(id)));
        }

    }, [dispatch, list]);


    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/timetable/${timeTable.id}`, {
                  method: "DELETE"
              });
  
              if (res.ok) {
                  console.log(res);
                  navigate("/admin/horaire");
              }
              
          } catch (err) {
              console.log(err);
          }
  
    }

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/timetable/${timeTable.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(timeTable),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/horaire/:id");
            }
              
        } catch (err) {
            console.log(err);
        }
    }

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!timeTable) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link to={"/admin/horaire"}>Retour à la liste des horaires</Link>
            <form className="datas" onSubmit={btnUp}>
                {timeTable && (
                
                    <fieldset>
                        <legend>Données de l&apos;horaire n°{ timeTable?.id }</legend>
                        
                        <p>Horaire à modifier: <span>&quot;{timeTable?.hours_timetable}&quot;</span></p>

                        <label htmlFor="hours_timetable">Modifier le nom :
                            <input onChange={(e) => setTimeTable({...timeTable, hours_timetable: e.target.value})} type="time" id="hours_timetable" name="hours_timetable" value={timeTable.hours_timetable}/>
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
                    <p>Voulez-vous vraiment supprimer cet horaire ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
            <Link to={"/admin/horaire"}>Retour à la liste des horaires</Link>
 
        </main>
    )
}


export default UpDeleteTimeTable;