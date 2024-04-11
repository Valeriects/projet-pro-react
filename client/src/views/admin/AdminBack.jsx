import { useState, useEffect } from "react";

import useMenuToggle from "../../hook/useMenuToggle";

function AdminBack() {
    useMenuToggle();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        document.title = "Panneau d'administration";
        async function fetchStats() {
            try {
                const response = await fetch("/api/v1/admin/stats");

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
        fetchStats();
    }, []);
   

    return (
         <main id="admin">
            <h1>Bienvenue sur page accueil de l&apos;admin</h1>

            <table>
                <thead>
                    <tr>
                        <th>Statistiques des données:</th>
                    </tr>
                </thead>

                {stats ? (
                    <tbody>
                        <tr>
                            <td>Nombre de membres : {stats.nombre_d_utilisateurs}</td>
                        </tr>
                        <tr><td>Nombre de réservations : {stats.nombre_de_réservations}</td></tr>
                        <tr><td>Nombre de films : {stats.nombre_de_films}</td></tr>
                        <tr><td>Nombre de séances : {stats.nombre_de_séances}</td></tr>
                    </tbody>
					) : (
						<p>Chargement des statistiques...</p>
					)
				}
            
                
            </table>
                
        </main>
    )

}

export default AdminBack;