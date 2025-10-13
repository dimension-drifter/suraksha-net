# SurakshaNET: India's Sovereign Communication Shield 🛡️🇮🇳

![Status](https://img.shields.io/badge/status-Functional%20UX%20Prototype-green)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS%20%7C%20Web-blue)
![Frameworks](https://img.shields.io/badge/frameworks-React%20Native%20%7C%20React-blueviolet)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

**A human-centric prototype of a quantum-secured, closed-group communication platform, designed for the Smart India Hackathon 2025. This project addresses the critical need to protect India's defense personnel, veterans, and their families from modern cyber threats.**

---

## 📺 Live Demo

A complete walkthrough of the SurakshaNET prototype, showcasing its mission-critical features and the Vanguard HQ command dashboard.

**(https://www.youtube.com/watch?v=nWvSZPGzyko)**

---

## 🎯 The Problem: The Unseen Front Line

With **1.44 million active personnel** and a total ecosystem of over **5 million individuals**, India's defense community is a prime target for hostile intelligence. Currently, a staggering **66% of defense-related communications** flow through insecure, foreign-owned commercial platforms like WhatsApp. This creates critical vulnerabilities:

-   **Data Sovereignty Risk:** Sensitive data is stored on servers outside of Indian jurisdiction and control.
-   **Social Engineering:** Families and veterans are increasingly targeted to extract sensitive information or compromise personnel.
-   **Zero Containment:** There is no way to prevent screenshots, message forwarding, or data exfiltration, leading to irreversible OPSEC leaks.
-   **Lack of Oversight:** HQ has no administrative control or monitoring capability over these informal communication channels.

Existing indigenous systems like SAMBHAV are limited in scope and fail to protect the most vulnerable part of the ecosystem: the families. SurakshaNET is designed to fill this critical gap.

---

## ✨ Core Features & Implemented Innovations

Our functional prototype showcases a suite of innovative, user-centric security features that demonstrate our deep understanding of real-world defense requirements.

### 🛡️ Core Security & Containment
-   **Screenshot & Screen Recording Prevention:** Actively blocks screen capture on-device (`expo-screen-capture`).
-   **Screenshot Attempt Logging:** Every blocked attempt triggers a "SECURITY ALERT" and is logged for administrative review.
-   **"Burn Notice" (Remote Wipe Simulation):** A user-initiated, animated full data purge that resets the app, simulating the zeroization of data on a compromised device.

### 🧠 Intelligence-Driven Security
-   **"Chameleon Mode" (Plausible Deniability):** The entire app can be hidden behind a fully functional calculator UI, triggered by a long-press gesture. This is a life-saving feature for personnel in inspection-risk environments.
-   **Real-time On-Device OPSEC Scanner:** Scans messages *as they are typed* and provides real-time warnings for keywords related to times, locations, and military jargon.
-   **"Guardian Angel Protocol" (Family Panic System):** A covert alert system where a specific, innocent-looking emoji sequence (e.g., 🌻🌻🌻) sent by a family member triggers a silent, high-priority alert to HQ and connected personnel.

### 💬 Secure Messaging & User Experience
-   **Time-Locked & Disappearing Messages:** Full control over the message lifecycle, ensuring information is only visible when intended.
-   **Dual-Theme System:** A standard "Military Green" theme and a low-light "Stealth Mode" for covert operations.
-   **Categorized Chat Lists:** In Stealth Mode, chats are automatically organized into "OPERATIONAL" and "FAMILY & PERSONAL" for better information management.

### 司令 Command & Control (HQ Dashboard)
-   **Real-time Monitoring:** A comprehensive dashboard with live statistics on active users, threats blocked, and system health.
-   **Live Activity & Audit Logs:** A filterable, searchable feed of all user and system activities for complete oversight.
-   **Role-Based Access Control (RBAC):** A sophisticated interface for managing granular user permissions and roles.

---


## 🛠️ Technology Stack & Architecture

This project is a monorepo containing the mobile application (`SurakshaNET`) and the web dashboard (`HQ`).

### 📱 Mobile Application (SurakshaNET)
-   **Framework:** React Native (Expo SDK ~v54)
-   **Language:** TypeScript
-   **Navigation:** React Navigation
-   **UI & Styling:** React Native Core Components, Lottie
-   **State Management:** React Context API
-   **Security UX:** `expo-screen-capture`, `react-native-biometrics`

### 🖥️ HQ Command Dashboard (HQ)
-   **Framework:** React (Create React App)
-   **Language:** JavaScript (ES6+)
-   **Styling:** Tailwind CSS
-   **Animations:** Framer Motion
-   **Data Visualization:** Chart.js
-   **Data Simulation:** Faker.js

### ☁️ Backend & Security Architecture
-   **Cloud Provider:** AWS Mumbai Region (for data sovereignty)
-   **VPN Tunnel:** WireGuard Protocol
-   **Backend:** Node.js + Express in a Serverless Architecture (AWS Lambda)
-   **Database:** MongoDB Atlas (India) & Amazon S3
-   **Real-time:** Socket.io
-   **Encryption:** The Signal Protocol (E2E), Post-Quantum Cryptography (Key Exchange)

---

##  Getting Started

Follow these instructions to run the prototype on your local machine.

### Prerequisites
-   Node.js (v18 or later)
-   npm or yarn
-   Expo Go app on your mobile device (for running the mobile app)

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/[YourUsername]/[YourRepoName].git
    cd [YourRepoName]
    ```

2.  **Run the Mobile Application (SurakshaNET):**
    ```bash
    # Navigate to the mobile app directory
    cd suraksha-net-app 

    # Install dependencies
    npm install

    # Start the development server
    npx expo start
    ```
    Scan the QR code with the Expo Go app on your phone.

3.  **Run the HQ Dashboard (VanguardHQ):**
    ```bash
    # Navigate to the dashboard directory from the root
    cd vanguard-hq-dashboard

    # Install dependencies
    npm install

    # Start the development server
    npm start
    ```
    The dashboard will open at `http://localhost:3000`.

---


## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
