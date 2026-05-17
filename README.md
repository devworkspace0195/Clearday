# Clearday

A personal productivity companion for managing tasks, notes, and daily activities — built with React Native and modern mobile architecture patterns.

## Problem Statement

Staying organized across tasks, notes, and daily habits requires jumping between multiple apps. Clearday consolidates everything into one clean, offline-first mobile experience with no backend dependencies or subscriptions.

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **TypeScript** - Type-safe development
- **Redux Toolkit** - Predictable state management
- **AsyncStorage** - Persistent local storage
- **MVVM Architecture** - Clean separation of concerns
- **React Navigation** - Screen routing and navigation

## Key Features

- **Task Management** - Create, organize, and track todos with due dates and priorities
- **Quick Notes** - Capture thoughts and ideas with rich text support
- **Activity Tracking** - Log daily habits and routines
- **Offline-First** - All data stored locally, no internet required
- **Clean Architecture** - MVVM pattern for maintainable, testable code
- **Type Safety** - Full TypeScript coverage for reliability

## Architecture

Clearday/
├── src/
│   ├── models/          # Data models and business logic
│   ├── viewmodels/      # State management and business rules
│   ├── views/           # UI components and screens
│   ├── navigation/      # App navigation structure
│   ├── store/           # Redux store configuration
│   └── utils/           # Helper functions and utilities

**MVVM Pattern:**
- **Model** - Data structures and persistence logic (AsyncStorage)
- **ViewModel** - Business logic and state management (Redux Toolkit)
- **View** - UI components (React Native screens)

## Screenshots

*Screenshots coming soon*

## Installation

```bash
# Clone the repository
git clone https://github.com/devworkspace0195/Clearday.git

# Navigate to project directory
cd Clearday

# Install dependencies
npm install

# Install iOS pods (Mac only)
cd ios && pod install && cd ..

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
```

## Project Structure

src/
├── models/
│   ├── Task.ts          # Task data model
│   ├── Note.ts          # Note data model
│   └── Activity.ts      # Activity data model
├── viewmodels/
│   ├── TaskViewModel.ts # Task business logic
│   └── ...
├── views/
│   ├── screens/         # Main app screens
│   └── components/      # Reusable UI components
└── store/
├── slices/          # Redux Toolkit slices
└── store.ts         # Store configuration

## Tech Highlights

**State Management:**
- Redux Toolkit for global state
- AsyncStorage for persistence
- Type-safe actions and reducers

**Architecture Benefits:**
- Testable business logic (ViewModels)
- Reusable UI components (Views)
- Clear separation of concerns
- Easy to maintain and extend

**Development Workflow:**
- TypeScript for type safety
- ESLint for code quality
- Modular component structure

## What I Learned

- **MVVM Architecture** - Implementing clean architecture in React Native
- **Redux Toolkit** - Modern Redux patterns with less boilerplate
- **AsyncStorage** - Persistent local data without backend complexity
- **TypeScript in RN** - Type-safe mobile development
- **Offline-First Apps** - Building reliable apps without network dependency

## Future Enhancements

- [ ] Cloud sync (optional backup)
- [ ] Recurring tasks and reminders
- [ ] Dark mode support
- [ ] Export data to CSV/JSON
- [ ] Widget support (iOS/Android)
- [ ] Voice notes integration

## Contact

**Diya Juliet Xavier**  
📧 diyajulietxavier@gmail.com  
💼 [LinkedIn](https://linkedin.com/in/diya-xavier)  
🐙 [GitHub](https://github.com/devworkspace0195)

---

*A local-first productivity app built with modern React Native architecture*
