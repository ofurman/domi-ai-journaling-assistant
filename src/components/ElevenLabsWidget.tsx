
import { useEffect, useState } from 'react';

// Declare the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id': string;
        'dynamic-variables'?: string;
      };
    }
  }
}

export const ElevenLabsWidget = () => {
  const [dynamicVariables, setDynamicVariables] = useState('{}');

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const response = await fetch('https://hook.eu2.make.com/a8dem7kybx5y8sctlot33ekanso4lico');
        const data = await response.json();
        // Ensure the required first_message is present
        const variables = {
          first_message: data.first_message || data.first_prompt,
          custom_prompt: data.custom_prompt,
          // Add any other variables from the API response
        };
        setDynamicVariables(JSON.stringify(variables));
      } catch (error) {
        console.error('Error fetching dynamic variables:', error);
      }
    };

    fetchVariables();
  }, []);

  return (
    <elevenlabs-convai 
      agent-id="w6UPLbT9UrQACYRfMou2"
      dynamic-variables={dynamicVariables}
    />
  );
};
