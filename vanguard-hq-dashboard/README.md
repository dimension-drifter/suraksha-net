# SurakshaNET Dashboard# Getting Started with Create React App



<div align="center">This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

  <img src="public/logo.png" alt="SurakshaNET Logo" width="120" height="120" style="border-radius: 50%;">

  ## Available Scripts

  ## 🔒 Secure Communication Platform

  ### Command & Control InterfaceIn the project directory, you can run:

  

  [![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)### `npm start`

  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-blue.svg)](https://tailwindcss.com/)

  [![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animation-purple.svg)](https://www.framer.com/motion/)Runs the app in the development mode.\

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

</div>

The page will reload if you make edits.\

---You will also see any lint errors in the console.



## 📋 Table of Contents### `npm test`



- [Overview](#overview)Launches the test runner in the interactive watch mode.\

- [Features](#features)See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- [Tech Stack](#tech-stack)

- [Installation](#installation)### `npm run build`

- [Usage](#usage)

- [Project Structure](#project-structure)Builds the app for production to the `build` folder.\

- [Contributing](#contributing)It correctly bundles React in production mode and optimizes the build for the best performance.

- [Author](#author)

The build is minified and the filenames include the hashes.\

---Your app is ready to be deployed!



## 🌟 OverviewSee the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



**SurakshaNET Dashboard** is a modern, secure command and control interface designed for security operations and user management. Built with React and featuring a sleek dark theme, this dashboard provides comprehensive monitoring capabilities with a professional military-inspired design.### `npm run eject`



### Key Highlights:**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

- 🛡️ **Security-First Design** - Built with security operations in mind

- 🎨 **Modern UI/UX** - Clean, professional interface with smooth animationsIf you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

- 📱 **Responsive Design** - Works seamlessly across all devices

- 🔐 **VPN Integration** - Simulated secure connection workflowsInstead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

- 📊 **Real-time Monitoring** - Live logs and security metrics

- ⚡ **High Performance** - Optimized React components with smooth animationsYou don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.



---## Learn More



## ✨ FeaturesYou can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).



### 🔐 Security OperationsTo learn React, check out the [React documentation](https://reactjs.org/).

- **User Account Management** - Comprehensive user control and monitoring
- **Security Logs** - Real-time security event tracking
- **Threat Monitoring** - Active threat detection and blocking
- **OPSEC Compliance** - Operational security compliance tracking

### 📊 Dashboard Components
- **Live Statistics** - Real-time metrics and KPIs
- **Command Controls** - Quick action buttons for security operations
- **System Health** - Server status and resource monitoring
- **Communications Center** - Broadcast and alert systems

### 🎨 User Experience
- **Animated Loading Screen** - Custom logo-based loading animation with zoom effects
- **Smooth Transitions** - Framer Motion powered animations throughout
- **Toast Notifications** - Real-time security alerts and status updates
- **Responsive Sidebar** - Collapsible navigation for all screen sizes

### 🔧 Technical Features
- **Component-Based Architecture** - Modular React components
- **Custom Hooks** - Reusable logic for responsive design
- **Tailwind CSS** - Utility-first styling approach
- **Perfect Round Logo** - Custom CSS styling for brand consistency

---

## 🛠️ Tech Stack

### Frontend
- **React 18+** - Modern React with Hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Production-ready motion library for animations
- **Lucide React** - Beautiful & consistent icon toolkit
- **React Toastify** - Elegant notification system

### Development Tools
- **Create React App** - Fast development environment
- **ESLint** - Code linting and quality assurance
- **Git** - Version control

### Design System
- **Color Palette** - Dark theme with blue and yellow accents
- **Typography** - Professional military-inspired font choices
- **Icons** - Consistent iconography with Lucide React
- **Animations** - Smooth, purposeful micro-interactions

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v16.0 or higher)
- **npm** or **yarn**
- **Git**

### Quick Start
```bash
# Clone the repository
git clone https://github.com/khush196/SurakshaNET-Dashboard.git

# Navigate to project directory
cd SurakshaNET-Dashboard

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3001`

### Build for Production
```bash
npm run build
```

---

## 🖥️ Usage

### Development
1. **Start the development server** with `npm start`
2. **Watch the loading animation** - Your SurakshaNET logo will zoom in/out beautifully
3. **Explore the dashboard** - Navigate through different security sections
4. **Test responsiveness** - Try different screen sizes

### Key Features
- **Loading Screen** - 5-second animated loading with your custom logo
- **Dashboard Navigation** - Six main sections for complete security management
- **Real-time Updates** - Live statistics and security monitoring
- **Command Controls** - Quick action buttons for security operations

---

## 📁 Project Structure

```
SurakshaNET-Dashboard/
├── public/
│   ├── index.html          # HTML template with custom favicon
│   ├── logo.png            # SurakshaNET logo (your custom logo)
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # React components
│   │   ├── LoadingSpinner.jsx    # Custom logo loading animation
│   │   ├── StatCard.jsx          # Statistics display cards
│   │   ├── UserManagement.jsx    # User control interface
│   │   ├── LiveLogs.jsx          # Real-time log display
│   │   └── SecurityMonitor.jsx   # Security monitoring panel
│   ├── utils/
│   │   └── mockData.js     # Mock data for development
│   ├── App.jsx             # Main application component
│   ├── App.css             # Custom styles and animations
│   ├── index.js            # Application entry point
│   └── index.css           # Global Tailwind CSS styles
├── tailwind.config.js      # Tailwind CSS configuration
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

---

## 🎨 Customization

### Logo Integration
- Your custom `logo.png` is used throughout the application
- Perfect round styling with CSS `border-radius: 50%`
- Smooth zoom animations in the loading screen
- Consistent branding in sidebar and main header

### Animation Timing
- **Loading Duration**: 5 seconds for full brand experience
- **Logo Animation**: 4-second zoom in/out cycles
- **Page Transitions**: Smooth Framer Motion animations

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Khush Patel**
- GitHub: [@khush196](https://github.com/khush196)
- Repository: [SurakshaNET-Dashboard](https://github.com/khush196/SurakshaNET-Dashboard)

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Lucide** - For beautiful icons
- **Security Community** - For inspiration on security dashboard design

---

## 📄 License

This project is licensed under the MIT License - feel free to use it for your own projects!

---

<div align="center">
  <p>Made with ❤️ for secure communications</p>
  <p>© 2025 SurakshaNET Dashboard. All rights reserved.</p>
</div>