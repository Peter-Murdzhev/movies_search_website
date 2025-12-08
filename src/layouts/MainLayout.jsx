import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"
import ScrollRestoration from "../components/ScrollRestoration"


const MainLayout = () => {
  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}>
        <ScrollRestoration />
        <SearchBar />
        <Outlet />
        <Footer />
      </div>
    </>
  
  )
}

export default MainLayout;