
import { useEffect, useState } from "react";
import { Conversation } from '@11labs/client';

const Index = () => {
  const [conversation, setConversation] = useState<any>(null);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [agentStatus, setAgentStatus] = useState("listening");
  const [dynamicVariables, setDynamicVariables] = useState({});

  useEffect(() => {
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8">ElevenLabs Conversational AI</h1>
      
      <div className="mb-8 space-x-4">
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
  );
};

export default Index;
