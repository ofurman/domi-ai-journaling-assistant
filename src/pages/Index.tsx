
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  {
    path: "link1",
    title: "First Dynamic Route",
    description: "Explore our first dynamic route example",
  },
  {
    path: "link2",
    title: "Second Dynamic Route",
    description: "Discover more dynamic routing capabilities",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dynamic Paths Display
          </h1>
          <p className="text-xl text-gray-600">
            Explore our dynamic routing system
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {links.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Link to={`/${link.path}`} className="block">
                <div className="glass-panel rounded-lg p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {link.title}
                  </h2>
                  <p className="text-gray-600">{link.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
