# Online Exam Portal Frontend

A modern, responsive React-base frontend for an online examination system that supports both objective and subjective exams. Built with Material-UI components and Redux for state management.

## Features

### For Students
- Take objective and subjective exams
- View scores instantly after completion
- Track exam history and performance
- User-friendly interface for seamless exam experience
- Responsive design for mobile and desktop

### For Admins
- Manag student and admin accounts
- Create and manage objective/subjective exams
- View exam results and analytics
- Account settings and password management
- Comprehensive exam management tools

## Tech Stack

- **Frontend Framework**: React 18+ with Vite
- **UI Library**: Material-UI (MUI)
- **State Managment**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: CSS3 with responsive design
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── Authentication/          # Login, Signup, Password Reset
│   ├── Admin/                   # Admin-specific components
│   ├── Student/                 # Student-specific components
│   ├── Exam Creation/           # Exam creation interfaces
│   ├── Navigation/              # NavBar, SideBar components
│   └── Common/                  # Shared components
├── pages/
│   ├── Home/                    # Landing page
│   ├── admin/                   # Admin dashboard and routes
│   └── student/                 # Student dashboard and routes
├── redux/                       # State management
│   ├── authSlice.js            # Authentication state
│   ├── examSlice.js            # Exam management state
│   └── store.js                # Redux store configuration
└── App.jsx                     # Main application component
```

## 🎯 Key Components

### Authentication System
- **Login/Signup**: Role-based authentication (Admin/Student)
- **Password Management**: Change password and reset functionality
- **Private Routes**: Protected routes based on user roles

### Exam Management
- **Objective Exams**: Multiple-choice question format
- **Subjective Exams**: Essay-type questions
- **Exam Creation**: Admin interface for creating exams
- **Real-time Results**: Instant score calculation and display

### Dashboard Features
- **Admin Dashboard**: Comprehensive management interface
- **Student Dashboard**: Personalized student portal
- **Responsive Design**: Mobile-first approach with Material-UI

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd online-exam-portal-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 🖥️ Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (320px - 767px)

## 🔐 Authentication Flow

1. **User Registration**: Students and admins can create accounts
2. **Role-based Login**: Automatic redirection based on user role
3. **Dashboard Access**: Role-specific dashboard with appropriate features
4. **Session Management**: Secure session handling with logout functionality

## 🎨 UI/UX Features

- **Material-UI Components**: Modern, accessible interface
- **Dark Theme Support**: Consistent theming throughout the application
- **Loading States**: User-friendly loading indicators
- **Form Validation**: Real-time form validation with error messages
- **Snackbar Notifications**: Toast notifications for user feedback

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

The application is configured for deployment on Replit with automatic build and serve capabilities.

## 📄 License

This project is part of an educational online examination system.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please refer to the project documentation or create an issue in the repository.

---

**ExamMaster** - Making online examinations simple, secure, and efficient! 🎓
