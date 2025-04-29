import { 
  User, 
  Book, 
  Bookmark, 
  Clock, 
  CreditCard, 
  Users, 
  Settings 
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar({ activeSection, setActiveSection }) {
  const sections = [
    { name: "Profile", key: "profile", icon: <User className="w-5 h-5" /> },
    { name: "My Library", key: "library", icon: <Book className="w-5 h-5" /> },
    { name: "Recommendations", key: "recommendations", icon: <Bookmark className="w-5 h-5" /> },
    { name: "Activity", key: "activity", icon: <Clock className="w-5 h-5" /> },
    { name: "Subscriptions", key: "subscriptions", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Community", key: "community", icon: <Users className="w-5 h-5" /> },
    { name: "Settings", key: "settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-gray-100 border-r border-gray-200 p-6 hidden md:flex flex-col mt-10 mb-10"> {/* Added mt-10 for top margin */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="bg-blue-600 text-white p-2 rounded-lg">
            <Book className="w-5 h-5" />
          </span>
          USER DASHBOARD
        </h2>
      </motion.div>

      <nav className="flex flex-col gap-2">
        {sections.map((section) => (
          <motion.button
            key={section.key}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSection(section.key)}
            className={`text-left px-4 py-3 rounded-lg transition-all font-medium flex items-center gap-3 ${
              activeSection === section.key
                ? "bg-white text-blue-600 shadow-md border border-gray-200"
                : "text-gray-600 hover:bg-white hover:text-gray-800 hover:shadow-sm"
            }`}
          >
            <span className={`${
              activeSection === section.key 
                ? "text-blue-500" 
                : "text-gray-500"
            }`}>
              {section.icon}
            </span>
            {section.name}
            {activeSection === section.key && (
              <motion.span 
                layoutId="sidebar-active"
                className="w-1 h-6 bg-blue-500 rounded-full ml-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

    
      
    </aside>
  );
}