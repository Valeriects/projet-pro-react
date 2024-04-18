import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";

function AddMedia() {
    useMenuToggle();
    const navigate = useNavigate();
    
    const [media, setMedia] = useState({
        src_img: "",
        alt_img: "",
        src_video: "",
        alt_video: "",

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "src_img" ? e.target.files[0] : value;
    
        setMedia({
            ...media,
            [name]: newValue
        });
    }

    async function submitAdd(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('src_img', media.src_img);
            formData.append('alt_img', media.alt_img);
            formData.append('src_video', media.src_video);
            formData.append('alt_video', media.alt_video);

            const res = await fetch("/api/v1/admin/media", {
                method: "POST", 
                body: formData,
            });

            if (res.ok) {
                navigate("/admin/média");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link  className="aBack" to={"/admin/média"}>Retour à la liste des médias</Link>
            <form onSubmit={submitAdd} encType="multipart/form-data">
                 <fieldset>
                        <legend>Création des données d&apos;un média</legend>
                        
                        <label htmlFor="src_img">Src de l&apos;affiche :
                            <input onChange={handleChange} type="file" id="src_img" name="src_img"/>
                        </label>

                        <label htmlFor="alt_img">Alt de l&apos;affiche :
                            <input onChange={handleChange} type="text" id="alt_img" name="alt_img"/>
                        </label>

                        <label htmlFor="src_video">Src de la vidéo :
                            <input onChange={handleChange} type="text" id="src_video" name="src_video"/>
                        </label>

                        <label htmlFor="alt_video">Alt de la vidéo :
                            <input onChange={handleChange} type="text" id="alt_video" name="alt_video"/>
                        </label>

                       
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link  className="aBack" to={"/admin/média"}>Retour à la liste des médias</Link>
        </>
    );
}

export default AddMedia;