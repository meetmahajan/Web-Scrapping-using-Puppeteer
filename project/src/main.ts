import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { SearchFilterLinkedIn } from './search/search-filter-linkedin';
import { SearchResultDataFetch } from './search/search-result-data-fetch';
import { SessionLinkedIn } from './session-linkedin/session-linkedin';

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false
        });
        const context = await browser.createIncognitoBrowserContext();
        //launch a blank page
        const page = await context.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        const sessionLinkedIn = new SessionLinkedIn(page, browser);
        const searchFilterLinkedIn = new SearchFilterLinkedIn(page);
        const searchResultDataFetch = new SearchResultDataFetch(page);
        // Directories for Cookie File and Images
        var dir_cookie = './DownloadedCookie';
        var dir_images = './images';
        // Check whether folders exists or not 
        if (!fs.existsSync(dir_cookie)) {
            fs.mkdirSync(dir_cookie);
        }
        if (!fs.existsSync(dir_images)) {
            fs.mkdirSync(dir_images);
        }
        /*
        Check whether the Cookie file is exist in the current directory
        */
        // await sessionLinkedIn.isCookieFileExist() ? sessionLinkedIn.signInUsingCookies() : sessionLinkedIn.signIn();
        if (sessionLinkedIn.isCookieFileExist()) {
            await sessionLinkedIn.signInUsingCookies();
        } else {
            await sessionLinkedIn.signIn();
        }
        /* Search any Keyword to find appropriate person using filters invoked by user */
        await searchFilterLinkedIn.searchPeople();
        // await searchResultDataFetch.clickOnNextPage();
        // await searchResultDataFetch.iterateOnProfiles();
        await searchResultDataFetch.searchPageProfileIterate();
        await sessionLinkedIn.closeBrowser();
    }
    catch (err) {
        console.log(err);
    }
})();
