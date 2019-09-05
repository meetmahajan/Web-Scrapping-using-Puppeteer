/*
constants.ts contains all the static string, such as url,file{source and destination},username and password
*/
import { Constants, location, currentCompanies, pastCompanies, industries, schools } from '../enums/constants';
export class SearchFilterLinkedIn {
    page: any;
    isTrue: String = 'true';
    constructor(page: any) {
        this.page = page;
    }

    /*
    searchPeople(page:any) will select the SearchBox in LinkedIn and Search for People keyword  
    */
    async searchPeople() {
        //select the Search box      
        const searchBoxSelection = (await this.page.$(Constants.SEARCH_SELECTOR));
        await searchBoxSelection.click();
        await this.page.waitFor(5000);
        //type 'People' Keyword
        await this.page.keyboard.type(Constants.searchPeopleKeyword, { delay: 1000 });
        await this.page.waitFor(5000);
        await this.page.keyboard.press('Enter');
        await this.page.waitFor(5000);
        if (Constants.isApplyFilter === this.isTrue) {
            // Click on All Filters
            await this.filterSearch();
            await this.page.waitFor(2000);
            //Apply given Filters
            await this.applyAllFilters();
        }
        //Take a screenshot of Search Page
        await this.page.screenshot({ path: './images/searchPage.jpg', fullPage: true });
        await this.page.waitFor(5000);
    }
    /* Click on AllFilters and wait for 5 seconds */
    async filterSearch() {
        const clickOnFilter = (await this.page.$(Constants.ALL_FILTER_SELECTOR));
        await clickOnFilter.click();
        await this.page.waitFor(5000);
    }
    /* Apply Filters available in Linked-In */
    async applyAllFilters() {
        if (Constants.isApplyFilter === this.isTrue) {
            console.log('-------Applying Filters on Search Result-------');
            /* Add type of Connections to Filters */
            console.log("Applying filters on Connection");
            await this.addTypeofConnection();
            // await this.checkFirstConnection();
            // await this.checkSecondConnection();
            // await this.checkThirdConnection();

            /* Add 'Connections of' to Filters */
            console.log("Applying filters on Connection Of");
            await this.addConnectionOfFilter();

            /* Add Locations from location array declared in Constants */
            console.log("Applying filters on Location");
            await this.addLocationFilter();

            /* Add type of Contact Interest */
            console.log("Applying filters on Contact Interest");
            await this.addContactInterest();

            /* Add type of Profile Language */
            console.log("Applying filters on Profile Language");
            await this.addProfileLanguage();

            /* Add Current Companies from currentCompanies array declared in Constants */
            console.log("Applying filters on Current Companies");
            await this.addCurrentCompanies();

            /* Add Past Companies from pastCompanies array declared in Constants */
            console.log("Applying filters on Past Companies");
            await this.addPastCompanies();

            /* Add Industries from industries array declared in Constants */
            console.log("Applying filters on Industries");
            await this.addIndustries();

            /* Add Schools from schools array declared in Constants */
            console.log("Applying filters on School");
            await this.addSchool();

            /* Add Advance Filter */
            console.log("Applying filters on Advance Filter");
            await this.addAdvanceSearch();

            /* Click on Apply Filters Button */
            const applyFilterButton = (await this.page.$(Constants.APPLY_FILTERS_SELECTOR));
            await applyFilterButton.click();
            await this.page.waitFor(2000);

            console.log('-------Applied all kind of mentioned Filters on Search Result-------');
        }
    }
    async addTypeofConnection() {
        /* Tick Checkbox for 1st Connection in All Filters */
        if (Constants.isFirstCheck === this.isTrue) {
            const checkFirst = (await this.page.$(Constants.CHECK_FIRST_SELECTOR));
            await checkFirst.click();
            await this.page.waitFor(2000);
        }
        /* Tick Checkbox for 2nd Connection in All Filters */
        if (Constants.isSecondCheck === this.isTrue) {
            const checkFirst = (await this.page.$(Constants.CHECK_SECOND_SELECTOR));
            await checkFirst.click();
            await this.page.waitFor(2000);
        }
        /* Tick Checkbox for 3rd Connection in All Filters */
        if (Constants.isThirdCheck === this.isTrue) {
            const checkFirst = (await this.page.$(Constants.CHECK_THIRD_SELECTOR));
            await checkFirst.click();
            await this.page.waitFor(2000);
        }
    }
    async addConnectionOfFilter() {
        if (Constants.isConnectionOf === this.isTrue) {
            const connectionOf = await this.page.$(Constants.CONNECTIONS_OF_SELECTOR);
            await this.page.waitFor(2000);
            await connectionOf.click();
            await this.page.waitFor(2500);
            await this.page.keyboard.type(Constants.connectOf, { delay: 250 });
            await this.page.waitFor(2000);
            // await this.page.keyboard.press('Enter');
            await this.page.keyboard.press('ArrowDown');
            await this.page.waitFor(3500);
            await this.page.keyboard.press('Enter');
        }
    }
    /* Add Location Filter based on array declared in Constants */
    async addLocationFilter() {
        if (Constants.isLocationAdd === this.isTrue) {
            // Click on Location Input
            const addLocation = (await this.page.$(Constants.ADD_LOCATION_FILTER_SELECTOR));
            await addLocation.click();
            // await this.page.waitFor(5500);
            await this.page.waitFor(5000);
            /* iterate location array loop to select all the locations mention in array */
            for (let i = 0; i < location.length; i++) {
                // Write Location in input box
                // console.log(location[i]);
                await this.page.waitFor(2000);
                await this.page.keyboard.type(location[i], { delay: 250 });
                await this.page.waitFor(5000);
                /*
                    Fetch the suggested location in the form of array and store it in `locationListDropDownArray`
                    Iterate that array and fetch `locationName` from `locationListDropDownArray`
                    Compare `locationName` with `constants.js > location array` and check that location for filtering
                */
                // const locationListDropDown = (await this.page.$('div[role="listbox"]'));
                const div_option = Constants.DIV_ROLE_OPTION_SELECTOR;
                const locationListDropDownArray = await this.page.evaluate((div_option) => Array.from(document.querySelectorAll(div_option)), div_option);
                // const locationNames = await this.page.evaluate(locationListDropDown => locationListDropDown.innerHTML, locationListDropDown);
                await this.page.waitFor(3000);
                for (let j = 0; j < locationListDropDownArray.length; j++) {
                    const locationListDropDown = (await this.page.$$(Constants.DIV_ROLE_OPTION_SELECTOR))[j];
                    const locationName = await this.page.evaluate(locationListDropDown => locationListDropDown.textContent, locationListDropDown);
                    // console.log(locationName.trim());
                    if (locationName.includes(location[i])) {
                        /* console.log(location[0]," -- ", locationName.trim());
                        await this.page.keyboard.press('ArrowDown'); */
                        await locationListDropDown.click();
                        await this.page.keyboard.press('Enter');
                        break;
                    }
                    /* if (locationName.includes(location[0])){
                        await this.page.keyboard.press('ArrowDown');
                        console.log(locationName);            
                        await this.page.keyboard.press('Enter');
                    } */
                }
            }
        }
    }
    /* Add Contact Interest Filter available in Filter */
    async addContactInterest() {
        /* Select and Check ProBono checkbox  */
        if (Constants.isProbono === this.isTrue) {
            const addProBono = (await this.page.$(Constants.ADD_PRO_BONO_SELECTOR));
            await addProBono.click();
            await this.page.waitFor(2000);
        }
    }
    /* Add Profile Language Filter available in Filter */
    async addProfileLanguage() {
        if (Constants.isProfileLanguage === this.isTrue) {
            /* Fetch array of Profile Language Element */
            const profileSelector = Constants.PROFILE_LANGUAGE_ITERATE_SELECTOR
            const profileLanguageArray = await this.page.evaluate((profileSelector) => Array.from(document.querySelectorAll(profileSelector)), profileSelector);
            await this.page.waitFor(3000);
            /* Iterate Profile Language Array and fetch language */
            for (let i = 0; i < profileLanguageArray.length; i++) {
                /* Iterate on each element and fetch details */
                const profileLanguageList = (await this.page.$$(Constants.PROFILE_LANGUAGE_ITERATE_SELECTOR))[i];
                const profileLanguage = await this.page.evaluate(profileLanguageList => profileLanguageList.textContent, profileLanguageList);
                if (profileLanguage.trim().includes("English")) {
                    await profileLanguageList.click();
                    await this.page.waitFor(5000);
                }
            }
        }
    }
    /* Add Current Company Filter available in Filter */
    async addCurrentCompanies() {
        if (Constants.isCurrentCompaniesAdd === this.isTrue) {
            /* Select current company */
            const addCurrentCompany = (await this.page.$(Constants.ADD_CURRENT_COMPANIES_FILTER));
            await addCurrentCompany.click();
            await this.page.waitFor(5000);
            /* iterate array for current company and fetch data from constants */
            const div_option = Constants.DIV_ROLE_OPTION_SELECTOR;
            for (let j = 0; j < currentCompanies.length; j++) {
                await this.page.waitFor(2000);
                await this.page.keyboard.type(currentCompanies[j], { delay: 250 });
                await this.page.waitFor(5000);
                const currentCompanyListDropDownArray = await this.page.evaluate((div_option) => Array.from(document.querySelectorAll(div_option)), div_option);
                await this.page.waitFor(5000);
                /* select current company mentioned in constants */
                for (let i = 0; i < currentCompanyListDropDownArray.length; i++) {
                    const currentCompanyListDropDown = (await this.page.$$(Constants.DIV_ROLE_OPTION_SELECTOR))[i];
                    const currentCompany = await this.page.evaluate(currentCompanyListDropDown => currentCompanyListDropDown.textContent, currentCompanyListDropDown);
                    if (currentCompany.includes(currentCompanies[j])) {
                        await currentCompanyListDropDown.click();
                        await this.page.keyboard.press('Enter');
                        break;
                    }
                }
            }
        }
    }
    /* Add Past Company Filter available in Filter */
    async addPastCompanies() {
        if (Constants.isPastCompaniesAdd === this.isTrue) {
            /* Select past company */
            const addPastCompany = (await this.page.$(Constants.ADD_PAST_COMPANIES_FILTER));
            await this.page.waitFor(2000);
            // await console.log(addPastCompany);
            await addPastCompany.click();
            await this.page.waitFor(5000);
            const div_option = Constants.DIV_ROLE_OPTION_SELECTOR;
            for (let j = 0; j < pastCompanies.length; j++) {
                /* iterate array for past company and fetch data from constants */
                await this.page.waitFor(2000);
                await this.page.keyboard.type(pastCompanies[j], { delay: 250 });
                await this.page.waitFor(5000);
                const pastCompanyListDropDownArray = await this.page.evaluate((div_option) => Array.from(document.querySelectorAll(div_option)), div_option);
                await this.page.waitFor(5000);
                /* select past company mentioned in constants */
                for (let i = 0; i < pastCompanyListDropDownArray.length; i++) {
                    const pastCompanyListDropDown = (await this.page.$$(Constants.DIV_ROLE_OPTION_SELECTOR))[i];
                    const pastCompany = await this.page.evaluate(pastCompanyListDropDown => pastCompanyListDropDown.textContent, pastCompanyListDropDown);
                    if (pastCompany.includes(pastCompanies[j])) {
                        await pastCompanyListDropDown.click();
                        await this.page.keyboard.press('Enter');
                        break;
                    }
                }
            }
        }
    }
    /* Add Industry Filter available in Filter */
    async addIndustries() {
        if (Constants.isIndustryAdd === this.isTrue) {
            /* Select Industry input box */
            const addIndustries = (await this.page.$(Constants.ADD_INDUSTRIES_FILTER));
            await this.page.waitFor(2000);
            await addIndustries.click();
            await this.page.waitFor(5000);
            const div_option = Constants.DIV_ROLE_OPTION_SELECTOR;
            for (let j = 0; j < industries.length; j++) {
                /* iterate array for industry and fetch data from constants */
                await this.page.waitFor(2000);
                await this.page.keyboard.type(industries[j], { delay: 250 });
                await this.page.waitFor(5000);
                const industryListDropDownArray = await this.page.evaluate((div_option) => Array.from(document.querySelectorAll(div_option)), div_option);
                await this.page.waitFor(5000);
                // console.log(industryListDropDownArray.length);
                /* select industry mentioned in constants */
                for (let i = 0; i < industryListDropDownArray.length; i++) {
                    const industryListDropDown = (await this.page.$$(Constants.DIV_ROLE_OPTION_SELECTOR))[i];
                    const industryName = await this.page.evaluate(industryListDropDown => industryListDropDown.textContent, industryListDropDown);
                    if (industryName.includes(industries[j])) {
                        await industryListDropDown.click();
                        await this.page.keyboard.press('Enter');
                        break;
                    }
                }
            }
        }
    }
    /* Add School Filter available in Filter */
    async addSchool() {
        if (Constants.isSchoolAdd === this.isTrue) {
            /* Select School input box */
            const addSchools = (await this.page.$(Constants.ADD_SCHOOL_FILTER));
            await this.page.waitFor(2000);
            await addSchools.click();
            await this.page.waitFor(5000);
            const div_option = Constants.DIV_ROLE_OPTION_SELECTOR;
            for (let j = 0; j < schools.length; j++) {
                /* iterate array for schools and fetch data from constants */
                await this.page.waitFor(2000);
                await this.page.keyboard.type(schools[j], { delay: 250 });
                await this.page.waitFor(5000);
                const schoolListDropDownArray = await this.page.evaluate((div_option) => Array.from(document.querySelectorAll(div_option)), div_option);
                await this.page.waitFor(5000);
                // console.log(industryListDropDownArray.length);
                /* select schools mentioned in constants */
                for (let i = 0; i < schoolListDropDownArray.length; i++) {
                    const schoolListDropDown = (await this.page.$$(Constants.DIV_ROLE_OPTION_SELECTOR))[i];
                    const schoolName = await this.page.evaluate(schoolListDropDown => schoolListDropDown.textContent, schoolListDropDown);
                    if (schoolName.includes(schools[j])) {
                        await schoolListDropDown.click();
                        await this.page.keyboard.press('Enter');
                        break;
                    }
                }
            }
        }
    }
    /* Add Advance Search Filter available in Filter */
    async addAdvanceSearch() {
        /* select First name input box and enter desired text in advance search */
        if (Constants.isAdvanceSearchFirstName === this.isTrue) {
            const addFirstName = (await this.page.$(Constants.ADD_ADVANCE_FILTER_FIRSTNAME));
            await this.page.waitFor(2000);
            await addFirstName.click();
            await this.page.waitFor(2500);
            await this.page.keyboard.type(Constants.firstName, { delay: 250 });
            await this.page.waitFor(2000);
            await this.page.keyboard.press('Enter');
        }
        /* select Last name input box and enter desired text in advance search */
        if (Constants.isAdvanceSearchLastName === this.isTrue) {
            const addLastName = (await this.page.$(Constants.ADD_ADVANCE_FILTER_LASTNAME));
            await this.page.waitFor(2000);
            await addLastName.click();
            await this.page.waitFor(2500);
            await this.page.keyboard.type(Constants.lastName, { delay: 250 });
            await this.page.waitFor(2000);
            await this.page.keyboard.press('Enter');
        }
        /* select Title input box and enter desired text in advance search */
        if (Constants.isAdvanceSearchTitle === this.isTrue) {
            const addTitle = (await this.page.$(Constants.ADD_ADVANCE_FILTER_TITLE));
            await this.page.waitFor(2000);
            await addTitle.click();
            await this.page.waitFor(2500);
            await this.page.keyboard.type(Constants.title, { delay: 250 });
            await this.page.waitFor(2000);
            await this.page.keyboard.press('Enter');
        }
        /* select Company input box and enter desired text in advance search */
        if (Constants.isAdvanceSearchCompany === this.isTrue) {
            const addAdvanceCompany = (await this.page.$(Constants.ADD_ADVANCE_FILTER_COMPANY));
            await this.page.waitFor(2000);
            await addAdvanceCompany.click();
            await this.page.waitFor(2500);
            await this.page.keyboard.type(Constants.company, { delay: 250 });
            await this.page.waitFor(2000);
            await this.page.keyboard.press('Enter');
        }
        /* select School input box and enter desired text in advance search */
        if (Constants.isAdvanceSearchSchool === this.isTrue) {
            const addAdvanceSchool = (await this.page.$(Constants.ADD_ADVANCE_FILTER_SCHOOL));
            await this.page.waitFor(2000);
            await addAdvanceSchool.click();
            await this.page.waitFor(2500);
            await this.page.keyboard.type(Constants.school, { delay: 250 });
            await this.page.waitFor(2000);
            await this.page.keyboard.press('Enter');
        }
    }
}