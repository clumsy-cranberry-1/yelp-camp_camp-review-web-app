<div align="center">

  <picture>
  <source media="(prefers-color-scheme: dark)" srcset="/public/images/logo-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="/public/images/logo-light.png">
  <img alt="Shows a black logo in light color mode and a white one in dark color mode." src="/public/images/logo-dark.png" width=50%>
</picture>

  # Yelp-Camp | Campsite Review Web App
  
  ![Static Badge](https://img.shields.io/badge/HTML5-grey?style=flat-square&logo=html5)
  ![Static Badge](https://img.shields.io/badge/CSS3-grey?style=flat-square&logo=css3)
  ![Static Badge](https://img.shields.io/badge/JavaScript-grey?style=flat-square&logo=JavaScript)
  ![Static Badge](https://img.shields.io/badge/Node.js-grey?style=flat-square&logo=nodedotjs)
  ![Static Badge](https://img.shields.io/badge/Express.js-grey?style=flat-square&logo=express)
  ![Static Badge](https://img.shields.io/badge/Mongodb-grey?style=flat-square&logo=mongodb)
  ![Static Badge](https://img.shields.io/badge/Mongoose-grey?style=flat-square&logo=mongoose)
  ![Static Badge](https://img.shields.io/badge/Mapbox%20API-grey?style=flat-square&logo=mapbox)
  ![Static Badge](https://img.shields.io/badge/Udemy%20Project-grey?style=flat-square&logo=udemy)    
</div>


This project is a web application that allows campsite owners to list their camp sites with images, descriptions, locations, pricing, and other details. Visitors can review and rate the campsites. The application is built using the model-view-controller (MVC) software architecture pattern.

## Demo

## 💻 Technologies Used

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

## 📱 Features

- Campsite owners can:
  - Add new campsite listings.
  - Edit existing campsite information.
  - Delete campsite listings.

- Visitors can:
  - Search for campsites with sorting options.
  - View campsite listings with details and images.
  - Review and rate campsites.

- User Authentication and Authorization:
  - Users must sign up and log in to the web application.
  - Authentication and authorization are enforced for actions such as adding, editing, and deleting campsites.

## 🚀 Setting Up the Project Locally

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
  
5. **Mapbox GL JS Access Token**
   - You will need an Access Token to configure [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/) API correctly.
   - Once you have your Access Token available, you should update the following code files with your Access Token: `mapbox-map.js`, `mapbox-cluster-map.js` at the top of both files. 

6. **Run the Application:**

    ```txt
    npm start
    ```

7. **Access the Application:**
   - Open a web browser and go to `http://localhost:4001`.

8. **Register and Log In:**
   - Users can sign up and log in to perform actions such as adding/editing/deleting campsites and providing reviews.

9. **Explore and Enjoy:**
   - Explore the web app, add campsites, provide reviews, and enjoy the functionality!

## ✏️ Notes

- This project is a personal endeavor aimed at honing programming skills and gaining practical experience with the mentioned technologies.
- This web app idea is not my own - in 2021, I completed a course on Udemy, [The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/), by Colt Steele - this web app was the Capstone project in this course. I recently revised and made major improvements to the ui design and responsiveness, and added features not present in the original.

## 📸 Screenshots

![localhost_4001_](https://github.com/melissaveraherbst/yelp-camp_camp-review-web-app/assets/84316275/704a0738-b887-4700-9036-b6af25673879)
![localhost_4001_campgrounds](https://github.com/melissaveraherbst/yelp-camp_camp-review-web-app/assets/84316275/ed610a8f-198f-4b04-97ce-66323cd59353)
![localhost_4001_campgrounds_65ca4916bf06fb7784279dbd](https://github.com/melissaveraherbst/yelp-camp_camp-review-web-app/assets/84316275/3efb1bb6-0727-42c0-8f96-60aaae916bd7)
![localhost_4001_campgrounds_new](https://github.com/melissaveraherbst/yelp-camp_camp-review-web-app/assets/84316275/d03d79f7-f793-405a-bd3f-e951f305e0cf)
![localhost_4001_login](https://github.com/melissaveraherbst/yelp-camp_camp-review-web-app/assets/84316275/7d85b381-d1b9-42e0-89e6-5e16bc256416)
![localhost_4001_register](https://github.com/melissaveraherbst/yelp-camp_camp-review-web-app/assets/84316275/ee9ce202-50d2-4dda-95c9-e9271d051707)

## 👏🏻 Show Your Support

Give a ⭐ if this project helped you!

---
Made with 💙 by Melissa Vera Herbst
