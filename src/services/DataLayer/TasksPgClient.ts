import { Client } from "pg";
import { IDbClient } from "./IDbClient";
import { ITask } from "../models/ITask";


export class TasksPgClient implements IDbClient {
    private postgresClient: Client;

    
    constructor() {
            this.postgresClient = new Client({
                host: process.env.SQLDB_HOST || '',
                user: process.env.SQLDB_USER || '',
                port: parseInt(process.env.SQLDB_PORT) || 5432,
                password: process.env.SQLDB_PASSWORD,
                database: process.env.SQLDB_DATABASE
            });
    }

    async initConnection() {
        try {
            this.postgresClient.connect();
        } catch (error) {
            console.error(`Error connecting to postgres, ${error.message}`);
            throw error;
        }
    }
    
    async getAll() {
        await this.initConnection();
        const result = await this.postgresClient.query('SELECT * FROM tasks');
        return result.rows;
    }

    async create(item: ITask) {

        await this.initConnection();
        await this.postgresClient.query('INSERT INTO tasks(description, status, createdAt, lastUpdated) VALUES($1, $2, $3, $4)', [
            item.description,
            item.status,
            item.createdAt,
            item.lastUpdated
        ]);
    }

    async getOneById(id: string) {
        await this.initConnection();
        const response = await this.postgresClient.query('SELECT * from tasks where id=$1', [id]);
        return {
            Item: response.rows[0]
        }
    }
    async deleteById(id: string) {

        await this.initConnection();
        await this.postgresClient.query(`
DELETE FROM tasks
WHERE 
    id = $1           
`, [
    id
]
)

    }

    async update(id: string, item: ITask) {
        await this.initConnection();
        await this.postgresClient.query(`
UPDATE tasks 
SET 
    description=$1,
    status=$2,
    lastUpdated=$3
WHERE
    id = $4
`,      [
            item.description,
            item.status,
            item.lastUpdated,
            id
        ]);
    }

}