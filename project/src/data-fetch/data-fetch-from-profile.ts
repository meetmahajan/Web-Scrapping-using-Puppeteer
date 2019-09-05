import { Constants } from './../enums/constants';
export class dataFetchFromProfile {
    page: any;
    constructor(page) {
        this.page = page;
    }

    async getData() {
        await this.page.waitFor(1500);
        await this.getName();
        await this.page.waitFor(1500);
        await this.getJobDescription();
        await this.page.waitFor(1500);
        await this.getLinkedInProfileLink();
    }

    async getName() {
        const getNameSelect = await this.page.$(Constants.PROFILE_SELECTOR_GETNAME);
        const getNameSelectTextContent = await this.page.evaluate(getNameSelect => getNameSelect.textContent, getNameSelect);
        console.log("Profile Name : ", getNameSelectTextContent.trim());
    }

    separateRoleAndJob(roleJob: string) {
        const separateRoleAndCompany = roleJob.split(" at ");
        const getRole = separateRoleAndCompany[0].trim();
        const getCompany = separateRoleAndCompany[1].trim();
        return [getRole, getCompany];
    }

    async getJobDescription() {
        const getJobDescriptionSelect = await this.page.$(Constants.PROFILE_SELECTOR_GET_JOB_DESCRIPTION);
        const getJobDescriptionContent = await this.page.evaluate(getJobDescriptionSelect => getJobDescriptionSelect.textContent, getJobDescriptionSelect);
        console.log("Job Description : ", getJobDescriptionContent.trim());

        if (getJobDescriptionContent.includes(" at ")) {
            const [role, company] = this.separateRoleAndJob(getJobDescriptionContent);
            console.log("Role : ", role);
            console.log("Company : ", company);

        }
    }

    async getLinkedInProfileLink() {
        const getProfileLinkSelector = await this.page.$(Constants.PROFILE_SELECTOR_CONTACT_PROFILE);
        // const profileLink = await this.page.evaluate(getProfileLinkSelector => getProfileLinkSelector.textContent, getProfileLinkSelector);
        // console.log("Profile Link : ", profileLink.trim()); PROFILE_SELECTOR_CONTACT_PROFILE_LINK
        await getProfileLinkSelector.click();
        await this.page.waitFor(3500);

        const getLinkSelector = await this.page.$(Constants.PROFILE_SELECTOR_CONTACT_PROFILE_LINK);
        // console.log(getLinkSelector);
        const profileLink = await this.page.evaluate(getLinkSelector => getLinkSelector.textContent, getLinkSelector);

        console.log("Profile Link : ", profileLink.trim());
        await this.page.goBack();
    }
}