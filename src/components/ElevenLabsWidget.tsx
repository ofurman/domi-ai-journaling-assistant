
import { useEffect, useState } from 'react';

// Declare the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id': string;
        'dynamic-variables'?: string;
        'variant'?: 'expanded' | 'compact';
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
        const variables = {
          first_message: data.first_message || data.first_prompt,
          custom_prompt: data.custom_prompt,
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
      variant="expanded"
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      }}
    />
  );
};
