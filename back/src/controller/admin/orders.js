import Query from "../../model/Query.js";

//le CRUD pour la table orders
const getOrders = async (req, res) => {
    try {
        const query = "SELECT * FROM orders";

        const listOrders = await Query.run(query);

        res.json(listOrders);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
}; 

const upOrder = async (req, res) => { 
    try {
        const {id } = req.params;
        const { users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb, nbr_seats_payed } = req.body;

        const query = "UPDATE orders SET users_id = ?, sessions_id = ?, price_order = ?, num_CB = ?, cb_date = ?, cryptogramme = ? , lastname = ?, firstname = ?, email = ?, name_cb = ?, nbr_seats_payed =? WHERE id = ?";


        await Query.runByParams(query, [users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb, nbr_seats_payed, id]);
            
        res.json({ users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb, nbr_seats_payed  });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const deleteOrder = async (req, res) => {
    try {
        const { id  } = req.params;
        const query = "DELETE FROM orders WHERE id = ?";

        await Query.runByParams(query, [id]);

        res.json({ msg:"order bien supprimé", id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

export { getOrders, upOrder, deleteOrder };