import pool from "../config/database.js";

//création de ma classe Query
class Query {
    
    static async run(query) {
        const [result] = await pool.execute(query);

        return result;
    }

    static async runByParams(query, param) {
        const [result] = await pool.execute(query, param);

        return result;
    }

}

export default Query;