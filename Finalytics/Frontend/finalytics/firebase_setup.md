# Firebase Setup Guide for Finalytics

To make the Login, Signup, and Dashboard features work, you need to configure your Firebase project correctly. The "MongoDB" connection string you have is **not needed** for this frontend application.

## 1. Access Firebase Console
Go to [console.firebase.google.com](https://console.firebase.google.com/) and select your project (`finalytics-1`).

## 2. Enable Authentication
1. Click on **Authentication** in the left sidebar.
2. Click **Get Started** if you haven't already.
3. Go to the **Sign-in method** tab.
4. Enable **Email/Password**:
   - Click "Email/Password".
   - Toggle "Enable".
   - Click "Save".
5. Enable **Google**:
   - Click "Google".
   - Toggle "Enable".
   - Set the "Project support email".
   - Click "Save".

## 3. Enable Firestore Database
The application uses Cloud Firestore to store user data (like names and settings).

1. Click on **Firestore Database** in the left sidebar.
2. Click **Create Database**.
3. **Location**: Select a location close to you (e.g., `nam5 (us-central)`).
4. **Security Rules**: Start in **Test mode** (for development) or **Production mode**.
   - If you choose Production mode, you must update the rules to allow users to read/write their own data.
   - **Recommended Rules**:
     ```javascript
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /users/{userId} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
       }
     }
     ```
5. Click **Enable**.

## 4. Verify Configuration
Ensure your `.env` file in the `Frontend/finalytics` folder has the correct values from your Project Settings (General > Your apps > SDK setup and configuration > Config).

Your current `.env` looks correct, so enabling the services above should fix the "Failed to login" errors.
