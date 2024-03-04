// import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";

// import { fetchUsers } from "../../store/slices/user";
// import TableUsers from './users/ListeUsersBack';

function AdminBack() {
    // const dispatch = useDispatch();
        
    // const { listUser } = useSelector((state) => state.user);

    // useEffect(() => {
    //     dispatch(fetchUsers());
    // }, []);


    // console.log(listUser);

    // const [listUsersOpen, setListUsersOpen] = useState(false);
    // const [listImgOpen, setListImgOpen] = useState(false);
    // const [listCategoryOpen, setListCategoryOpen] = useState(false);

    // function toggleListUsers() {
    //     setListUsersOpen(!listUsersOpen);
    // }
    // function toggleListImg() {
    //     setListImgOpen(!listImgOpen);
    // }
    // function toggleListCategory() {
    //     setListCategoryOpen(!listCategoryOpen);
    // }


    return (
        // <h1>Back OFFICE</h1>
         <main id="admin">
            <h1>Bienvenue sur page accueil admin</h1>

            <h2>Rubriques:</h2>


            {/* <ul>
                <li onClick={toggleListUsers}>Membres
                    
                </li>

                <li onClick="">articles

                </li>

                <li>
                <button onClick={toggleListCategory}>Categories</button>

                </li>

                <li>
                <button >Roles des membres</button>

                </li>

                <li>
                <button onClick={toggleListImg}>Images des articles</button>
                </li>

                <li>
                <button >Commentaires des articles</button>
                 </li>
            </ul> */}


            {/* <button >Articles</button> */}

            {/* <ModifArticle /> */}
            <div id="userBack">

                {/* {listUsersOpen && <TableUsers />} */}
{/* 
                {listImgOpen && <TableImages/>}
                
                {listCategoryOpen && <TableCategories/>} */}
                
            </div>
                
        </main>
    )

}

export default AdminBack;