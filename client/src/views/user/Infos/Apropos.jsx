import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useMenuToggle from "../../../hook/useMenuToggle";
import { fetchCinema } from "../../../store/slices/cinema";

function Apropos() {
    useMenuToggle();
    const dispatch = useDispatch();
    const { listCine } = useSelector((state) => state.cinema);
    console.log("listCine : ", listCine[0]);

    useEffect(() => {
        dispatch(fetchCinema());
    }, []);

    return (
        <main className="infos">
            <section >
                <h2>{listCine[0].name_cinema}</h2>

                <address>
                    {listCine[0].address_cine}, {listCine[0].city}
                </address>
                <p>Nous sommes: {listCine[0].infos_cine}</p>
                <p>Manager: {listCine[0].manager}</p>
                <p>Adresse mail : {listCine[0].email_cine}</p>
                <p>Billetterie : +33 {listCine[0].phone_cine}</p>
                <p>Heures d&apos;ouverture : Ouvert du lundi au dimanche de 17h à 23h.</p>
                <p>Tarif  plein : 12,50 € </p>
                <p>Nombre de salles : {listCine[0].nbr_theater} </p>

                <p>Infos accès handicapés: {listCine[0].disabled_access}</p>
              
            </section>
          
        </main>
    );
}

export default Apropos;