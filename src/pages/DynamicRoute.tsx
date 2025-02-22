
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Conversation } from '@11labs/client';

const DynamicRoute = () => {
  const { path } = useParams();
  const location = useLocation();
  const [conversation, setConversation] = useState<any>(null);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [agentStatus, setAgentStatus] = useState("listening");
  const [dynamicVariables, setDynamicVariables] = useState({});

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="content-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 p-8"
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
            className="glass-panel rounded-lg overflow-hidden p-6"
          >
            <h1 className="text-3xl font-semibold mb-4">
              Dynamic Path: {path}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              This is a dynamically generated page for the path you entered. 
              You can enter any path in the URL and this page will display it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel rounded-lg p-6 mt-8"
          >
            <div className="space-y-4">
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

              <div className="text-lg space-y-2 text-center">
                <p>Status: <span className="font-medium">{connectionStatus}</span></p>
                <p>Agent is <span className="font-medium">{agentStatus}</span></p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicRoute;
