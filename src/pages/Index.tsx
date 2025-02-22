
import { useEffect, useState } from "react";
import { Conversation } from '@11labs/client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SpeakingOrb from "@/components/SpeakingOrb";
import { Mic, MicOff } from "lucide-react";

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
        const text = await response.text();
        const cleanJson = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
        
        try {
          const data = JSON.parse(cleanJson);
          setDynamicVariables({
            first_message: data.first_message || data.first_prompt || "Hello!",
            custom_prompt: data.custom_prompt || "",
          });
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          setDynamicVariables({
            first_message: "Hello!",
            custom_prompt: "",
          });
        }
      } catch (error) {
        console.error('Error fetching dynamic variables:', error);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-4 py-6 sm:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl sm:text-3xl">
            ElevenLabs AI
          </CardTitle>
          <CardDescription>
            Start a conversation with our AI assistant
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            {agentStatus === 'speaking' && connectionStatus === 'Connected' ? (
              <SpeakingOrb />
            ) : (
              <div className="h-24 flex items-center justify-center text-gray-400">
                {connectionStatus === 'Connected' ? <Mic size={48} /> : <MicOff size={48} />}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={startConversation}
              disabled={conversation !== null || isLoading}
              className="w-full sm:w-auto"
              variant={conversation ? "secondary" : "default"}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                'Start Conversation'
              )}
            </Button>
            
            <Button
              onClick={stopConversation}
              disabled={conversation === null}
              variant="destructive"
              className="w-full sm:w-auto"
            >
              Stop Conversation
            </Button>
          </div>

          <div className="text-center space-y-2 text-sm text-muted-foreground">
            <p>Status: <span className="font-medium text-foreground">{connectionStatus}</span></p>
            <p>Agent is <span className="font-medium text-foreground">{agentStatus}</span></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
