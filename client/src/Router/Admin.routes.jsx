import { Routes, Route } from "react-router-dom";

import AdminLayout from "../views/layout/AdminLayout.jsx";
import AdminBack from "../views/admin/AdminBack.jsx";


function AdminRoutes() {
    //todo mettre le hoc de protection des routes
    
    return (
        <Routes>
            <Route path="/admin" element={<AdminLayout/>}>
                
                <Route index element={<AdminBack/>}/>
            

                {/* route non trouvée */}
                <Route path="*" element={<h1>404</h1>} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes;