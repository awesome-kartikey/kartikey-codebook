# Frequently Asked Questions (FAQ)

Here are answers to some common questions developers or users might have about the CodeBook project.

**1. What backend technology is used in this project?**

This project uses `json-server` and `json-server-auth` to simulate a RESTful API backend. It reads data from the `data/db.json` file and provides endpoints for products, users, orders, etc. `json-server-auth` adds basic JWT-based authentication (login/register) on top of `json-server`.

**Important:** `json-server` is intended for development, prototyping, and mocking. It's **not** a production-ready backend solution.

**2. How is user authentication handled?**

User authentication is managed by `json-server-auth`.
*   When a user registers or logs in via the `/register` or `/login` endpoints (handled by `src/services/authService.js`), `json-server-auth` validates the credentials against the `users` array in `db.json` (hashes passwords) and returns a JSON Web Token (JWT) access token.
*   This token, along with the user ID (`cbid`), is stored in the browser's `sessionStorage`.
*   For protected API requests (like fetching user data or orders), the token is included in the `Authorization: Bearer <token>` header (`src/services/dataService.js`). `json-server-auth` middleware verifies this token.
*   Client-side route protection (`src/routes/ProtectedRoute.js`) checks for the existence of the token in `sessionStorage` before allowing access to routes like `/cart`, `/dashboard`, and `/order-summary`.
*   Logging out simply removes the token and user ID from `sessionStorage`.

**3. How is application state managed?**

Global application state, specifically for the Shopping Cart and Product Filters, is managed using React's built-in **Context API** combined with the **`useReducer` hook**.

*   **`src/context/CartContext.js`**: Manages the `cartList` (items in the cart) and `total` price. Uses `cartReducer` (`src/reducers/cartReducers.js`) to handle adding, removing, and clearing items.
*   **`src/context/FilterContext.js`**: Manages the state related to product filters (`productList`, `onlyInStock`, `bestSellerOnly`, `sortBy`, `ratings`). Uses `filterReducer` (`src/reducers/filterReducers.js`) to update filter criteria and provides the derived `filteredProductList` to components.
*   Providers (`CartProvider`, `FilterProvider`) wrap the application in `src/index.js` to make the state and dispatch functions available throughout the component tree via custom hooks (`useCart`, `useFilter`).

**4. Can I add my own eBooks to the store?**

Yes. Since the backend is mocked using `json-server`, you can modify the data directly:

1.  Open the `data/db.json` file.
2.  Add new product objects to the `"products"` array. Follow the existing structure (ensure fields like `id`, `name`, `price`, `poster`, `image_local`, `rating`, `in_stock`, etc., are included).
3.  You might also want to add corresponding image files to `public/assets/images/` and update the `image_local` path.
4.  If `json-server` is running, stop it (Ctrl+C) and restart it using the command `npx json-server-auth --watch data/db.json --routes data/routes.json --port 8000` to reflect the changes.

**5. Is this application ready for production deployment?**

No. The backend relies on `json-server`, which is **not suitable for production environments** due to limitations in performance, security, and scalability. For a production application, you would need to replace `json-server` with a robust backend built using technologies like Node.js/Express, Python/Django/Flask, Ruby on Rails, etc., and a proper database (e.g., PostgreSQL, MongoDB).

The frontend code itself provides a solid foundation but would likely require further optimization, error handling enhancements, and comprehensive testing before production use.

**6. How do I run the application using Docker?**

The `Dockerfile` provides instructions to containerize the application.

1.  **Build the image:** Navigate to the project root directory in your terminal and run:
    ```bash
    docker build -t codebook-app .
    ```
2.  **Run the container:**
    ```bash
    docker run -p 3000:10000 -e PORT=10000 codebook-app
    ```
    *   `-p 3000:10000` maps port 3000 on your host machine to port 10000 inside the container (which `json-server` is configured to use via the `PORT` environment variable).
    *   `-e PORT=10000` sets the environment variable inside the container.

    The application will be accessible at `http://localhost:3000`.

    The `Dockerfile` uses a **multi-stage build**:
    *   **Stage 1 (`build-stage`):** Installs all dependencies (`npm install`), copies source code, and builds the static React app (`npm run build`). It uses build-time environment variables (like `REACT_APP_HOST=""`) to configure the build. Setting `REACT_APP_HOST` to an empty string during the build makes the frontend use relative paths for API calls, which is crucial for the production stage where the API and static files are served from the same origin.
    *   **Stage 2 (`production-stage`):** Starts from a clean Node image, installs *only* production dependencies (`json-server`, `json-server-auth`), copies the built React app (from `build-stage`) and the `data` folder. It then runs `json-server-auth` configured to serve the static files from the `./build` directory and handle API requests (`npm start` script in `package.json`).

**7. What are the guest login credentials?**

You can log in as a guest user using the following credentials:
*   **Email:** `kartikey@example.com`
*   **Password:** `learnreact`

These are configured in the `Dockerfile` as environment variables and used within the `Login.js` component's `handleLoginGuest` function (using `process.env.REACT_APP_GUEST_LOGIN` and `process.env.REACT_APP_GUEST_PASSWORD`).

---