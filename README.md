# Sellegate (Frontend)

Sellegate is an innovative e-commerce platform designed to revolutionize the online buying and selling experience and serves as our graduation project. It uniquely integrates certified evaluators into the selling process, enhancing trust and security for transactions between buyers and sellers. You can find the full documentation of the project [here](https://drive.google.com/file/d/1ta0M59a4IiTMR1U7VnAvEDoot0HxtB1j/view).

## Website Features

- Fully responsive website
- Auth pages (login, log out, sign up)
- Ability to post, edit, and delete items as a seller
- Ability to search and buy items as a buyer
- Ability to evaluate and estimate item prices as an evaluator
- Ability to accept or reject assessment requests from evaluators as a seller

## Technologies Used

- React and TypeScript
- State Management: [Zustand](https://github.com/pmndrs/zustand)
- Forms and Input Validation: [Formik](https://formik.org/) with [Yup](https://github.com/jquense/yup) for validation
- Routing and Navigation: [React Router](https://reactrouter.com/)
- API Integration: [Axios](https://axios-http.com/) and [JSON Server](https://github.com/typicode/json-server) for simulating a backend
- Responsive Design and Styling: [Bootstrap](https://getbootstrap.com/)
- Environment Variables Management: [Dotenv](https://github.com/motdotla/dotenv)
- Notifications: [React-toastify](https://fkhadra.github.io/react-toastify/)

## Getting Started

### Prerequisites

Before setting up the project, ensure you have `npm` and `Node.js` installed on your machine. Optionally, if you want to run the full backend solution, you'll need Python and Django set up.

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/OmaralAnazi/Sellegate.git
   cd sellegate
   ```

2. Install Dependencies

   ```bash
   npm install
   ```

3. Running the Development Server (Quick Set up using JSON-Server):

   ```bash
   cd src
   npx json-server db.json
   ```

   You can interact with and modify the data directly in the `db.json` file. Alternatively, if you prefer a real backend, please refer to our Django backend setup instructions in this [repository](https://github.com/AymanBerri/Sellegate). However, it may take some time. Therefore, if you want to test the UI, we recommend a quick setup using `JSON-Server`.

   _Note: If you decide to use the Django backend setup, ensure you set `VITE_USE_REAL_BACKEND` to true in the `.env` file._

4. Launch the Website

   ```bash
   npm run dev
   ```

   This command will start the React application. Make sure to run it in a different terminal than your development server.
