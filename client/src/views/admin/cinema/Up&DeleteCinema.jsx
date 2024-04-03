
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchCinema } from "../../../store/slices/cinema";
import useMenuToggle from "../../../hook/useMenuToggle";

function UpDeleteCinema() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
 
    const [cine, setCine] = useState(null);

    const { listCine } = useSelector((state) => state.cinema);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCinema());
        if (!cine) {
            setCine(listCine.find((cine) => cine.id === Number(id)));
        }

    }, [dispatch, listCine]);

    const handleChange = (e) => {
        setCine({
            ...cine,
            [e.target.name]: e.target.value
        });
    }


    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/cinema/${cine.id}`, {
                  method: "DELETE"
              });
  
              if (res.ok) {
                  console.log(res);
                  navigate("/admin/cinéma");
              }
              
          } catch (err) {
              console.log(err);
          }
  
    }

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/cinema/${cine.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(cine),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/cinema/:id");
            }
              
        } catch (err) {
            console.log(err);
        }
    }

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!cine) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link to={"/admin/cinéma"}>Retour à la liste des cinémas</Link>
            <form className="datas" onSubmit={btnUp}>
                {cine && (
                
                    <fieldset>
                        <legend>Données du cinéma n°{ cine?.id }</legend>
                        
                        
                        <label htmlFor="name_cinema">Modifier : <span>&quot;{cine?.name_cinema}&quot;</span>
                            <input onChange={handleChange} type="text" id="name_cinema" name="name_cinema" value={cine.name_cinema}/>
                        </label>

                       

                        <label htmlFor="email_cine">Modifier : <span>&quot;{cine?.email_cine}&quot;</span>
                            <input onChange={handleChange} type="email" id="email_cine" name="email_cine" value={cine.email_cine}/>
                        </label>

                        

                        <label htmlFor="address_cine">Modifier : <span>&quot;{cine?.address_cine}&quot;</span>
                            <input onChange={handleChange} type="text" id="address_cine" name="address_cine" value={cine.address_cine}/>
                        </label>

                        <label htmlFor="city">Modifier : <span>&quot;{cine?.city}&quot;</span>
                            <input onChange={handleChange} type="text" id="city" name="city" value={cine.city}/>
                        </label>

                        <label htmlFor="phone_cine">Modifier : <span>&quot;{cine?.phone_cine}&quot;</span>
                            <input onChange={handleChange} type="tel" id="phone_cine" name="phone_cine" value={cine.phone_cine}/>
                        </label>

                        <label htmlFor="manager">Modifier : <span>&quot;{cine?.manager}&quot;</span>
                            <input onChange={handleChange} type="text" id="manager" name="manager" value={cine.manager}/>
                        </label>

                        <label htmlFor="nbr_theater">Modifier : <span>&quot;{cine?.nbr_theater}&quot;</span>
                            <input onChange={handleChange} type="number" id="nbr_theater" name="nbr_theater" value={cine.nbr_theater}/>
                        </label>

                        <label htmlFor="disabled_access">Modifier : <span>&quot;{cine?.disabled_access}&quot;</span>
                            <input onChange={handleChange} type="text" id="disabled_access" name="disabled_access" value={cine.disabled_access}/>
                        </label>

                        <label htmlFor="infos_cine">Modifier : <span>&quot;{cine?.infos_cine}&quot;</span>
                            <textarea onChange={handleChange} name="infos_cine" id="infos_cine" cols="30" rows="10"></textarea>
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
                    <p>Voulez-vous vraiment supprimer ce cinéma ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
 
            <Link to={"/admin/cinéma"}>Retour à la liste des cinémas</Link>
        </main>
    )
}


export default UpDeleteCinema;