import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

import { fetchUsers } from "../../../store/slices/user.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle.jsx";

function Dashboard() {
    useMenuToggle()
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { user } = useSelector((state) => state.user);
    
    const id = user ? user.id : null;
    
    const  listUser  = useSelector((state) => state.user.listUser );
    
    // console.log("id :",id);
    
   const infoUser = listUser.find(user => user.id === Number(id));
    
    const [userUp, setUserUp] = useState("");
    // const [userUp, setUserUp] = useState({ firstname: infoUser?.firstname || "", lastname: infoUser?.lastname || "", email: infoUser?.email || "", password: infoUser?.password || "", phone: infoUser?.phone || "", address: infoUser?.address || "", birthday: infoUser?.birthday || "" });
    
    // console.log("infoUser :", infoUser);
    // console.log("listUser :", listUser);
    // console.log("user : " , user);
    // console.log("userUp : ", userUp);
    
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    
    const handleChange = (e) => setUserUp({
        ...userUp, //je spread un nouveau tableau, avec les infos de userUp
        //je l'associe avec la valeur de chaque input
        [e.target.name]: e.target.value
    });


    const btnUp = async (e) => {
        try {
            e.preventDefault();
            await fetch(`/api/v1/app/user/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userUp),
            }).then(res => res.json())
                .then(
                    dispatch(fetchUsers()),
                    console.log("res :", res)
                );

            // console.log("res :", res);
            // if (res.ok) {
            //     // navigate(0); //pour rester sur la même page
            //     dispatch(fetchUsers());
            // }
              
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
                    
                    <label htmlFor="lastname">Nom: 
                        <input onChange={handleChange} type="text" id="lastname" name="lastname" placeholder={infoUser?.lastname}/>
                    </label>

                    <label htmlFor="firstname">Prénom : 
                        <input onChange={handleChange} type="text" id="firstname" name="firstname" placeholder={infoUser?.firstname}/>
                    </label>

                    <label htmlFor="email">Email: 
                        <input onChange={handleChange} type="email" id="email" name="email" placeholder={infoUser?.email}/>
                    </label>

                    <label htmlFor="password">Mot de passe: 
                        <input onChange={handleChange} type="password" id="password" name="password"/>
                        {/* <input onChange={handleChange} type="password" id="password" name="password" placeholder={infoUser?.password}/> */}
                    </label>

                    <label htmlFor="phone">Votre numéro de téléphone: 
                        <input onChange={handleChange} type="tel" pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}" id="phone" name="phone"placeholder={infoUser?.phone}/>
                        {/* <input onChange={handleChange} type="tel" pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}" id="phone" name="phone" placeholder={infoUser?.phone}/> */}
                    </label>

                    <label htmlFor="address">Adresse postale: 
                        <input onChange={handleChange} type="text" id="address" name="address" placeholder={infoUser?.address}/>
                    </label>

                    <label htmlFor="birthday">Date de naissance: 
                        <input onChange={handleChange} type="date" id="birthday" name="birthday" placeholder={infoUser?.birthday}/>
                    </label>
                                      
                 
                    <button type="submit">
                        <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                    </button>
                    
                </fieldset>
            </form>
        </main>
    );
}

export default Dashboard;