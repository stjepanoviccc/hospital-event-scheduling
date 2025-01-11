import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import Logo from "../../components/ui/logo";
import Button from "../ui/button";
import Wrap from "../layout/wrap";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <header className="bg-white shadow-md px-6 py-4">
      <Wrap className="flex justify-between items-center">
        <Logo className="w-24" />
        
        <nav className="hidden md:flex gap-x-8">
          <Link to="/all-events" className="text-lg text-secondaryColor hover:text-primaryColor transition duration-300">
            All Events
          </Link>
          <Link to="/my-events" className="text-lg text-secondaryColor hover:text-primaryColor transition duration-300">
            My Events
          </Link>
          <Link to="/slots" className="text-lg text-secondaryColor hover:text-primaryColor transition duration-300">
            Slots
          </Link>
        </nav>

        <div className="md:hidden flex items-center">
          <button
            className="text-primaryColor focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="hidden md:block flex gap-x-4">
          <Button className="button button-primary" type="button" onClick={handleLogout}>Logout</Button>
        </div>
      </Wrap>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-md mt-4 px-6 py-4`}>
        <nav className="flex flex-col gap-y-4">
          <Link to="/all-events" className="text-lg text-secondaryColor hover:text-primaryColor transition duration-300">
            All Events
          </Link>
          <Link to="/my-events" className="text-lg text-secondaryColor hover:text-primaryColor transition duration-300">
            My Events
          </Link>
          <Link to="/slots" className="text-lg text-secondaryColor hover:text-primaryColor transition duration-300">
            Slots
          </Link>
          <Button className="button button-primary" type="button" onClick={handleLogout}>Logout</Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;