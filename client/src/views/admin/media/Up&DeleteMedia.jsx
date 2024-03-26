
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchMedia } from "../../../store/slices/media";

function UpDeleteMedia() {
    
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
 
    const [media, setMedia] = useState(null);

    const { listMedia } = useSelector((state) => state.media);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(fetchMedia());
        if (!media) {
            setMedia(listMedia.find((media) => media.id === Number(id)));
        }

    }, [dispatch, listMedia]);

    const handleChange = (e) => {
        setMedia({
            ...media,
            [e.target.name]: e.target.value
        });
    }


    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/cinema/${media.id}`, {
                  method: "DELETE"
              });
  
              if (res.ok) {
                  console.log(res);
                  navigate("/admin/média");
              }
              
          } catch (err) {
              console.log(err);
          }
  
    }

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/media/${media.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(media),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/média/:id");
            }
              
        } catch (err) {
            console.log(err);
        }
    }

    function toggleMsgDelete() {
        setDeleteMsgOpen(!deleteMsgOpen);
    }

    if (!media) {
        return <div>Chargement des données en cours...</div>;
    }

    return (
        <main className="detail">
            <Link to={"/admin/média"}>Retour à la liste des médias</Link>
            <form className="datas" onSubmit={btnUp} encType="multipart/form-data">
                {media && (
                
                    <fieldset>
                        <legend>Données du cinéma n°{ media?.id }</legend>
                        
                        
                        <label htmlFor="src_img">Modifier : &quot;<span>{media?.src_img}</span>&quot;
                            <input onChange={handleChange} type="file" id="src_img" name="src_img"/>
                            {/* <input onChange={handleChange} type="text" id="src_img" name="src_img" value={media.src_img}/> */}
                        </label>

                       

                        <label htmlFor="alt_img">Modifier : <span>&quot;{media?.alt_img}&quot;</span>
                            <input onChange={handleChange} type="text" id="alt_img" name="alt_img" value={media.alt_img}/>
                        </label>

                        

                        <label htmlFor="src_video">Modifier : <span>&quot;{media?.src_video}&quot;</span>
                            <input onChange={handleChange} type="text" id="src_video" name="src_video" value={media.src_video}/>
                        </label>

                        <label htmlFor="alt_video">Modifier : <span>&quot;{media?.alt_video}&quot;</span>
                            <input onChange={handleChange} type="text" id="alt_video" name="alt_video" value={media.alt_video}/>
                        </label>
                        

                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
                )}

            </form>
          

            <button onClick={toggleMsgDelete} ><FontAwesomeIcon icon={faTrashCan} className="iconeTable" /></button> 

            {deleteMsgOpen && (
               <article className="msgDelete">
                    <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
            <Link to={"/admin/média"}>Retour à la liste des médias</Link>
        </main>
    )
}

export default UpDeleteMedia;