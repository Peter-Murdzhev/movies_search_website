import { createBrowserRouter,
         createRoutesFromElements,
         Route, RouterProvider } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import MoviePage from "./pages/MoviePage"
import MovieCardsBrowser from "./pages/MovieCardsBrowser"

const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
              <Route path="/movies/:input" element={<MovieCardsBrowser />}/>
              <Route path="/movie/:id" element={<MoviePage />}/>
            </Route>
        )
    )

function App() {
 return <RouterProvider router={router}/>
}

export default App
