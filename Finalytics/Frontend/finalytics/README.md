# Finalytics

Finalytics is a modern, comprehensive financial analytics platform designed to provide users with real-time market insights, investment tracking, and powerful comparison tools. Built with performance and user experience in mind, it leverages the latest web technologies to deliver a premium feel.

## Features

- **🔐 Secure Authentication**: Robust login and signup system powered by Firebase Authentication, including password recovery.
- **📰 Dynamic Newsfeed**: Stay updated with the latest financial news and market trends.
- **📊 Interactive Dashboard**: (Coming Soon) A central hub for your financial overview.
- **⚖️ Comparison Tool**: Compare different financial instruments or assets side-by-side.
- **💰 Investment Tracking**: Keep track of your portfolio performance.
- **📈 Market News**: Dedicated section for in-depth market analysis.
- **⚙️ User Settings**: Customizable profile and application preferences.
- **📱 Responsive Design**: Fully responsive layout with a collapsible sidebar and mobile-friendly navigation.

## Tech Stack

This project is built using a modern frontend stack:

- **Framework**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) for lightning-fast development and building.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first, responsive design.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for simple and scalable state management.
- **Routing**: [React Router DOM](https://reactrouter.com/) for client-side routing.
- **Backend & Auth**: [Firebase](https://firebase.google.com/) (Auth, Firestore).
- **Visualization**: [ApexCharts](https://apexcharts.com/) and [React-ApexCharts](https://github.com/apexcharts/react-apexcharts) for interactive charts.
- **Animations**:
  - [Framer Motion](https://www.framer.com/motion/)
  - [GSAP](https://gsap.com/)
  - [AOS](https://michalsnik.github.io/aos/) (Animate On Scroll)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Finalytics/Frontend/finalytics
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory (`Frontend/finalytics`) and add your Firebase configuration keys. You can find these in your Firebase Project Settings.

    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

    > **Note:** See `firebase_setup.md` for detailed instructions on configuring Firebase Authentication and Firestore.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The app should now be running at `http://localhost:5173`.

## Project Structure

```
src/
├── api/            # API integration logic
├── components/     # Reusable UI components (Navbar, Sidebar, etc.)
├── hooks/          # Custom React hooks (useAuth, etc.)
├── pages/          # Application pages (Login, Newsfeed, etc.)
├── stores/         # Zustand state stores
├── utils/          # Helper functions and constants
├── App.tsx         # Main application component with routing
├── main.tsx        # Entry point
└── firebase.ts     # Firebase initialization
```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.
