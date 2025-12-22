"# sign-up-automation" 

"# sign-up-automation" 

Tech Stack

-JavaScript
-Playwright
-Node.js
-JSON (test data)
-Mailosaur (OTP email handling)

Features
-Automated signup form filling
-OTP verification via email
-Multi-step form submission
-File upload validation
-Final URL verification after signup

Project Structure
sign-up-automation/
├── tests/
├── test-data/
├── images/
├── playwright.config.js
├── .env
└── README.md

Environment Setup
Create a .env file in the root folder:

API_Key=your_mailosaur_api_key
Server_ID=your_mailosaur_server_id
BASE_URL=your_application_url

Installation
Clone the repo:
git clone https://github.com/contact-sulav/sign-up-automation.git


Install dependencies:
npm install

Install Playwright browsers:

npx playwright install

Run Tests

Run with browser:
npx playwright test --headed


Run using Playwright UI:
npx playwright test --ui

Test Flow
-Open application
-Fill signup form
-Receive OTP from email
-Verify OTP
-Fill agency & business details
-Upload required file
-Submit form
-Verify successful signup URL
