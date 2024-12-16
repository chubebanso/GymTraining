import { Outlet } from "react-router-dom"
import Header from "../header/Header"
import "./Layout.css"

const Layout = () => {
  return (
    <>
    <Header />
    <main className="main">
        <Outlet/>
    </main>
    </>
  )
}

export default Layout