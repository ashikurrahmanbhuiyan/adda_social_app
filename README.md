
This is a simple social media application built with Node.js, Express, TypeScript, and MongoDB. It allows users to register, log in, create posts, send friend requests, and interact with posts.

## Adda App
<p align="center">
    Visit the App
</p>
<p align="center">
  <strong>https://adda-social-app-test.onrender.com</strong>
</p>



## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/ashikurrahmanbhuiyan/adda_social_app
    cd adda_social_app
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a .env file in the root directory and add the following:
    ```env
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    PORT=3000
    ```

4. **Run the project:**
    ```sh
    npm start
    ```

## Database Structure

The application uses MongoDB to store data. Below are the main collections and their schemas:

### User Collection

- **name**: String, required
- **username**: String, required, unique
- **password**: String, required
- **friends**: Array of ObjectId references to User
- **friendRequests**: Array of ObjectId references to User

### Post Collection

- **userId**: ObjectId reference to User, required
- **content**: String, required
- **comments**: Array of Comment subdocuments
- **likes**: Array of ObjectId references to User
- **createdAt**: Date, default to current date
- **visibility**: String, default to "public"

### Comment Subdocument

- **userId**: ObjectId reference to User, required
- **text**: String, required
- **createdAt**: Date, default to current date

## API Endpoints

### Authentication Routes

- **GET `/login`**: Render login page.
- **POST `/login`**: Handle user login.
- **GET `/register`**: Render registration page.
- **POST `/register`**: Handle user registration.
- **GET `/dashboard`**: Render user dashboard.
- **GET `/logout`**: Handle user logout.

### Post Routes

- **POST `/posts`**: Create a new post.
- **GET `/posts/feed`**: Get all posts filtered by friends.
- **GET `/posts/:id`**: Get a single post by ID.
- **POST `/posts/:postId/like`**: Like or unlike a post.
- **POST `/posts/:postId/comment`**: Comment on a post.

### Friend Routes

- **POST `/friend-request-sent`**: Send a friend request.
- **POST `/friend-request/:userId/accept`**: Accept a friend request.
- **GET `/friend-requests`**: Get pending friend requests.
- **GET `/friends`**: Get friends list.

## Middleware

- **`authMiddleware`**: Protect routes that require authentication.
- **`redirectIfAuthenticated`**: Redirect to dashboard if the user is already authenticated.

## Views

The application uses EJS as the templating engine. The views are located in the views directory.

- **`login.ejs`**: Login page.
- **`register.ejs`**: Registration page.
- **`dashboard.ejs`**: User dashboard.
- **`feed.ejs`**: Feed page displaying all posts filtered by friends.

## Styles

The application uses a single CSS file located in the styles.css directory for styling.

## License

This project is licensed under the MIT License.
