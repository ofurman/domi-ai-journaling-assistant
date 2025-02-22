
import { ElevenLabsWidget } from "../components/ElevenLabsWidget";

const Index = () => {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-white">
      <div className="w-[800px] h-[600px]">
        <ElevenLabsWidget />
      </div>
    </div>
  );
};

export default Index;
