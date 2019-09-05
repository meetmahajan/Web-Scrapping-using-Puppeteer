/*
jsonFile library to write all the cookies of the browser in json file and store it in the local directory
*/
import * as jsonfile from 'jsonfile';
import * as fs from 'fs';
import { Constants } from '../enums/constants';

export class SessionLinkedIn {
    page: any;
    browser: any;
    constructor(page: any, browser: any) {
        this.page = page;
        this.browser = browser;
    }
    /*
    signInLinkedInAccount() : Signin to LinkedIn account and save Cookies by calling getCookies()
    */
    async signInLinkedInAccount() {
        // Go to some signInUrl from blank this.page, constants.signInUrl contains of signInUrl specified in constants.ts
        await this.page.goto(Constants.signInUrl);
        /*
        Click on Username Input tag and type username specified in constants.ts
        Set rest/wait time of about 10 seconds in between to match human frequency, to avoid tracing of linkedIn secure line. 
        */
        await this.page.click(Constants.USERNAME_SELECTOR);
        await this.page.waitFor(3000);
        await this.page.keyboard.type(Constants.username, { delay: 1000 });
        await this.page.waitFor(7000);
        /*
        Click on Password Input tag and type password specified in constants.ts
        Set rest/wait time of about 10 seconds in between to match human frequency, to avoid tracing of linkedIn secure line. 
        */
        await this.page.click(Constants.PASSWORD_SELECTOR);
        await this.page.waitFor(4500);
        await this.page.keyboard.type(Constants.password, { delay: 1000 });
        await this.page.waitFor(4500);
        /* 
        Click in SIGN IN to get Home this.page of respective profile
        Set waiting for 25 seconds for the payload which takes time to load Profile this.page.
        */
        await this.page.click(Constants.LOGIN_SELECTOR);
        // await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        await this.page.waitFor(15000);
        // Save cookies in json file to avoid repeatedly login
        await this.getCookies();
        await this.page.waitFor(2500);
    }
    /* getCookies() : to get cookies for new user and save that Cookie file for that user in DownloadCookie File */
    async getCookies() {
        // Save Session Cookies for respective page
        const cookiesObject = await this.page.cookies();
        await this.page.waitFor(2000);
        // Write cookies to temp file to be used in other profile pages
        jsonfile.writeFile('./DownloadedCookie/linkedinCookies.json', cookiesObject, { spaces: 2 },
            function (err) {
                if (err) {
                    console.log('The Cookie file could not be written.', err);
                }
                console.log("Cookie file has been successfully saved in current working Directory : '" + process.cwd() + "'");
            });
    }
    /*
    setCookies() sets Cookies for given url using Cookie file exists in current working Directory
    */
    async setCookies() {
        /*
       Embed all the cookies generated while signing in LinkedIn Account into the cookieArray
       */
        const cookieArray = require('../DownloadedCookie/linkedinCookies.json');
        // set cookies using SPREAD Operator for given Constants.feedUrl declared in constants.ts
        await this.page.setCookie(...cookieArray);
        await this.page.waitFor(2500);
        await this.page.cookies(Constants.feedUrl);
        await this.page.waitFor(2000);
        // render ProfileFeed and wait for 2 seconds and close the Chromium browser
    }
    /* 
    closeBrowser() : To close chromium browser 
    */
    async closeBrowser() {
        await this.browser.close();
    }
    /* Check whether Cookie file exists or not */
    isCookieFileExist(): boolean {
        const cookieFileExists = fs.existsSync('./DownloadedCookie/linkedinCookies.json');
        return cookieFileExists;
    }
    /* Signing in with existing user credentials using CookieFile*/
    async signInUsingCookies() {
        await this.setCookies();
        await this.page.waitFor(5000);
        await this.page.goto(Constants.feedUrl);
        // await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        await this.page.waitFor(30000);
        // await this.page.waitForNavigation({
        // timeout : 25000
        // });
        await this.page.screenshot({ path: './images/Feed.jpg', fullPage: true });
        await this.page.waitFor(5000);
    }
    /* Signing in Linked Account if Cookie File Doesn't Exist */
    async signIn() {
        console.log("Cookie File doesn't exist in current Directory : '" + process.cwd() + "'");
        // console.log(this.page);
        await this.page.waitFor(2000);
        await this.signInLinkedInAccount();
        await this.page.waitFor(10000);
        await this.page.screenshot({ path: './images/Feed.jpg', fullPage: true });
        await this.page.waitFor(5000);
    }

}