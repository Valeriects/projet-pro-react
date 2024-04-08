// import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import useMenuToggle from "../../hook/useMenuToggle";

function AdminBack() {
    useMenuToggle();
    // const dispatch = useDispatch();
    const [stats, setStats] = useState(null);
         

    useEffect(() => {
        document.title = "Panneau d'administration";
        // dispatch(fetchUsers());
        async function fetchStats() {
            try {
                const response = await fetch("/api/v1/admin/stats");
                console.log("response ;", response);
                if (response.ok) {
                    const {count} = await response.json();
					setStats(count)
                } else
                console.log(
                    "Erreur lors de la récupération des statistiques"
                    );
                } catch (error) {
                    console.log(error);
                }
            }
            // console.log("stats:", stats);
        fetchStats();
    }, []);
   

    return (
         <main id="admin">
            <h1>Bienvenue sur page accueil de l&apos;admin</h1>

            <h2>Rubriques:</h2>

            <div id="userBack">
                {
					stats ? (
						<>
							<p>Nombre de membres : {stats.nombre_d_utilisateurs}</p>
							<p>Nombre de réservations : {stats.nombre_de_réservations}</p>
							<p>Nombre de films : {stats.nombre_de_films}</p>
							<p>Nombre de séances : {stats.nombre_de_séances}</p>
						</>
					) : (
						<p>Chargement des statistiques...</p>
					)
				}
            
                
            </div>
                
        </main>
    )

}

export default AdminBack;