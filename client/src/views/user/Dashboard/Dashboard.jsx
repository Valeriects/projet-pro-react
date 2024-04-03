import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchUsers } from "../../../store/slices/user.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle.jsx";
import { convertDate, convertTime} from "../../../utils/formatDate.js";

function Dashboard() {
    useMenuToggle()
    const dispatch = useDispatch();
    
    const { user } = useSelector((state) => state.user);
    
    const id = user ? user.id : null;
    
    const  {listUser}  = useSelector((state) => state.user );
    // const  listUser  = useSelector((state) => state.user.listUser );
    
    // console.log("id :",id);
    
//    const infoUser = listUser.find(user => user.id === Number(id));
    const infoUser = listUser.find(user => user.id === Number(id));

    
    // const { newDate, time } = convertDate(infoUser?.created_date);
 
    
    // const date = new Date(infoUser?.created_date);
    
    // const options = { day: 'numeric', month: 'long', year: 'numeric' };
    
    // const newDate = date.toLocaleDateString('fr-FR', options);
    
    
    // console.log("convertDAte :", convertDate(infoUser?.created_date));
    // console.log("date :", newDate);
    // console.log("time :", time);

    
    const [userUp, setUserUp] = useState("");
    
    useEffect(() => {
        document.title = "Votre compte";
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
            }).then(res => res.json()).then(dispatch(fetchUsers()));
              
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

                    <p>Date de création du compte: <span>le {convertDate(infoUser?.created_date)} à {convertTime(infoUser?.created_date)}</span></p>

                    <p>Date de dernière connexion: <span>le {convertDate(infoUser?.last_connection_date)} à {convertTime(infoUser?.last_connection_date)}</span></p>
                    
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
                    </label>

                    <label htmlFor="phone">Votre numéro de téléphone: 
                        <input onChange={handleChange} type="tel" pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}" id="phone" name="phone" placeholder={infoUser?.phone}/>
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