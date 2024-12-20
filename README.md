Movie Recommendation System

**Project Overview:**

This is a simple web-based movie recommendation system. Users can browse through a list of movies, rate movies they have watched, and receive recommendations based on their ratings and similarity with other users' preferences.

**Features:**

-Rate Movies: Users can select a movie from a dropdown list and assign a rating (1-5 stars).

-Recommended Movies: The application provides movie recommendations based on user ratings and collaborative filtering.

-Browse Movies: Users can search for movies by title or genre.

-Persistent Storage: User ratings are saved in the browser's LocalStorage.


**Structure:**

Movie-Recommendation-System/
|-- index.html
|-- styles.css
|-- script.js
|-- data/
|   |-- movies.js
|   |-- users.js
|-- utils/
|   |-- similarities.js
|   |-- recommendations.js
|-- storage.js
|-- README.md


**File Descriptions:**

-index.html: The main HTML file containing the structure of the web application.

-styles.css: Contains styles to enhance the UI/UX of the application.

-script.js: Main JavaScript file managing user interactions and updating the UI dynamically.

-movies.js: Contains an array of movie objects with attributes such as id, title, genre, and year.

-users.js: Contains a sample dataset of user ratings.

-similarities.js: Utility file for calculating user similarity using cosine similarity.

-recommendations.js: Utility file for generating movie recommendations.

-storage.js: Handles saving and loading data from LocalStorage.