# Social

- run react server -> npm run dev
- When we use json server run -> json-server --watch ./src/app/data.json --port 8080

- ### Username - admin
- ### password - password123


# PostApp

PostApp is a simple social media-like application built using React, Firebase Realtime Database, and the ImgBB API. It allows users to create posts with text and images, like posts, and add comments.

## Features
- Create posts with text and images.
- Upload images using ImgBB API.
- Like posts.
- Comment on posts.
- Store posts, likes, and comments in Firebase Realtime Database.
- Persist username across sessions using localStorage.

## Technologies Used
- React
- Firebase Realtime Database
- React Router
- Axios
- ImgBB API

## Installation & Setup
### Prerequisites
- Node.js installed
- Firebase project setup with Realtime Database enabled
- ImgBB API key

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/PostApp.git
   cd PostApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   REACT_APP_FIREBASE_DATABASE_URL=your_firebase_database_url
   REACT_APP_IMGBB_API_KEY=your_imgbb_api_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure
```
PostApp/
│── src/
│   ├── components/
│   ├── App.js
│   ├── PostApp.js
│   ├── index.js
│   ├── App.css
│── public/
│── package.json
│── README.md
```

## API Configuration
### Firebase
- Update `API_URL` in `PostApp.js` with your Firebase Realtime Database URL.

### ImgBB
- The application uses ImgBB API to upload images.
- Set your API key in `.env`.

## Usage
- Users can create posts by entering text and optionally uploading an image.
- Clicking the "Post" button adds the post to Firebase.
- Users can like a post, and the like count updates in real time.
- Users can comment on a post, and comments are stored in Firebase.


