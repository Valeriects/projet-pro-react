import useMenuToggle from "../../../hook/useMenuToggle";

function Apropos() {
    useMenuToggle();

    return (
        <p>Cinéma Le Comœdia
            Rue Paul Vaillant Couturier, 13140 Miramas

            Billetterie : 04 90 50 14 74 caissecomoedia@scenesetcines.fr

            Heures d’ouverture : Ouvert du lundi au vendredi de 9h à 12h30 et de 14h à 23h, samedi et dimanche de 14h à 22h30.

            Tarif  plein : 5,50 €
            Tarif  réduit : 4,50 €
            Enfants moins de 14 ans : 3,60 €
            Tous les jeudis, tarif super réduit : 3,60 €
            Tous les mercredis, tarif réduit : 4,50€
            Abonnement 10 séances : 36 €</p>
    );
}

export default Apropos;