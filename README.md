# HabitTracker - Daily Habit Building Web App

This project is a full-stack MERN application built for an academic assignment. It allows users to create, track, manage, and analyze their daily habits to build streaks and boost productivity.

**Live Site URL:** [https://dailyhabitlog.netlify.app](https://dailyhabitlog.netlify.app)

**Server Site URL:** [https://my-habit-tracker-server.vercel.app](https://my-habit-tracker-server.vercel.app)

---

## 🚀 Key Features

* **Full MERN Stack Implementation:** Utilizes React for the client, Express.js and Node.js for the server, and MongoDB (Native Driver) for the database.
* **Secure Firebase Authentication:** Features secure login and registration using Email/Password and Google Sign-In (Popup).
* **Server-Side JWT Security:** Implements Firebase Admin SDK on the server to create and verify JWTs. Protected API routes ensure users can only access or modify *their own* habit data.
* **Complete CRUD Operations:** Users can Create, Read, Update (in a modal), and Delete (with `sweetalert2` confirmation) their personal habits.
* **Streak & Progress Tracking:** Automatically calculates and displays the user's current streak (consecutive days) for each habit and shows a 30-day progress bar on the details page.
* **Advanced Filtering & Animation:** Includes a public "Browse Habits" page with dynamic search (by title) and filtering (by category), plus subtle scroll animations (`Framer Motion`) on the home page.
* **Analytics Dashboard (Optional Challenge):** Features a responsive bar chart (built with `Recharts`) visualizing the user's habit completion statistics over the last 7 days.
* **Axios Interceptor (Optional Challenge):** Uses an `axios` interceptor to automatically attach the Firebase JWT (token) to all secure API requests from the client.
* **Custom Dark/Light Theme:** A theme toggle allows users to switch between a custom dark theme and a standard light theme, with the preference saved in `localStorage`.