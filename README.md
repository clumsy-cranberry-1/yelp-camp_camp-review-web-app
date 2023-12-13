# Yelp-Camp -> Campsite Review Web App

This project is a web application that allows campsite owners to list their camp sites with images, descriptions, locations, pricing, and other details. Visitors can review and rate the campsites. The application is built using the model-view-controller (MVC) software architecture pattern.

## Technologies Used

- **Frontend Languages:**
  - HTML
  - CSS
  - JavaScript
  - EJS

- **Backend Languages:**
  - Node.js
  - Express
  - EJS

- **Database:**
  - MongoDB

- **Database ORM:**
  - Mongoose.js

- **Data Validation:**
  - Joi API

- **Security:**
  - Helmet.js (Securing Express apps by setting HTTP response headers)

## Features

- Campsite owners can:
  - Add new campsite listings.
  - Edit existing campsite information.
  - Delete campsite listings.

- Visitors can:
  - View campsite listings with details and images.
  - Review and rate campsites.

- User Authentication and Authorization:
  - Users must sign up and log in to the web application.
  - Authentication and authorization are enforced for actions such as adding, editing, and deleting campsites.

## Setting Up the Project

1. **Clone the Repository:**

    ```txt
    git clone <repository_url>
    cd campsite-review-webapp
    ```

2. **Install Dependencies**:

    ```txt
    npm install
    ```

3. **Configure the Database:**
   - Install MongoDB and set up a database.
   - Update the database configuration in `config.js`.

4. **Seed the Database (Optional):**
   - Before running the application, you may run `seeds.js` (found in the _seeds_ folder) which populates the database with 'fake' listings of camp sites. The `seeds.js` file uses mongoose to connect to your local database at the default server (127.0.0.1:27017) and `yelp-camp` as the database. This is not a required step.

5. **Run the Application:**

    ```txt
    npm start
    ```

6. **Access the Application:**
   - Open a web browser and go to `http://localhost:4001`.

7. **Register and Log In:**
   - Users can sign up and log in to perform actions such as adding/editing/deleting campsites and providing reviews.

8. **Explore and Enjoy:**
   - Explore the web app, add campsites, provide reviews, and enjoy the functionality!

## Notes

- This project is a personal endeavor aimed at honing programming skills and gaining practical experience with the mentioned technologies.
- This web app idea is not my own - in 2021, I completed a course on Udemy, [The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/), by Colt Steele - this web app was a project in this course. I recently revised and improved the app to my own liking.

## Screenshots

![localhost_4001_(iPad Pro)](https://github.com/melissaveraherbst/yelp-camp_camp-review-web-app/assets/84316275/12feadea-91ac-4d42-b832-fe8a47f40529)
![localhost_4001_login(iPad Pro)](https://github.com/melissaveraherbst/yelp-camp_camp-review-web-app/assets/84316275/34f7518e-dcfa-406e-b7a9-c9adc4e1ea19)
![localhost_4001_campgrounds(iPad Pro)](https://github.com/melissaveraherbst/yelp-camp_camp-review-web-app/assets/84316275/4e6d26e0-5822-4923-b08d-72bdc7e31b1f)
![localhost_4001_campgrounds_64f8bf7ea446f4306887e211(iPad Pro)](https://github.com/melissaveraherbst/yelp-camp_camp-review-web-app/assets/84316275/5f644873-cb7c-4910-9f9a-d64e63a4ce75)
