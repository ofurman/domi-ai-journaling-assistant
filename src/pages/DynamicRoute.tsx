
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const DynamicRoute = () => {
  const { path } = useParams();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="content-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="glass-panel rounded-lg p-6 mb-8">
            <div className="text-sm text-gray-500 mb-2">Current URL</div>
            <code className="text-primary font-mono">
              {window.location.origin}{location.pathname}
            </code>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-panel rounded-lg overflow-hidden">
              <div className="p-6">
                <h1 className="text-3xl font-semibold mb-4">
                  Dynamic Path: {path}
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  This is a dynamically generated page for the path you entered. 
                  You can enter any path in the URL and this page will display it.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicRoute;
