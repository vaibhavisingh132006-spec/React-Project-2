📝 React Project 2
A real-time, interactive quiz application built with React and Firebase. This project allows users to create, manage, and participate in live quizzes with instant data synchronization—similar to Mentimeter.

🚀 Live Demo
Check out the project here: https://react-project-2-chi-silk.vercel.app/

✨ Key Features
Live Quiz Creation: Easily build custom quizzes with multiple-choice questions.

Real-time Interaction: Using Firebase's real-time capabilities, responses are updated instantly as users participate.

Leaderboard Logic: Automated scoring and ranking based on user input.

Host Dashboard: A dedicated interface for creators to manage their active quizzes.

Responsive UI: Fully optimized for mobile devices so participants can join from anywhere.

🛠️ Tech Stack
Frontend: React.js

Styling: Tailwind CSS (or CSS Modules)

Backend/Database: Firebase (Firestore & Authentication)

Deployment: Vercel

⚙️ How it Works
Authentication: Users sign in to save their created quizzes.

Database: All quiz data and responses are stored in Cloud Firestore.

Real-time Listeners: The app uses onSnapshot (or similar Firebase hooks) to ensure that when a user submits an answer, the results update on the host's screen without a page refresh.
