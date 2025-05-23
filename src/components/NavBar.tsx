import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <header className="header">
            <NavLink to="/portfolio1/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
                <p className="blue-gradient-text">AH</p>
            </NavLink>
            <nav className="flex text-lg gap-7 font-medium">
                <NavLink to="/portfolio1/about" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black'}>
                    About
                </NavLink>
                <NavLink to="/portfolio1/projects" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black'}>
                    Projects
                </NavLink>
                <NavLink to="/portfolio1/contact" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black'}>
                    Contact
                </NavLink>
            </nav>
        </header>
    )
}

export default Navbar