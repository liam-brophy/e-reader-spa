import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Notes from "./components/Notes";
import ReaderView from "./components/ReaderView";
import UploadPage from "./components/UploadPage";

const createRoutes = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "notes", element: <Notes /> },
        { path: "reader/:storyId", element: <ReaderView /> },
        { path: "upload", element: <UploadPage /> },
      ],
    },
  ]);

const AppRoutes = () => {
  const router = createRoutes();
  return <RouterProvider router={router} />;
};

export default AppRoutes;