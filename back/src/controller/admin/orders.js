import Query from "../../model/Query.js";

//le CRUD pour la table orders
const getOrders = async (req, res) => {
    try {
        //todo faire un JOIN avec une séance (mais aussi un film et un horaire et un cinéma ????)
        const query = "SELECT * FROM orders";

        const listOrders = await Query.run(query);

        res.json(listOrders);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const addOrder = async (req, res) => { //todo ça doit etre dans le dashboard du coup ? car l'user n'a pas accès au compte admin...
    try {
        const { users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb } = req.body;

        const query = "INSERT INTO orders (users_id, sessions_id, order_date, price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?)";

        await Query.runByParams(query, [users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb]);

        res.json({ users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const upOrder = async (req, res) => { // TODO ?? on peut modifier une commande après qu'elle soit passée ?
    try {
        const { users_id, sessions_id } = req.params;
        const { price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb } = req.body;

        //todo marche pas 
        const query = "UPDATE orders SET users_id = ?, sessions_id = ?, price_order = ?, num_CB = ?, cb_date = ?, cryptogramme = ? , lastname = ?, firstname = ?, email = ?, name_cb = ? WHERE id = ?";


        await Query.runByParams(query, [users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb, id]);
            
        res.json({ users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const deleteOrder = async (req, res) => {
    try {
        const { users_id, sessions_id  } = req.params;
        const query = "DELETE FROM orders WHERE id = ?";

        await Query.runByParams(query, [id]);

        res.json({ msg:"order bien supprimé", id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

export { getOrders, addOrder, upOrder, deleteOrder };