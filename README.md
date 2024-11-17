# Contact Management System

A web application designed to manage contact details for individuals and organizations. It allows users to add, edit, delete, and view contact information in a structured table format. The system supports pagination to display a limited number of contacts per page, and data is stored in a backend database.

## Key Features:

- CRUD Operations: Create, Read, Update, and Delete contacts.
- Pagination: Displays contacts with pagination to improve performance when dealing with large datasets.
- Error Handling: Displays alerts for error situations such as duplicate phone numbers during contact creation.
- State Management: Using redux toolkit states are managed perfectly
- Validation: Ensure proper validation for avoiding duplicate contact

## Technologies Used:

- Frontend: React.js, Material-UI, Redux
- Backend: Node.js, Express.js
- API EndPoints:
    - GET /contacts: Fetches all contacts from the database.
    - POST /contacts: Creates a new contact.
    - PUT /contacts/:id: Updates an existing contact by its ID.
    - DELETE /contacts/:id: Deletes a contact by its ID.
- Database: MongoDB
- State Management: Redux Toolkit
- Pagination: MUI TablePagination
- Axios: For making API calls to fetch and manage data.

## Database Schema: 
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true},
  phoneNumber: { type: String, required: true, unique: true },
  company: { type: String },
  jobTitle: { type: String }
});

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
     git clone https://github.com/SanjaySk7/Contact_Management_System.git
   
2. Navigate to the project directory:
   cd contact_management_system
   
3. Install Backend Dependencies:
    Go to the server directory:
   cd backend
   npm install
   
4. Set up your database:
     MONGO_URI=mongodb+srv://sanjaysubramaniyam2002:contact123@cluster0.04dy9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

5. Run the application:
      npx nodemon server.js

6. Install Frontend Dependencies:
    Go back to the root project directory:
   cd ../frontend
   npm install
   
7. Start the development server:
    npm start

8. Open your browser and visit http://localhost:3000 to view the app.



## Challenges and Solutions
1. Managing Reducers, Slices, and Saga Files
  - Problem: One of the significant challenges I faced during the project was maintaining the structure and organization of the Redux-related files, including reducers, slices, and sagas. Initially, I struggled with ensuring that each part of the Redux architecture was correctly connected and managed. Specifically, I faced difficulties with handling asynchronous actions, managing state updates correctly, and ensuring proper separation of concerns between the reducer, slice, and saga files.
  - Solution: After some research and exploring best practices, I found the key to solving this issue was to:
      - Centralize API calls: I moved API calls to the saga files to handle side effects. This kept the reducer and slice focused on pure state management, reducing complexity.
      - Separation of concerns: I ensured that each part of the Redux flow (reducer, slice, and saga) was only responsible for its specific task:
          - The slice file managed the state structure and actions for each feature.
          - The reducer file was responsible for updating the state based on the actions dispatched.
          - The saga file managed side effects (like fetching data from an API) asynchronously and dispatched appropriate actions.
  - By applying these best practices and doing some in-depth research on handling complex Redux architectures, I was able to successfully implement and maintain the Redux state management in the app, ensuring smooth communication between the components and the backend. 

## Major Technical Decisions

1. State Management with Redux Toolkit
    - Reasoning: For this project, Redux Toolkit was chosen to manage the application state. This decision was made because Redux provides a centralized store, making it easier to manage and share state across components. The Redux Toolkit simplifies the Redux workflow with built-in reducers and actions, reducing boilerplate code.
    - How it works: We use Redux to manage the state for the contacts, including fetching contact details, editing, updating, and deleting contacts. The state is managed globally, making it easier to propagate changes throughout the app without the need for prop drilling.

2. MongoDB as the Database
   - Reasoning: MongoDB was chosen due to its flexible schema and scalability. It’s a NoSQL database, making it ideal for handling unstructured data like contact information, which can vary between entries.
   - How it works: The MongoDB database stores the contact information in a simple schema. Each contact document contains fields such as first name, last name, email, phone number, company, and job title. MongoDB’s ability to handle dynamic data makes it a good fit for the project.


   
