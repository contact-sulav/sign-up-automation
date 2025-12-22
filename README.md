"# sign-up-automation" 

Tech Stack
JavaScript – Main programming language used for writing tests
Playwright – Automates browser interactions and testing
Node.js – Runtime environment to execute the tests
JSON – Stores test data in a simple and reusable format
Mailosaur – Handles OTP emails during automated signup tests

Features
Automatically fills out signup forms
Reads and verifies OTP from email
Uploads required files
Validates successful form submission
Confirms the correct URL after signup completion

Setup Instructions

Clone the repository:
git clone https://github.com/contact-sulav/sign-up-automation.git


Install the required dependencies:
npm install

Run the tests:

With browser UI:
npx playwright test --headed


Using Playwright Test UI:
npx playwright test --ui