# Todo List

A React application for managing todos, designed with a responsive, mobile-first interface. Users can create, update, complete, and delete tasks. The app also offers sorting and filtering features to help organize and find todos.

## Live Demo

[todo-list-delta-ashen-20.vercel.app](http://todo-list-delta-ashen-20.vercel.app/)

## Features

- Add todos to a list
- Edit or delete todos
- Mark todos as 'complete'
- Sort todo list by title or created at date
- Filter todos by keyword

## Technologies Used

- **Front End:** React 19, React Router, CSS Modules
- **State Management:** useReducer, Context API
- **Build Tool:** Vite
- **Deployment:** Vercel

## Screenshots

![Mobile view of todos page](./screenshots/mobile-todos.jpg)
![Desktop view of todos page](./screenshots/desktop-todos.jpg)

## Getting Started(Installation and setup)

1. Clone the repository to your machine locally.
2. Install project dependencies by running the command: `npm install`
3. Start the development server by running the command: `npm run dev`
4. Open a web browser and navigate to http://localhost:3001

## Available Scripts

- `npm run dev`: starts the development server

- `npm run build`: bundles the app for production

- `npm run preview`: provides a local version of the production build

- `npm run lint`: runs ESLint to monitor code quality

## Design Decisions

I used a mobile first, responsive design approach. I used semantic HTML for a clear structure, maintaining an intuitive layout. Some of the accessibility considerations that guided design choices include visible focus states, clear disabled/loading states, keyboard friendly navigation, and proper label/input pairing.

Styling Approach with CSS Modules:
I chose CSS modules over alternatives like Tailwind or styled-components because it maintains a seperation of concern with JSX markup and styling logic, while also avoiding class name collisions with component scoped styling. This allowed for use of familiar CSS syntax with ease.

State Management with useReducer and Context API:
For state that needed to be passed through many components, instead of passing state and setters down through props, I implemented useReducer and Context API. Use of the Context API avoided the issue of prop drilling through components that did not need the state themselves, while useReducer placed related state in a single reducer that made state easier to trace.

## Security and Input Validation

These are the client-side security measures that I implemented on all user input to help ensure protection of user data and the application.

- Validation: Before a user's input is stored, it is first validated and then sanitized. Validation is done by checking the user's input to the form is not empty or contains only whitespaces. There are also checks in place so that the number of characters entered does not exceed a maximum length. These checks are placed on the login form for user email/password, and on the add todo/update todo inputs. If a non-valid todo is entered, this will trigger an error message to notify the user and the submission is disabled.

- Sanitization: After the input is validated it is then sanitized with the use of DOMPurify. This is done to help prevent any form inputs from containing any malicious code before being stored. DOMPurify works to strip out any dangerous HTML, preventing XSS (Cross-Site Scripting) attacks.

## Testing

Browsers used for testing: Chrome, Firefox, and Vivaldi

- Responsive testing: This app was tested across multiple screen sizes to ensure a smooth user experience between devices. Testing was done to ensure that at all breakpoints:
- Layout adjusts in a fluid manner
- Text wraps cleanly
- Buttons and inputs remain usable
- Navigation remains visible/accessible

Screen sizes tested:

- Mobile (360px, 480px): portrait and landscape views
- Tablet (768px): portrait and landscape view
- Desktop (1024px, 1200px, 1440px): Desktops and monitors

- Accessibility testing:
- Keyboard navigation: Tab/Shift + Tab allow navigation to interactive elements(inputs, buttons, links)
  - Note: Vivaldi has browser specific behavior where tab order may skip navigation elements inside flex container.
- Focus Visibility: Buttons, inputs, and links have visible focus rings
- Semantic HTML: <nav>, <ul>, <li>, <form>, and <button> elements improve screen reader structure
- Label/Input Pairing: Form inputs use label and htmlFor for proper screen reader announcements

## Future Improvement Ideas

- Extract editing/updating todo logic into a custom hook
- Optional todo details: each todo can have an expandable notes section for longer descriptions or extra info
- Light/Dark mode toggle
- Ability to reorder tasks
- Implement data persistence
- Implement todo priority levels: mark todos as high/medium/low

## License Information

This project is licensed under the MIT license.

## Contact Information

https://github.com/cryssw17
