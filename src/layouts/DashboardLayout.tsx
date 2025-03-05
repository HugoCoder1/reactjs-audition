import { PropsWithChildren, useState } from "react";
import { Link } from "react-router-dom";
import { User, Earth, Gem } from "lucide-react";
function DashboardLayout({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Navigation</h2>
          <ul>
            <li className="mb-4">
              <Link to="/" className="flex items-center space-x-2 text-white">
                <User className="text-lg" />
                <span>Utilisateur</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/countries"
                className="flex items-center space-x-2 text-white"
              >
                <Earth className="text-lg" />
                <span>Pays</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/crypto"
                className="flex items-center space-x-2 text-white"
              >
                <Gem className="text-lg" />
                <span>Crypto</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Hamburger for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 bg-gray-800 text-white rounded-lg"
        >
          {isOpen ? "Fermer" : "Ouvrir"} Menu
        </button>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
