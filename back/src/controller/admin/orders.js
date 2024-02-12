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
const addOrder = async (req, res) => {
    try {
        const { users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme } = req.body;

        const query = "INSERT INTO orders (users_id, sessions_id, order_date, price_order, num_CB, cb_date, cryptogramme) VALUES (?, ?, NOW(), ?, ?, ?, ?)";

        const order = await Query.runByParams(query, [users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme]);

        res.json({ users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const upOrder = async (req, res) => { //todo ?? on peut modifier une commande aprsè qu'elle soit passée ?
    try {
        const { users_id, sessions_id } = req.params;
        const { price_order, num_CB, cb_date, cryptogramme } = req.body;

        //todo marche pas 
        const query = "UPDATE orders SET users_id = ?, sessions_id = ?, price_order = ?, num_CB = ?, cb_date = ?, cryptogramme = ? WHERE users_id = ? AND sessions_id = ?";


        await Query.runByParams(query, [users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme, users_id, sessions_id]);
            
        res.json({ users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const deleteOrder = async (req, res) => {
    try {
        const { users_id, sessions_id  } = req.params;
        const query = "DELETE FROM orders WHERE users_id = ? AND sessions_id = ? ";

        await Query.runByParams(query, [users_id, sessions_id]);

        res.json({ msg:"order bien supprimé", users_id, sessions_id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

export { getOrders, addOrder, upOrder, deleteOrder };