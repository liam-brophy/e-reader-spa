import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Notes from "./components/Notes";
import ReaderView from "./components/ReaderView";

const createRoutes = (stories) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // ensures NavBar is always present?
      children: [
        { index: true, element: <Home /> }, // Home Page
        { path: "notes", element: <Notes /> }, // Notes Page
        { path: "reader/:storyId", element: <ReaderView /> },
      ],
    },
  ]);

const AppRoutes = ({ stories }) => {
  const router = createRoutes(stories);

  return <RouterProvider router={router} />;
};

export default AppRoutes;