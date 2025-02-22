
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Conversation } from '@11labs/client';

const NotFound = () => {
  const location = useLocation();
  const [conversation, setConversation] = useState<any>(null);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [agentStatus, setAgentStatus] = useState("listening");
  const [dynamicVariables, setDynamicVariables] = useState({});

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    const fetchVariables = async () => {
      try {
        const response = await fetch('https://hook.eu2.make.com/a8dem7kybx5y8sctlot33ekanso4lico');
        const data = await response.json();
        setDynamicVariables({
          first_message: data.first_message || data.first_prompt,
          custom_prompt: data.custom_prompt,
        });
      } catch (error) {
        console.error('Error fetching dynamic variables:', error);
      }
    };

    fetchVariables();
  }, [location.pathname]);

  const startConversation = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const conv = await Conversation.startSession({
        agentId: 'w6UPLbT9UrQACYRfMou2',
        dynamicVariables: dynamicVariables,
        onConnect: () => {
          setConnectionStatus('Connected');
        },
        onDisconnect: () => {
          setConnectionStatus('Disconnected');
        },
        onError: (error) => {
          console.error('Error:', error);
        },
        onModeChange: (mode) => {
          setAgentStatus(mode.mode === 'speaking' ? 'speaking' : 'listening');
        },
      });

      setConversation(conv);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  const stopConversation = async () => {
    if (conversation) {
      await conversation.endSession();
      setConversation(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center glass-panel rounded-lg p-8 max-w-md mx-4"
      >
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          This path doesn't exist in our universe
        </p>
        <code className="block mb-8 p-3 bg-gray-100 rounded text-sm text-gray-600 font-mono">
          {location.pathname}
        </code>
        <a 
          href="/" 
          className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 bg-primary rounded-lg hover:bg-primary/90 focus:shadow-outline focus:outline-none mb-8"
        >
          Return Home
        </a>

        <div className="mt-8 space-y-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={startConversation}
              disabled={conversation !== null}
              className={`px-6 py-3 rounded-lg ${
                conversation ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-medium transition-colors`}
            >
              Start Conversation
            </button>
            
            <button
              onClick={stopConversation}
              disabled={conversation === null}
              className={`px-6 py-3 rounded-lg ${
                !conversation ? 'bg-gray-300' : 'bg-red-600 hover:bg-red-700'
              } text-white font-medium transition-colors`}
            >
              Stop Conversation
            </button>
          </div>

          <div className="text-lg space-y-2">
            <p>Status: <span className="font-medium">{connectionStatus}</span></p>
            <p>Agent is <span className="font-medium">{agentStatus}</span></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
