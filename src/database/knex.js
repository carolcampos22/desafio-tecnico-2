import knex from "knex";

export const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./src/database/desafio-2.db", 
    },
    useNullAsDefault: true, 
    pool: {
        min: 0, 
        max: 1,
				afterCreate: (conn, cb) => {
            conn.run("PRAGMA foreign_keys = ON", cb)
        } 
    }
})