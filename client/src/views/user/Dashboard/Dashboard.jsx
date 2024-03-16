import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchUsers } from "../../../store/slices/user.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const { user } = useSelector((state) => state.user);
    
    const id = user ? user.id : null;
    
    const  listUser  = useSelector((state) => state.user.listUser );
    
    console.log("id :",id);
    
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    
    const infoUser = listUser.find(user => user.id === Number(id));
    
    const [userUp, setUserUp] = useState({ firstname: infoUser?.firstname || "", lastname: infoUser?.lastname || "", email: infoUser?.email || "", password: infoUser?.password || "", phone: infoUser?.phone || "", address: infoUser?.address || "", birthday: infoUser?.birthday || "" });
    
    console.log("infoUser :", infoUser);
    console.log(listUser);
    console.log("user : ", user);
    
    const handleChange = (e) => setUserUp({
        ...userUp, //je spread un nouveau tableau, avec les infos de userUp
        //je l'associe avec la valeur de chaque input
        [e.target.name]: e.target.value
    });

    console.log("userUp : ", userUp);
    

    const btnUp = async () => {
        try {
            const res = await fetch(`/api/v1/admin/user/${user.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(userUp),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/membre");
            }
              
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main id="dash">
            <h1>Bienvenue {infoUser?.firstname}</h1>         

            <form className="datas" onSubmit={btnUp}>
                <fieldset>
                    
                    <legend>Vos données</legend>

                    <p>Date de création du compte: <span>{infoUser?.created_date}</span></p>

                    <p>Date de dernière connexion: <span>{infoUser?.last_connection_date}</span></p>
                    
                    <label htmlFor="lastname">Nom : 
                        <input onChange={handleChange} type="text" id="lastname" name="lastname" value={infoUser?.lastname}/>
                    </label>

                    <label htmlFor="firstname">Prénom : 
                        <input onChange={handleChange} type="text" id="firstname" name="firstname" value={infoUser?.firstname}/>
                    </label>

                    <label htmlFor="email">Email : 
                        <input onChange={handleChange} type="text" id="email" name="email" value={infoUser?.email}/>
                    </label>

                    <label htmlFor="password">Mot de passe: : 
                        <input onChange={handleChange} type="password" id="password" name="password" value={infoUser?.password}/>
                    </label>

                    <label htmlFor="phone">Téléphone : 
                        <input onChange={handleChange} type="text" id="phone" name="phone" value={infoUser?.phone}/>
                    </label>

                    <label htmlFor="address">Adresse postale: 
                        <input onChange={handleChange} type="text" id="address" name="address" value={infoUser?.address}/>
                    </label>

                    <label htmlFor="birthday">Date de naissance: 
                        <input onChange={handleChange} type="text" id="birthday" name="birthday" value={infoUser?.birthday}/>
                    </label>
                    

                       
                    {/* <p>Nom: <span>{infoUser?.lastname}</span></p>
                    <p>Prénom: <span>{infoUser?.firstname}</span></p>
                    <p>Email: <span>{infoUser?.email}</span></p>
                    <p>Mot de passe: <span>{infoUser?.password}</span></p>
                    <p>Date de naissance: <span>{infoUser?.birthday}</span></p>
                    <p>Téléphone: <span>{infoUser?.phone}</span></p>
                    <p>Adresse postale: <span>{infoUser?.address}</span></p> */}

                    
                 
                    <button type="submit">
                        <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                    </button>
                    
                </fieldset>
      

            </form>
        </main>
    );
}

export default Dashboard;