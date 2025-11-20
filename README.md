# FAO Front-End Developer Test - Project Documentation

## Project Overview

This project built as part of the FAO Front-End Developer Test. It consist it two parts (both done)

**Live Demo:** [https://fao-app-8qvu.vercel.app/](https://fao-app-8qvu.vercel.app/)  
**GitHub Repository:** [https://github.com/kristopapallazo/FAO-App](https://github.com/kristopapallazo/FAO-App)

---

## Local Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/kristopapallazo/FAO-App.git
   cd FAO-App
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

4. **Build for production**

   ```bash
   npm run build
   ```

---

## Tech Stack

### Core Technologies

- **React v19**
- **TypeScript** - Static typing for to improve code quality and developer experience
- **Vite** - For project creation, faster development and optimized production builds
- **Vercel** - Used to deploy and provide the Live Demo Link, serverless deployment
- **React Router DOM 7.9.6** - Routing system, improve development with hooks like: useNavigate, useLocation, etc

### Styling & UI

- **Centralized CSS Variables** - All the hex codes from Figma are stored in "index.css",
- **CSS Modules** - Modular approach styling, this improve the code readability, structure, and ensure that classes dont conflict with each others
- **CSS Custom Properties** - Centralized theme management for colors, spacing, and design tokens
- **Clsx** - Third-Party Lib, used for conditional CSS class management
- **Recharts** - The library choose for the charts, it has a declarative api, easy integrated with react, has Ts support.

### Development Tools

- **ESLint** - Code linting with React-specific rules
- **Vite Plugin SVGR** - Used for SVG components import optimization, icons exported from Figma design

## Project Requirements Implementation

### Part 1 - Team Management Page

#### Completed Requirements

1. **Layout Accuracy**

   - Pixel-perfect recreation of Figma design
   - Responsive layout for desktop and tablet
   - Consistent spacing, colors, and typography

2. **Data Management**

   - Mock JSON data structure with team member information
   - AppContext is used to wrap the application, easily consume, retrive global app states like: theme, current user, device type, isMobile, isTablet, isLaptop
   - Dynamic table population from data source
   - Type-safe data handling with TypeScript interfaces

3. **Table Functionality**

   - **Sorting**: Implemented for all columns with visual indicators (ascending/descending)
   - **Pagination**: Fully functional with page size selector (5, 10, 20, 50 rows)
   - **Navigation**: Previous/Next buttons with disabled states
   - **Status Display**: Dynamic row count showing
   - **Fixed Header**: Fixed header with y-auto-scroll for the rows
   - **Fixed Checkbox Column**: Fixed column with x-auto-scroll

4. **Checkbox Functionality**

   - Individual row selection with state management
   - "Select All" functionality
   - Event propagation for handling to prevent conflicts

5. **Action Icons**

   - View, Edit, and Delete icons with hover states

6. **Responsiveness**
   - Desktop: Full table layout with all columns visible
   - Tablet: Adaptive layout maintaining usability

### Part 2 - Mobile Dashboard

#### Completed Requirements

1. **Design Accuracy**

   - Pixel-perfect mobile view (≤ 430px width)
   - All sections recreated from Figma design
   - Consistent with brand colors and typography

2. **Responsive Breakpoints**

   - **Mobile**: < 768px
   - **Tablet**: 768px - 1024px
   - **Laptop/Desktop**: > 1024px
   - device detection with window resize listener

3. **Dynamic Data**

   - Mock JSON data for all dashboard sections
   - Info panel with statistical cards (Total Events, Total Agencies)
   - Latest events section with dynamic event cards
   - Interactivity for the lastest 4 or See All Event CArds

4. **Event Management**

   - Event cards with title, date, and status badges
   - Date formatting with ordinal suffixes (e.g., "Dec 24th 2024")
   - Status badges reflecting event state (Registered, Unregistered, Canceled)
   - **Expandable Cards**: Click expand icon to view detailed event information in a modal

5. **Info Panel Cards**

   - Side-by-side scrollable cards on mobile
   - Statistical data display with percentage changes
   - Visual indicators (arrows) for trends
   - Expand functionality with modal popover showing detailed statistics

6. **Interactive Features**
   - Modal system for expanded views
   - Keyboard support (ESC to close)
   - Click outside to close

---

## Architecture & Design Patterns

### Atomic Design Methodology

The project follows **Atomic Design** principles for component organization:

```
src/
├── components/
│   ├── ui/              # Atoms - Basic building blocks
│   │   ├── button/
│   │   ├── input/
│   │   ├── checkbox/
│   │   ├── avatar/
│   │   ├── badge/
│   │   ├── modal/
│   │   └── table/
│   ├── common/          # Molecules - Simple component groups
│   │   └── ProfileSection/
│   ├── sections/        # Organisms - Complex components
│   │   └── DashboardSection/
│   └── tables/          # Specialized organisms
│       └── TeamTable/
├── layout/              # Templates
│   └── MainLayout/
├── pages/               # Pages
│   ├── DashboardPage.tsx
│   ├── TeamPage.tsx
│   └── ...
├── context/             # Global state management
│   └── AppContext.tsx
├── hooks/               # Custom React hooks
├── types/               # TypeScript definitions
├── utils/               # Utility functions
└── data/                # Mock data
```

### Component Design Principles

2. **Configurable Components**

   - Props-driven configuration for maximum flexibility
   - TypeScript interfaces for type safety
   - Default props for common use cases
   - Example: `DynamicTable` component accepts columns configuration

3. **Reusability**
   - Generic `DynamicTable` component can be used across pages
   - Shared `MainCard` wrapper for consistent card styling
   - Reusable form components (Input, Checkbox, Button, Modal, Badges, LoadingSpinner)
   - Icon system with centralized exports

---

## Performance Optimizations

### 1. Code Splitting & Lazy Loading

**Benefits:**

- Reduced initial bundle size
- Faster time-to-interactive
- On-demand loading of page resources

### 2. React Performance Optimizations

#### Memoization with `React.memo`

- Prevents unnecessary re-renders of child components
- Used for list items (EventsCard, InnerCard)
- Configured with custom comparison functions where needed

#### `useCallback` Hook

- Memoizes callback functions to prevent recreation
- Essential for event handlers passed to child components
- Reduces child component re-renders

#### `useMemo` Hook

- Memoizes expensive computations
- Used for filtered/sorted data transformations
- Pagination calculations

### 3. State Management Optimization

#### Context API with Strategic Splitting

- `AppContext` for global state (theme, device type, user)
- Prevents prop drilling
- localStorage integration for persistence
- Custom hooks (`useApp`) for clean consumption

## Submission Details

**Submitted**: November 20, 2025  
**Deadline**: Thursday, November 20, 2025 - 12:00 PM

**Kristi Papallazo**  
GitHub: [@kristopapallazo](https://github.com/kristopapallazo)
