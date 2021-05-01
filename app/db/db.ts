import "reflect-metadata";
import {Connection, createConnection} from "typeorm";

const connection = createConnection();

export default class DB {

    constructor() {
    }

    public getConnection = () => {
        return connection;
    }
}