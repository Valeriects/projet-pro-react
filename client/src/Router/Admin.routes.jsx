import { Routes, Route } from "react-router-dom";

import AdminLayout from "../views/layout/AdminLayout.jsx";
import AdminBack from "../views/admin/AdminBack.jsx";
import ListUsers from "../views/admin/users/ListeUsersBack.jsx";
import UpDeleteUser from "../views/admin/users/Up&DeleteUser.jsx";
import TableCategories from "../views/admin/category/ListCategoryBack.jsx";
import UpDeleteCategory from "../views/admin/category/Up&DeleteCategory.jsx";
import AddCategory from "../views/admin/category/AddCategory.jsx";
import TableCinema from "../views/admin/cinema/ListCinema.jsx";
import UpDeleteCinema from "../views/admin/cinema/Up&DeleteCinema.jsx";
import AddCinema from "../views/admin/cinema/AddCinema.jsx";
import TableMedia from "../views/admin/media/ListMedia.jsx";
import AddMedia from "../views/admin/media/AddMedia.jsx";
import UpDeleteMedia from "../views/admin/media/Up&DeleteMedia.jsx";
import TableMovie from "../views/admin/movie/ListMovie.jsx";
import UpDeleteMovie from "../views/admin/movie/Up&DeleteMovie.jsx";
import AddMovie from "../views/admin/movie/AddMovie.jsx";
import TableMediaMovie from "../views/admin/mediaMovie/ListMediaMovie.jsx";
import UpDeleteMediaMovie from "../views/admin/mediaMovie/Up&DeleteMediaMovie.jsx";
import AddMediaMovie from "../views/admin/mediaMovie/AddMediaMovie.jsx";
import TableRole from "../views/admin/role/ListRole.jsx";
import UpDeleteRole from "../views/admin/role/Up&DeleteRole.jsx";
import AddRole from "../views/admin/role/AddRole.jsx";
import TableTimeTables from "../views/admin/timeTable/ListTimeTable.jsx";
import UpDeleteTimeTable from "../views/admin/timeTable/Up&DeleteTimeTable.jsx";
import AddTimeTable from "../views/admin/timeTable/AddTimeTable.jsx";
import TableSessions from "../views/admin/session/ListSession.jsx";
import UpDeleteSession from "../views/admin/session/Up&DeleteSession.jsx";
import AddSession from "../views/admin/session/AddSession.jsx";
import TableMovieTheater from "../views/admin/movieTheater/ListMovieTheater.jsx";
import UpDeleteMovieTheater from "../views/admin/movieTheater/Up&DeleteMovieTheater.jsx";
import AddMovieTheater from "../views/admin/movieTheater/AddMovieTheater.jsx";
import TableCategoryMovie from "../views/admin/categoryMovie/ListCategoryMovie.jsx";
import UpDeleteCategoryMovie from "../views/admin/categoryMovie/Up&DeleteCategoryMovie.jsx";
import AddCategoryMovie from "../views/admin/categoryMovie/AddCategoryMovie.jsx";
import TableOrder from "../views/admin/order/ListOrder.jsx";
import UpDeleteOrder from "../views/admin/order/Up&DeleteOrder.jsx";
import AddOrder from "../views/admin/order/AddOrder.jsx";
import RequireAuth from "../HOC/ProtectedAdminRoutes.jsx";

function AdminRoutes() {
    //todo mettre le hoc de protection des routes
    const AdminWithAuth = RequireAuth(AdminLayout);
    
    return (
        <Routes>
            <Route path="/admin" element={<AdminWithAuth/>}>
            {/* <Route path="/admin" element={<AdminLayout/>}> */}
                
                <Route index element={<AdminBack />} />
                
                <Route path={"membre"} element={<ListUsers />} />
                
                <Route path={"membre/:id"} element={<UpDeleteUser />}/>
            
                {/* routes des catégories */}
                <Route path={"categorie"} element={<TableCategories />} />
                <Route path={"categorie/:id"} element={<UpDeleteCategory />} />
                <Route path={"categorie/ajout"} element={<AddCategory />} />

                {/* routes des cinémas */}
                <Route path={"cinéma"} element={<TableCinema />} />
                <Route path={"cinéma/:id"} element={<UpDeleteCinema />} />
                <Route path={"cinéma/ajout"} element={<AddCinema />} />

                {/* routes des médias */}
                <Route path={"média"} element={<TableMedia />} />
                <Route path={"média/:id"} element={<UpDeleteMedia />} />
                <Route path={"média/ajout"} element={<AddMedia />} />

                {/* routes des films */}
                <Route path={"film"} element={<TableMovie />} />
                <Route path={"film/:id"} element={<UpDeleteMovie />} />
                <Route path={"film/ajout"} element={<AddMovie />} />

                {/* routes des média-films */}
                <Route path={"média-film"} element={<TableMediaMovie />} />
                <Route path={"média-film/:id"} element={<UpDeleteMediaMovie />} />
                <Route path={"média-film/ajout"} element={<AddMediaMovie />} />

                {/* routes des roles */}
                <Route path={"role"} element={<TableRole />} />
                <Route path={"role/:id"} element={<UpDeleteRole />} />
                <Route path={"role/ajout"} element={<AddRole />} />

                {/* routes des timeTables */}
                <Route path={"horaire"} element={<TableTimeTables />} />
                <Route path={"horaire/:id"} element={<UpDeleteTimeTable />} />
                <Route path={"horaire/ajout"} element={<AddTimeTable />} />

                {/* routes des sessions */}
                <Route path={"séance"} element={<TableSessions />} />
                <Route path={"séance/:id"} element={<UpDeleteSession />} />
                <Route path={"séance/ajout"} element={<AddSession />} />

                {/* routes des movietheaters */}
                <Route path={"salle"} element={<TableMovieTheater />} />
                <Route path={"salle/:id"} element={<UpDeleteMovieTheater />} />
                <Route path={"salle/ajout"} element={<AddMovieTheater />} />

                {/* routes des CategoryMovies */}
                <Route path={"catégorie-film"} element={<TableCategoryMovie />} />
                <Route path={"catégorie-film/:id"} element={<UpDeleteCategoryMovie />} />
                <Route path={"catégorie-film/ajout"} element={<AddCategoryMovie />} />

                {/* routes des orders */}
                <Route path={"réservation"} element={<TableOrder />} />
                <Route path={"réservation/:id"} element={<UpDeleteOrder />} />
                <Route path={"réservation/ajout"} element={<AddOrder />} />

                {/* route non trouvée */}
                <Route path="*" element={<h1>404</h1>} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes;