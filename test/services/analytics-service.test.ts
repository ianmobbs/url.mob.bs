import {MOCK_CLICK, MOCK_URL, MOCK_USER} from "../mocks";

const MOCK_CLICK_MANAGER = {
    init: jest.fn(),
    getAllClicksForUser: jest.fn(),
    getAllClicksForUrl: jest.fn()
}
jest.mock('@app/managers/click-manager.ts', () => {
    return jest.fn().mockImplementation(() => MOCK_CLICK_MANAGER);
});

import AnalyticsService from "../../app/services/analytics-service";
const analyticsService = new AnalyticsService();

describe('click-manager.ts unit tests', () => {
   describe('getOverallAnalytics', () => {
       it('calls click manager for a given user', async () => {
           MOCK_CLICK_MANAGER.getAllClicksForUser.mockReturnValue([MOCK_CLICK])
           const clicks = await analyticsService.getOverallAnalytics(MOCK_USER)
           expect(clicks).toContain(MOCK_CLICK)
           expect(MOCK_CLICK_MANAGER.getAllClicksForUser).toBeCalledWith(MOCK_USER)
       });
   });

   describe( 'getClicksForURL', () => {
       it('calls click manager for a given user and url', async () => {
           MOCK_CLICK_MANAGER.getAllClicksForUrl.mockReturnValue([MOCK_CLICK])
           const clicks = await analyticsService.getClicksForURL(MOCK_USER, MOCK_URL)
           expect(clicks).toContain(MOCK_CLICK)
           expect(MOCK_CLICK_MANAGER.getAllClicksForUrl).toBeCalledWith(MOCK_USER, MOCK_URL)
       })
   })
});