
import { useEffect, useState } from "react";
import { Conversation } from '@11labs/client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SpeakingOrb from "@/components/SpeakingOrb";
import { Loader2, Mic, MicOff } from "lucide-react";

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
          console.log('Status: Connected');
        },
        onDisconnect: () => {
          setConnectionStatus('Disconnected');
          console.log('Status: Disconnected');
        },
        onError: (error) => {
          console.error('Error:', error);
        },
        onModeChange: (mode) => {
          setAgentStatus(mode.mode === 'speaking' ? 'speaking' : 'listening');
          console.log(`Agent is ${mode.mode}`);
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
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white flex flex-col items-center justify-center px-4 py-6 sm:p-8">
      <Card className="w-full max-w-md bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl sm:text-3xl text-violet-900">
            Domi
          </CardTitle>
          <CardDescription className="text-violet-600">
            Your AI companion
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex justify-center mb-6">
            {agentStatus === 'speaking' ? (
              <SpeakingOrb />
            ) : (
              <div className="h-24 w-24 rounded-full bg-violet-100 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-violet-200 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-violet-300" />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={conversation ? stopConversation : startConversation}
              disabled={isLoading}
              className={`w-32 h-32 rounded-full transition-all duration-300 ${
                conversation 
                  ? 'bg-red-400 hover:bg-red-500' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : conversation ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
