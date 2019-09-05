import { dataFetchFromProfile } from '../data-fetch/data-fetch-from-profile'
export class SearchResultDataFetch {
    page: any;
    dataFetch: any;
    isZero: number = 0;
    constructor(page) {
        this.page = page;
        this.dataFetch = new dataFetchFromProfile(page);
    }
    // dataFetch = new dataFetchFromProfile(this.page);
    async autoScroll() {
        await this.page.evaluate(() => {
            new Promise((resolve, reject) => {
                var totalHeight = 0;
                var distance = 100;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }
    /*     async autoScrollUp() {
            await this.page.evaluate(() => {
                new Promise((resolve, reject) => {
                    var totalHeight = 0;
                    var distance = 100;
                    var timer = setInterval(() => {
                        var scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight -= distance;
    
                        if (totalHeight >= scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });
        } */

    async clickOnNextPage() {
        const nextPageArray = await this.page.evaluate(() => Array.from(document.querySelectorAll('artdeco-pagination.artdeco-pagination > button')));
        // console.log(nextPageArray.length);
        const nextPage = (await this.page.$$('artdeco-pagination.artdeco-pagination > button'))[nextPageArray.length - 1];
        await this.page.waitFor(1500);
        await nextPage.click();
        // await this.page.waitForNavigation();
        await this.page.waitFor(15000);
    }
    async clickOnProfile(n: number) {
        await this.page.waitFor(2500);
        const resultProfilesArrayElement = (await this.page.$$('span[class="name actor-name"]'))[n];
        await this.page.waitFor(5500);
        const resultProfileName = await this.page.evaluate(resultProfilesArrayElement => resultProfilesArrayElement.textContent, resultProfilesArrayElement);
        // console.log("Element",resultProfilesArrayElement);
        console.log((n + 1), '-----------------------------', resultProfileName.trim());
        // await this.page.waitFor(5500);
        // await console.log(i);
        await resultProfilesArrayElement.click();
        await this.page.waitFor(15000);
        // await this.dataFetch.getName();
        await this.dataFetch.getData();
        await this.page.waitFor(2500);
    }

    async iterateOnProfiles() {
        await this.page.waitFor(4500);
        // const resultProfilesArray = await this.page.evaluate(() => Array.from(document.querySelectorAll('ul.search-results__list > li.search-result > div > div > div.search-result__info > a[data-control-name="search_srp_result"]')));
        const resultProfilesArray = await this.page.evaluate(() => Array.from(document.querySelectorAll('span[class="name actor-name"]')));
        await this.page.waitFor(1500);
        console.log("Result 'Profile' found in current page : ", resultProfilesArray.length);
        if (resultProfilesArray.length != 0) {
            for (let i = 0; i <= (resultProfilesArray.length - 1); i++) {
                await this.page.waitFor(5500);
                // i++;
                // await this.page
                // const resultProfilesArrayElement = (await this.page.$$('ul.search-results__list > li.search-result > div > div > div.search-result__info > a'))[i];
                await this.autoScroll();
                await this.page.waitFor(2500);
                // await this.autoScrollUp();
                await this.clickOnProfile(i);
                await this.page.waitFor(2500);
                await this.page.goBack();
                await this.page.waitFor(2500);

                // await this.page.waitForNavigation();
            }
        }

        else {
            console.log('Result Not Found');
        }
    }
    async searchPageProfileIterate() {
        const paginationArray = await this.page.evaluate(() => Array.from(document.querySelectorAll('ul.artdeco-pagination__pages.artdeco-pagination__pages--number > li')));
        const lastPageElement = (await this.page.$$('ul.artdeco-pagination__pages.artdeco-pagination__pages--number > li'))[paginationArray.length - 1];
        const lastPage = await this.page.evaluate(lastPageElement => lastPageElement.textContent, lastPageElement);
        console.log("Total Page Discovered : ", lastPage.trim());

        if (paginationArray.length != 0) {
            for (let i = 0; i < lastPage.trim(); i++) {
                await console.log("Search Result Page Number : " + (i + 1));
                await this.page.waitFor(2500);
                await this.iterateOnProfiles();
                await this.page.waitFor(2500);
                if (i < lastPage.trim()) {
                    console.log("IF : ", i);
                    await this.page.waitFor(2500);
                    await this.clickOnNextPage();
                    await this.page.waitFor(2500);
                } else {
                    console.log("Else : ", i);
                    break;
                }
            }
        } else {
            await this.page.waitFor(2500);
            await this.iterateOnProfiles();
            await this.page.waitFor(2500);
        }
    }
}