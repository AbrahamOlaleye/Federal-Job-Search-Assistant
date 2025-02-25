TITLE: Federal Job Search Assistant for College Students 

Description: 
Searching for a job is a difficult task that most, if not all, working-age adults face, especially if you are a student also juggling part-jobs or extracurriculars. There are often problems with information overload or asymmetry on existing job platforms where they present too many options like some social media features and unrelated job categories. This can become overwhelming for individuals who do not know where or how to search for desirable jobs effectively. To address this difficulty, we hope to assist young professionals and students by creating an easier job board experience, targeting college students in particular. 

We would like to make a database for jobs only. Our database will connect with the skills API to provide job recommendations aligned with the student`s skill sets, ensuring they can easily discover roles matching their experience and education. This will operate similarly to existing platforms, such as LinkedIn and Handshake, but exclude other features that may be distracting and detracting such as social media aspects and event advertisements.

The following API will be used to help with our database. 
https://github.com/workforce-data-initiative/skills-api/wiki/API-Overview
This API would be suitable for use in applications and uses like recommendation systems, workforce training tools, and/or platforms that match workers to relevant job opportunities and openings based on their skills. This API helps us access to standardized, up-to-date information about job roles, skills, and their relationships across industries. 

Description of target browsers:
The main stakeholders in this case are the students themselves, hiring managers and agents, employers, career centers, and educational institutions who would want a platform tailored to their students' needs. Our target browsers are the students who are in search for federal jobs. This is an appealing sector and industry as it addresses many disciplines while offering a wide variety of jobs requiring many different skills.
Our platform is optimized for desktop use and works seamlessly on modern web browsers like Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge. While it’s currently designed primarily for computers, we plan to explore mobile compatibility in the future to better support users on iOS and Android devices.
Given our context, among the university students, we believe that this tool will be the most useful for third or fourth year students (such as ourselves) as they are directly starting to think about employment after college.
Not everyone has access to these resources or how to use them, so we aim to help bridge these barriers and ease anxieties with our program.

Link to Developer Manual: 
<a href="https://github.com/ggellerm/INST377APITesting/tree/main?tab=readme-ov-file#developer-manual">Developer Manual</a>


### Developer Manual  
**Project Title**: Federal Job Search Assistant for College Students  

---

### Table of Contents  
1. **Installation**  
2. **Running the Application**  
3. **Running Tests**  
4. **API Endpoints**  
5. **Known Bugs**  
6. **Future Roadmap**  

---

### 1. Installation  

To set up the project locally, follow these steps:  

1. **Clone the repository**:  
   ```  
   git clone https://github.com/AbrahamOlaleye/Federal-Job-Search-Assistant.git  
   cd federal-job-search-assistant  
   ```  

2. **Install dependencies**:  
   Ensure you have **Node.js** (v16+) and **npm** installed. Run:  
   ```  
   npm install  
   ```  

3. **Set up environment variables**:  
   - Create a `.env` file in the root directory.  
   - Add your Supabase credentials:  
     ```  
     SUPABASE_URL=your_supabase_url  
     SUPABASE_KEY=your_supabase_api_key  
     PORT=3000  
     ```  

---

### 2. Running the Application  

To run the application locally:  

1. **Start the backend server**:  
   ```  
   node server.js  
   ```  
   The server will start at:  
   **http://localhost:3000**  

2. **Serve the frontend files**:  
   - Open `home.html` using **Live Server** in VSCode.  
   - Alternatively, manually open the file in your browser.  

3. **Access the application** at:  
   ```  
   http://127.0.0.1:5500/home.html  
   ```  

---

### 3. Running Tests  

- No automated tests have been implemented in this version.  
- Future developers are encouraged to write unit tests using tools like **Jest** or **Mocha**.  
- Integration tests for the API endpoints should also be prioritized.  

---

### 4. API Endpoints  

| **Method** | **Endpoint**                 | **Description**                                  |  
|------------|------------------------------|-------------------------------------------------|  
| **GET**    | `/api/externalJobs/:keyword` | Fetch job data from the USAJobs external API.    |  
| **GET**    | `/api/getJobs`               | Retrieve all saved jobs from Supabase.           |  
| **POST**   | `/api/addJob`                | Save a job to the Supabase database.             |  

**Example Request for `/api/addJob`**:  

- **URL**: `http://localhost:3000/api/addJob`  
- **Method**: POST  
- **Body** (JSON):  
   ```json  
   {  
     "title": "Civil Engineer",  
     "company": "Bureau of Reclamation",  
     "location": "Sacramento, CA",  
     "posted_date": "2024-12-11",  
     "url": "https://example.com/job/123"  
   }  
   ```  

---

### 5. Known Bugs  

1. **Mobile Compatibility**:  
   - The application works on desktop browsers but not on mobile devices.  

2. **API Rate Limit**:  
   - Frequent calls to the USAJobs API may hit its rate limit and return errors.  
   - Explore caching solutions to reduce API requests.  

---

### 6. Future Roadmap  

- **Mobile Optimization**: Make the application responsive for iOS and Android devices.  
- **User Authentication**: Add user accounts to allow saving jobs under individual profiles.  
- **Advanced Search Filters**: Include filters like location, salary range, and job type.  
- **Skills-Based Recommendations**: Integrate the **Skills API** for personalized job suggestions.  
- **Testing Suite**: Implement automated unit and integration tests.  
- **Performance Improvements**: Optimize API calls with caching and pagination.  

---

### Notes for Future Developers  
- Update this document regularly as new features, bugs, or changes occur.  
- Use version control (e.g., Git) to track changes and manage contributions.  
- Ensure code consistency and readability.  

---

This document provides everything you need to **install**, **run**, and **understand** the system. If you have any issues or suggestions, please document them for future developers.
