import { Outlet } from "react-router-dom";
import { Fragment } from "react";

import HeaderAd from "../admin/HeaderAd";
import FooterAd from "../admin/FooterAd";
import "../../assets/styles/admin.scss";


function AdminLayout() {
    return (
        <Fragment>
            <HeaderAd />

            <Outlet />

            <FooterAd />
        </Fragment>
    );
}

export default AdminLayout;