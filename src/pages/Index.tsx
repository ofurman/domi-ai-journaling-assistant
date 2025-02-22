
import { useEffect, useState } from "react";
import { Conversation } from '@11labs/client';

const Index = () => {
  const [conversation, setConversation] = useState<any>(null);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [agentStatus, setAgentStatus] = useState("listening");
  const [dynamicVariables, setDynamicVariables] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const response = await fetch('https://hook.eu2.make.com/a8dem7kybx5y8sctlot33ekanso4lico');
        const text = await response.text(); // Get response as text first
        
        // Clean the JSON string by removing control characters
        const cleanJson = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
        
        try {
          const data = JSON.parse(cleanJson);
          setDynamicVariables({
            first_message: data.first_message || data.first_prompt || "Hello!",
            custom_prompt: data.custom_prompt || "",
          });
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          // Use default values if JSON parsing fails
          setDynamicVariables({
            first_message: "Hello!",
            custom_prompt: "",
          });
        }
      } catch (error) {
        console.error('Error fetching dynamic variables:', error);
        // Use default values if fetch fails
        setDynamicVariables({
          first_message: "Hello!",
          custom_prompt: "",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVariables();
  }, []);

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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-6 sm:p-8 font-sans">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">ElevenLabs Conversational AI</h1>
      
      <div className="w-full max-w-sm mb-6 sm:mb-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <button
          onClick={startConversation}
          disabled={conversation !== null || isLoading}
          className={`w-full sm:w-auto px-4 sm:px-6 py-4 sm:py-3 rounded-lg ${
            conversation || isLoading ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-medium transition-colors relative`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          ) : (
            'Start Conversation'
          )}
        </button>
        
        <button
          onClick={stopConversation}
          disabled={conversation === null}
          className={`w-full sm:w-auto px-4 sm:px-6 py-4 sm:py-3 rounded-lg ${
            !conversation ? 'bg-gray-300' : 'bg-red-600 hover:bg-red-700'
          } text-white font-medium transition-colors`}
        >
          Stop Conversation
        </button>
      </div>

      <div className="text-base sm:text-lg space-y-2 text-center">
        <p>Status: <span className="font-medium">{connectionStatus}</span></p>
        <p>Agent is <span className="font-medium">{agentStatus}</span></p>
      </div>
    </div>
  );
};

export default Index;
