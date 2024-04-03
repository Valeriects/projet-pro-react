
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { fetchMedia } from "../../../store/slices/media";
import useMenuToggle from "../../../hook/useMenuToggle";

function UpDeleteMedia() {
    useMenuToggle();
    const { id } = useParams();
    const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
 
    const [media, setMedia] = useState();
    // const [media, setMedia] = useState({
    //     src_img: media?.src_img,
    //     alt_img: media?.alt_img,
    //     src_video: media?.src_video,
    //     alt_video: media?.alt_video,

    // });

    const { listMedia } = useSelector((state) => state.media);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
 
    
    useEffect(() => {
        dispatch(fetchMedia());
        if (!media && listMedia.length > 0) {
            setMedia(listMedia.find((media) => media.id === Number(id)));
        }
        console.log("media :" , media)
        
    }, [dispatch, media]);
    // }, [dispatch, listMedia]);

    console.log("media.src_img :" , media?.src_img)
    console.log("media.src_video :" , media?.src_video)

    // const handleChange = (e) => {
    //     setMedia({
    //         ...media,
    //         [e.target.name]: e.target.value
    //     });
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "src_img" ? e.target.files[0] : value;
    
        console.log("name :", name);
        setMedia({
            ...media,
            [name]: newValue
        });
    }

    const btnDelete = async () => {
          try {
              const res = await fetch(`/api/v1/admin/media/${media.id}`, {
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

    const btnUp = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('src_img', media.src_img);
            formData.append('alt_img', media.alt_img);
            formData.append('src_video', media.src_video);
            formData.append('alt_video', media.alt_video);

            await fetch(`/api/v1/admin/media/${media.id}`, {
                method: "PATCH",
                body: formData,
            });
              
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
                        
                        {/* todo afficher le nom du fichier au chargement de la page */}
                        <label htmlFor="src_img">Modifier le fichier : &quot;<span>{
                            (btnUp && media.src_img.name) ?
                                media?.src_img && media.src_img.name
                                : media?.src_img 
                            // media?.src_img && media.src_img.name
                        }</span>&quot;
                        {/* <label htmlFor="src_img">Modifier le nom du fichier : &quot;<span>{media?.src_img}</span>&quot; */}
                            <input onChange={handleChange} type="file" id="src_img" name="src_img"/>
                        </label>

                       

                        <label htmlFor="alt_img">Modifier l&apos;alt de l&apos;affiche : <span>&quot;{media?.alt_img}&quot;</span>
                            <input onChange={handleChange} type="text" id="alt_img" name="alt_img" value={media?.alt_img}/>
                        </label>


                        <label htmlFor="src_video">Modifier la source de la vidéo: <span>&quot;{media?.src_video}&quot;</span>
                            <input onChange={handleChange} type="text" id="src_video" name="src_video" value={media?.src_video}/>
                        </label>

                        <label htmlFor="alt_video">Modifier l&apos;alt de la vidéo : <span>&quot;{media?.alt_video}&quot;</span>
                            <input onChange={handleChange} type="text" id="alt_video" name="alt_video" value={media?.alt_video}/>
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
                    <p>Voulez-vous vraiment supprimer ce média ?</p>
                    <button onClick={btnDelete}>OUI</button>
                    <button onClick={toggleMsgDelete}>NON</button>
                </article>
            )}
            <Link to={"/admin/média"}>Retour à la liste des médias</Link>
        </main>
    )
}

export default UpDeleteMedia;