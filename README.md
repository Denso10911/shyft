# Shift Management System

This web application is a Shift Management System developed as part of a technical test. It is designed to manage employee shifts in a simple and intuitive manner.

## Features Implemented:

- Drag & Drop: I implemented drag-and-drop functionality to allow users to move shifts between users and different days of the week.
- Context Menu: A right-click context menu was added to each shift, providing options to copy, delete, or create a contract for a shift. This functionality improves the usability of the application.
- Modals: When a user selects a shift, a modal opens to view and edit the shift details (e.g., start and end times, user assignment, and shift type).
- Localization: The system supports both English and French languages. Each shift type and label can be translated to the user's language of choice, enhancing the user experience.
- Dynamic Updates: All changes made to the shifts (e.g., moved, edited, deleted) update in real-time, providing users with an instant feedback loop.

## What I Would Add:

1. Pagination: Pagination was intentionally not implemented in this project due to limitations with the current mock data provided by the JSON Server. While it would be useful to paginate the shift schedule to allow users to easily navigate through multiple weeks of data, JSON Server lacks the necessary features to handle pagination effectively. Additionally, given that this is a local mock development environment, implementing pagination wouldn't make sense without a proper backend API and database to manage data more dynamically. For a production-level system, pagination could be added to improve the user experience, especially for larger datasets.
2. Backend Integration: Currently, the project uses mock data with JSON server. A fully integrated backend with a database (e.g., PostgreSQL or MongoDB) could help to store shift data persistently. This would also allow for better handling of larger datasets and a more dynamic system.
3. User Authentication: Adding user authentication (using JWT or OAuth) would allow for role-based access. For example, only admin users could create, edit, or delete shifts, while regular users (employees) could only view their own shifts.

## Prerequisites

Before you get started, ensure you have the following installed:

- Node.js (version 20 or later)
- npm package manager

## Installation

To install and set up the project, follow these steps:

1. Clone the repository:

   ```bash
   https://github.com/Denso10911/shyft.git
   ```

2. Navigate to the project directory:

   ```bash
   cd shyft
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

### Development


1. Start the JSON server to serve mock API data:

   ```bash
   npm run server
   ```
   
2. To run the project in development mode, use the following command:

   ```bash
   npm run dev
   ```


This will start the development server. Open your browser and go to `http://localhost:3000`.

### Mock Development

To run the development server with mock local data:

```bash
npm run dev-mock
```

## Key Technologies

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Zustand**: A state management library.
- **React Query**: For fetching and managing server state.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Hook Form**: For handling form validation and state.
- **JSON Server**: To create a mock REST API for development.
