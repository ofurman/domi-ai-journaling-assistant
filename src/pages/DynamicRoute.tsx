
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface RouteContent {
  title: string;
  description: string;
  image?: string;
}

const routeContents: Record<string, RouteContent> = {
  link1: {
    title: "Welcome to Link 1",
    description: "This is the first dynamic route showcasing our content system.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  },
  link2: {
    title: "Exploring Link 2",
    description: "Discover more about our dynamic routing capabilities.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
  },
};

const DynamicRoute = () => {
  const { path } = useParams();
  const location = useLocation();
  const content = path ? routeContents[path] : null;

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

          {content ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="glass-panel rounded-lg overflow-hidden">
                {content.image && (
                  <div className="relative h-64 w-full">
                    <img 
                      src={content.image} 
                      alt={content.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h1 className="text-3xl font-semibold mb-4">{content.title}</h1>
                  <p className="text-gray-600 leading-relaxed">
                    {content.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-gray-500">
              No content found for this route.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicRoute;
