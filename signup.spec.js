import test, { chromium, expect } from '@playwright/test';
import data from "../test-data/signup.json";
import path from 'path';
const filePath = path.resolve('images/images.jpg');
import MailosaurClient from 'mailosaur';
const mailosaur = new MailosaurClient(process.env.API_Key);
const serverId = process.env.Server_ID;
const baseurl = process.env.BASE_URL;

test.describe('Signup Automation', () => {
    test.setTimeout(120000);
   
    test('Sign up', async ({ page }) => {

        const testEmail = `user-${Date.now()}@${serverId}.mailosaur.net`;
    //    navigate to website
        await page.goto(process.env.BASE_URL);
        await expect(page.locator('(//img[@alt="logo"])[1]')).toBeVisible();
        await page.locator('(//button)[1]').click();
        await expect(page.locator('//h3')).toContainText('Register Your Agency');
        await page.locator('[id="remember"]').check();
        await page.locator('//button[text()="Continue"]').click();
        await expect(page.locator('//h2')).toContainText('Complete Your Agent Profile in Steps');
        await page.locator('input[name="firstName"]').fill(data.firstName);
        await page.locator('input[name="lastName"]').fill(data.lastName);
        await page.locator('input[type="email"]').fill(testEmail);
        await page.locator('input[name="phoneNumber"]').fill(data.phonenumber);
        await page.locator('input[name="password"]').fill(data.password);
        await page.locator('input[name="confirmPassword"]').fill(data.confirmPassword);
        await page.locator('button[type=submit]').click();
        await expect(page.locator('(//h2)[2]')).toHaveText('Email Verification code');

        // OTP-Validation
        const email = await mailosaur.messages.get(serverId, {
            sentTo: testEmail,
            timeout: 90000,
        });
        const otp = email.html.codes[0].value;
        
        await page.locator('input[autocomplete="one-time-code"]').fill(otp);
        await page.getByRole('button', { name: 'Verify Code' }).click();

        // agency details

        await page.locator('[name="agency_name"]').fill(data.agencyName);
        await page.locator('[name="role_in_agency"]').fill(data.roleInAgency);
        await page.locator('[name="agency_email"]').fill(data.emailAddress);
        await page.locator('[name="agency_website"]').fill(data.website);
        await page.locator('[name="agency_address"]').fill(data.Address);
        await page.locator('[data-state="closed"]').click();
        await page.getByText('Australia', { exact: true }).click();
        await page.locator('[type="submit"]').click();

        //Experience and Performance Metrics
        await page.locator('text=Select Your Experience Level').click();
        await page.locator('div[role="option"]', { hasText: '1 year' }).click();
        await page.locator('input[name="number_of_students_recruited_annually"]').fill(data.numberOfStudents);
        await page.locator('input[name="focus_area"]').fill(data.focusArea);
        await page.locator('input[name="success_metrics"]').fill(data.successMetrics);
        await page.getByText('Career Counseling', { exact: true }).click();
        await page.getByText('Admission Applications', { exact: true }).click();
        await page.getByText('Visa Processing', { exact: true }).click();
        await page.getByText('Test Prepration', { exact: true }).click();
        await page.locator('[type="submit"]').click();

        // Business Details and Set Preferences

        await page.locator('input[name="business_registration_number"]').fill(data.busRegNumber);
        await page.locator('[data-state="closed"]').click();
        await page.getByText('Australia', { exact: true }).click();
        await page.getByText('Universities', { exact: true }).click();
        await page.locator('input[name="certification_details"]').fill(data.certDetails);

        // upload image
        await page.locator('input[type="file"]').first().setInputFiles(filePath);
        await page.click('button[type="submit"]');

        await expect(page).toHaveURL(`${process.env.BASE_URL}admin/profile`, {
            timeout: 18000,
        });

    });

});