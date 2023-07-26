## Introduction
Conference Central is a web application that helps organize and manage various events throughout the year. This app allows users to browse upcoming events, view event details, and register for events they are interested in. Additionally, administrators have access to the Admin Page, where they can create, update, and delete events.

## How to Use the App
To use the app, follow the steps below:

Browse the home page to view upcoming events. Login/Register and click the "Read More" button to view detailed event information.

If you are an administrator, login to view the Admin Page by clicking the "Admin" link in the navigation bar. Only users with an "admin" role can access this page.

## (for admin privileges I have made an admin user with the login details USERNAME: admin PASSWORD: adminpassword)

On the Admin Page, you can create new events using the "Create Event" form. You can also edit existing events by clicking the "Edit" button on each event card, or delete events using the "Delete" button. You can also see the interest in an event by noting the click counter showing how many times a "read more" button has been clicked by users

## How to Install and Run Locally
Follow these steps to install and run the app on your local machine

1. Clone the files to your local machine

2. cd conferencecentral
    Install dependencies by running npm install in your CLI
    repeat this for the folders "backend" and "frontend"

3. cd to the root folder conferencecentral and run npm start. this should run the backend and frontend concurrently.


## Security Measures
Conference Central implements various security measures to ensure data privacy and integrity:

Authentication and Authorization: User access to the Admin Page is restricted to users with an "admin" role.

Secure API Key Handling: API keys and sensitive information are stored in environment variables and accessed using the dotenv package. These environment variables are kept private and are not exposed in the frontend code.

## Third-Party APIs
Conference Central does not use any third-party APIs.

## Deployment
The application has been deployed using Vercel. Both the backend and frontend are deployed together as a single integrated app. Vercel provides an easy-to-use platform for deploying static frontend applications and serverless functions, making it an ideal choice for this project. The automatic deployment integration and scalability of Vercel ensure a seamless experience for users.

https://vercel.com/halfpint92/conference-central/2v3jWpMsJBdocJTthzsjyf3KfPKV