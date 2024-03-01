import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchUsers } from "../../../store/slices/user.js";

function Dashboard() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const infoUser = useSelector((state) => state.user.listUser.find(user => user.id === Number(id)));
    
    console.log("infoUser :", infoUser);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch, infoUser]);


    return (
        <main id="dash">
            {infoUser && (
                <p>{infoUser.email}</p>
            )}
        </main>
    )
}

export default Dashboard;