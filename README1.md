Software Requirements Documentation

System Architecture:
The proposed application will be built using the MERN stack, which consists of the following technologies:

1. MongoDB: A NoSQL database for storing event and user data.
2. Express.js: A backend framework for building the server and handling API requests.
3. React.js: A frontend library for building the user interface.
4. Node.js: A runtime environment for executing JavaScript code on the server.

The application will follow a client-server architecture, where the server will provide the backend functionality, handle authentication using JWT (JSON Web Tokens), and interact with the MongoDB database. The frontend will be developed using React.js to provide a dynamic and interactive user interface.

Deployment:
The application will be deployed on either GitHub or Vercel. Both platforms provide seamless integration with Git and support the deployment of Node.js applications. The choice between the two platforms will depend on specific requirements and preferences.

Frontend Development:
The frontend will be developed using React.js, a popular JavaScript library known for its component-based architecture and reusability.

Styling:
CSS will be used for styling the application. To improve development efficiency and maintainability, popular CSS frameworks such as Bootstrap, Tailwind CSS, or Material-UI can be utilized. The choice of the CSS framework will be based on the project's design requirements and the familiarity of the development team.

Security:
The application will implement security measures using JWT (JSON Web Tokens) for authentication and authorization. Additionally, the application will use Helmet, a middleware for Express.js, to enhance security by setting HTTP headers appropriately.

System Requirements Specification:
1. Application Overview:
The application aims to provide a platform for a conference center to advertise upcoming events. It will have two types of users:
   a. Normal end-users: They can view a list of upcoming events and click on "Read More" to see additional event details.
   b. Administrators: They can add new events, edit event information, cancel events, and view the level of interest generated for each event.

2. User Stories:
   a. As an end-user, I want to see a list of upcoming events so that I can stay updated.
   b. As an end-user, I want to click on "Read More" to view additional event details.
   c. As an administrator, I want to add new events to the system.
   d. As an administrator, I want to edit event details if there are any changes.
   e. As an administrator, I want to cancel events if necessary.
   f. As an administrator, I want to view the level of interest generated for each event.

3. Similar Software:
There might be existing event management systems or conference center applications available, but this application differentiates itself in the following ways:
   a. Focus on providing administrators with insights into the level of interest generated for each event.
   b. Implementation of JWT for secure authentication and authorization.
   c. Enhanced security measures using Helmet to set appropriate HTTP headers.

4. Functional Requirements:
   a. User Authentication: Implement authentication using JWT (JSON Web Tokens).
   b. Event Management: Enable administrators to add, edit, and cancel events.
   c. Event Listing: Display a list of upcoming events for end-users.
   d. Event Details: Show additional event details when the "Read More" button is clicked.
   e. Level of Interest: Display the level of interest generated for each event to administrators.
   f. Security: Implement JWT for secure authentication and authorization.
   g. Security Enhancements: Use Helmet middleware to set appropriate HTTP headers for enhanced security.

5. Non-functional Requirements:
   a. Performance: The application should be responsive and handle concurrent user interactions efficiently.
   b. Security: Implement secure authentication and protect user data using JWT and Helmet.
   c. Scalability: The system should be able to handle a growing number of events and users.
   d. Usability: The user interface should be intuitive, visually appealing, and accessible on various devices.
   e. Maintainability: Write clean and modular code, following best practices and coding standards.

