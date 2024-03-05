import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";

import { fetchUsers } from "../../../store/slices/user.js";

function Dashboard() {
    // const { id } = useParams();
    const dispatch = useDispatch();

    // const { resUser } = useSelector((state) => { state.user });
    
    // console.log(id);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    // const infoUser = useSelector((state) => state.user.listUser.find(user => user.id === Number(id)));
    
    // console.log("infoUser :", infoUser);



    return (
        <main id="dash">
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi est libero quisquam nostrum ratione ipsum, voluptatem vitae assumenda asperiores molestias iusto similique itaque, facere expedita sint id sapiente rerum sed!

            </h1>

            {/* {user.map((item) => (
                <article key={item.id}>

                    <p>{ item.firstname }</p>
                </article>
            ))} */}
            {/* {infoUser && (
                <p>{infoUser.email}</p>
            )} */}
        </main>
    )
}

export default Dashboard;