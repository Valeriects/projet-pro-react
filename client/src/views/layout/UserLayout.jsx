import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import Header from "../user/Header";
import Footer from "../user/Footer";

import "../../assets/styles/index.scss";

function UserLayout() {
    return (
        <Fragment>
            <Header />
            <Outlet />
            <Footer />
        </Fragment>
    );
}

export default UserLayout;