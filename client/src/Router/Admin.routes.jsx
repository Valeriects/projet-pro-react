import { Routes, Route } from "react-router-dom";

import AdminLayout from "../views/layout/AdminLayout.jsx";
import AdminBack from "../views/admin/AdminBack.jsx";
import ListUsers from "../views/admin/users/ListeUsersBack.jsx";
import UpDeleteUser from "../views/admin/users/Up&DeleteUser.jsx";
import TableCategories from "../views/admin/category/ListCategoryBack.jsx";
import UpDeleteCategory from "../views/admin/category/Up&DeleteCategory.jsx";


function AdminRoutes() {
    //todo mettre le hoc de protection des routes
    
    return (
        <Routes>
            <Route path="/admin" element={<AdminLayout/>}>
                
                <Route index element={<AdminBack />} />
                
                <Route path={"membre"} element={<ListUsers />} />
                
                <Route path={"membre/:id"} element={<UpDeleteUser />}/>
            
                <Route path={"categorie"} element={<TableCategories />} />
                <Route path={"categorie/:id"} element={<UpDeleteCategory />} />

                {/* route non trouvée */}
                <Route path="*" element={<h1>404</h1>} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes;