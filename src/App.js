import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/homepage/Home";
import Connect from "./pages/connect/Connect";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/connect", element: <Connect /> },
  ]);


  return (
    <div >
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;