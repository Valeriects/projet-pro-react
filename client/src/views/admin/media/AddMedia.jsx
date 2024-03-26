import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";

function AddMedia() {
    const navigate = useNavigate();
    const [media, setMedia] = useState("");
    
    const handleChange = (e) => {
        setMedia({
            ...media,
            [e.target.name]: e.target.value
        });
    }

    async function submitAdd(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/v1/admin/media", {
                method: "POST",            
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(media),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/média");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link to={"/admin/média"}>Retour à la liste des médias</Link>
            <form onSubmit={submitAdd} encType="multipart/form-data">
                 <fieldset>
                        <legend>Création des données d&apos;un média</legend>
                        
                        <label htmlFor="src_img">Src de l&apos;affiche :
                            <input onChange={handleChange} type="file" id="src_img" name="src_img" value={media.src_img}/>
                        </label>

                        <label htmlFor="alt_img">Alt de l&apos;affiche :
                            <input onChange={handleChange} type="text" id="alt_img" name="alt_img" value={media.alt_img}/>
                        </label>

                        <label htmlFor="src_video">Src de la vidéo :
                            <input onChange={handleChange} type="text" id="src_video" name="src_video" value={media.src_video}/>
                        </label>

                        <label htmlFor="alt_video">Alt de la vidéo :
                            <input onChange={handleChange} type="text" id="alt_video" name="alt_video" value={media.alt_video}/>
                        </label>

                       
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link to={"/admin/média"}>Retour à la liste des médias</Link>
        </>
    );
}

export default AddMedia;