# CodeBook - React eBook Store

Welcome to CodeBook, a modern front-end e-commerce application built with React, designed for browsing and purchasing computer science eBooks. This project simulates a real-world online store experience, featuring product listings, filtering, sorting, user authentication, shopping cart functionality, mock checkout, and a user dashboard.

## ✨ Features

- **Browse eBooks:** View a list of available eBooks with details.
- **Search:** Find specific eBooks by name.
- **Filtering:** Filter eBooks based on ratings, stock availability, and best-seller status.
- **Sorting:** Sort eBooks by price (Low to High, High to Low).
- **Product Details:** View detailed information about each eBook.
- **User Authentication:** Secure user registration and login.
- **Shopping Cart:** Add/remove eBooks from the cart.
- **Mock Checkout:** Simulate the order placement process.
- **Order History:** View past orders on the user dashboard.
- **Dark Mode:** Toggle between light and dark UI themes.
- **Responsive Design:** Adapts to different screen sizes (desktop, tablet, mobile).
- **Toast Notifications:** User-friendly feedback for actions.
- **Protected Routes:** Secure access to user-specific pages (Cart, Dashboard, Order Summary).

## 🚀 Tech Stack

- **Frontend:**
  - [React](https://reactjs.org/) (v18)
  - [React Router DOM](https://reactrouter.com/) (v6) - For routing
  - [Tailwind CSS](https://tailwindcss.com/) - For styling
  - React Context API + `useReducer` - For state management (Cart, Filters)
  - [Create React App](https://create-react-app.dev/) - Project scaffolding
  - [react-toastify](https://fkhadra.github.io/react-toastify/introduction/) - For notifications
- **Mock Backend & Auth:**
  - [json-server](https://github.com/typicode/json-server) - To simulate a REST API backend
  - [json-server-auth](https://github.com/jeremyben/json-server-auth) - For user authentication simulation
- **Development Tools:**
  - ESLint
  - Prettier (Implicit via standard CRA setup)
- **Deployment:**
  - [Docker](https://www.docker.com/)

## ⚙️ Setup Instructions

**Prerequisites:**

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

**Local Development:**

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/awesome-kartikey/kartikey-cinemate.git
    cd kartikey-codebook
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the Mock API Backend:**
    Open a terminal and run:

    ```bash
    npx json-server-auth --watch data/db.json --routes data/routes.json --port 8000
    ```

    This will start the mock API server on `http://localhost:8000`. Keep this terminal running.

4.  **Start the React Development Server:**
    Open _another_ terminal in the project directory and run:

    ```bash
    npm run dev
    ```

    This will start the React app in development mode. Open [http://localhost:3000](http://localhost:3000) (or the port specified in the terminal) to view it in your browser.

    _Note: The `REACT_APP_HOST` variable in the `.env` file (you might need to create one based on `.env.example` if provided, or leave it as default) should point to `http://localhost:8000` for development._

**Docker Setup:**

1.  **Build the Docker image:**

    ```bash
    docker build -t codebook-app .
    ```

2.  **Run the Docker container:**
    ```bash
    docker run -p 3000:10000 -e PORT=10000 codebook-app
    ```
    The application (including the `json-server` backend serving the frontend build) will be available at [http://localhost:3000](http://localhost:3000). Note that the Dockerfile is configured for deployment where `json-server` serves the static build and acts as the API simultaneously.

## 📖 Usage

1.  **Explore:** Browse the homepage for featured eBooks or navigate to the "Products" page to see all available eBooks.
2.  **Search/Filter/Sort:** Use the search bar, filter options (click the filter icon on the products page), and sorting controls to find specific eBooks.
3.  **View Details:** Click on an eBook card to see its detailed description, rating, and other information.
4.  **Authentication:** Register for a new account or log in using existing credentials. You can also use the Guest Login feature (credentials available on the Login page).
5.  **Cart:** Add eBooks to your cart. View the cart to proceed to checkout or remove items.
6.  **Checkout:** Simulate the payment process (uses mock data).
7.  **Dashboard:** After logging in, access your dashboard to view your order history.
8.  **Dark Mode:** Toggle the theme using the gear icon in the header.
