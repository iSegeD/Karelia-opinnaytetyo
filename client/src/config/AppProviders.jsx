import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../store/reduxStore";

import App from "../App";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import FullPost from "../pages/FullPost";
import TagsPosts from "../pages/TagsPosts";
import AuthorPosts from "../pages/AuthorPosts";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import Authors from "../pages/Authors";
import UserProfile from "../pages/UserProfile";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <SignIn /> },
      { path: "posts/:id", element: <FullPost /> },
      { path: "posts/tags/:tag", element: <TagsPosts /> },
      { path: "posts/users/:id", element: <AuthorPosts /> },
      { path: "create", element: <CreatePost /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "authors", element: <Authors /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "myposts/:id", element: <Dashboard /> },
    ],
  },
]);

const AppProviders = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default AppProviders;
