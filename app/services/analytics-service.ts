import ClickManager from "../managers/click-manager";
import User from "../model/entities/User";
import URL from "../model/entities/URL";
import Click from "../model/entities/Click";

export default class AnalyticsService {
    private clickManager: ClickManager

    constructor() {
        this.clickManager = new ClickManager();
    }

    public getOverallAnalytics = async (user: User): Promise<Click[]> => {
        return this.clickManager.getAllClicksForUser(user)
    }

    public getClicksForURL = async (user: User, url: URL): Promise<Click[]> => {
        return this.clickManager.getAllClicksForUrl(user, url);
    }
}