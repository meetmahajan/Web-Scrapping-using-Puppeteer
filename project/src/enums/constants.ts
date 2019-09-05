export enum Constants {
    username = 'lorell19@alcoholetn.com',
    password = 'ashutec@2017',
    signInUrl = 'https://www.linkedin.com/login?trk =guest_homepage-basic_nav-header-signin/',
    feedUrl = 'https://www.linkedin.com/feed/',
    cookieFile = './linkedinCookies.json',
    searchPeopleKeyword = 'Amit Bhogle',
    USERNAME_SELECTOR = "#username",
    PASSWORD_SELECTOR = '#password',
    LOGIN_SELECTOR = '#app__container > main > div > form > div.login__form_action_container > button',
    SEARCH_SELECTOR = 'input[aria-label="Search"]',
    ALL_FILTER_SELECTOR = 'button[data-control-name="all_filters"]',
    CHECK_FIRST_SELECTOR = '#connections-facet-values > fieldset > ol > li:nth-child(1)',
    CHECK_SECOND_SELECTOR = '#connections-facet-values > fieldset > ol > li:nth-child(2)',
    CHECK_THIRD_SELECTOR = '#connections-facet-values > fieldset > ol > li:nth-child(3)',
    ADD_LOCATION_FILTER_SELECTOR = 'input[aria-label="Add a location"]',
    ADD_PRO_BONO_SELECTOR = 'input[value="proBono"]',
    // ADD_BOARD_MEMBER_SELECTOR = 'input[id="sf-contactInterest-boardMember"]',
    ADD_PROFILE_LANGUAGE_SELECTOR = '#profile-language-facet-values > fieldset > ol > li',
    ADD_CURRENT_COMPANIES_FILTER = 'input[aria-label="Add a current company"]',
    ADD_PAST_COMPANIES_FILTER = 'input[aria-label="Add a previous company"]',
    ADD_INDUSTRIES_FILTER = 'input[aria-label="Add an industry"]',
    ADD_SCHOOL_FILTER = 'input[aria-label="Add a school"]',
    ADD_ADVANCE_FILTER_FIRSTNAME = '#search-advanced-firstName',
    ADD_ADVANCE_FILTER_LASTNAME = '#search-advanced-lastName',
    ADD_ADVANCE_FILTER_TITLE = '#search-advanced-title',
    ADD_ADVANCE_FILTER_COMPANY = '#search-advanced-company',
    ADD_ADVANCE_FILTER_SCHOOL = '#search-advanced-school',
    APPLY_FILTERS_SELECTOR = 'button[data-control-name="all_filters_apply"]',
    DIV_ROLE_OPTION_SELECTOR = 'div[role="option"]',
    PROFILE_LANGUAGE_ITERATE_SELECTOR = '#profile-language-facet-values > fieldset > ol > li',
    CONNECTIONS_OF_SELECTOR = 'input[aria-label="Add connection of"]',
    PROFILE_SELECTOR_GETNAME = 'li[class="inline t-24 t-black t-normal break-words"]',
    PROFILE_SELECTOR_GET_JOB_DESCRIPTION = 'h2[class="mt1 t-18 t-black t-normal"]',
    PROFILE_SELECTOR_CONTACT_PROFILE = 'a[data-control-name="contact_see_more"]',
    PROFILE_SELECTOR_CONTACT_PROFILE_LINK = 'div.pv-contact-info__ci-container > a',
    isApplyFilter = 'false',
    isFirstCheck = 'false',
    isSecondCheck = 'false',
    isThirdCheck = 'false',
    isConnectionOf = 'true',
    isLocationAdd = 'false',
    isProbono = 'false',
    isProfileLanguage = 'false',
    isCurrentCompaniesAdd = 'false',
    isPastCompaniesAdd = 'false',
    isIndustryAdd = 'false',
    isSchoolAdd = 'false',
    isAdvanceSearchFirstName = 'false',
    isAdvanceSearchLastName = 'false',
    isAdvanceSearchTitle = 'false',
    isAdvanceSearchCompany = 'false',
    isAdvanceSearchSchool = 'false',
    firstName = 'Meet',
    lastName = 'Mahajan',
    title = 'Software Engineer',
    company = 'Ashutec',
    school = 'GTU',
    connectOf = 'Meet Mahajan'
}
export const location = ['Bengkulu', 'Pune', 'Ahmedabad'];
export const currentCompanies = ['Capgemini', 'Ashutec', 'Infosys', 'Sprinklr'];
export const pastCompanies = ['Microsoft', 'Google', 'Facebook'];
export const industries = ['Computer Software', 'Computer & Network Security'];
export const schools = ['Gujarat Technological University', 'Illinois Institute of Technology'];