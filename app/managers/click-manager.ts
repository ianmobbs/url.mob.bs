import Click from "../model/entities/Click";
import {Repository} from "typeorm";
import DB from "../db/db";
import URLManager from "./url-manager";
import URL from "../model/entities/URL";

export default class ClickManager {
    private repository: Repository<Click>;
    private urlManager: URLManager;

    constructor() {
        this.setupRepository();
        this.urlManager = new URLManager();
    }

    public addClick = async (url: URL): Promise<Click> => {
        return this.repository.save({url, timestamp: new Date()})
    }

    private setupRepository = async () => {
        const connection = await new DB().getConnection();
        this.repository = connection.getRepository(Click);
    }
}