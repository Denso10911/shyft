# Shift Management System

This web application is a shift management system designed for managing employee shifts in an easy and intuitive way. The system allows users to:

- View and manage shifts: Display a weekly schedule with shift details, including start and end times, employee names, and shift types.
- Drag & Drop functionality: Easily move shifts between different days and users.
- Context menu: Right-click on any shift to access options like copy, create contract, and delete.
- Modals: View and edit detailed shift information using modals.
- Dynamic data handling: The application updates in real-time as shifts are moved or modified.
- Localization: Supports multiple languages (English and French) for global users.

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

1. To run the project in development mode, use the following command:

   ```bash
   npm run dev
   ```

2. Start the JSON server to serve mock API data:

   ```bash
   npm run server
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