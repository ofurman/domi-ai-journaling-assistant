
const SpeakingOrb = () => {
  return (
    <div className="relative flex items-center justify-center h-24 w-24">
      <div className="absolute animate-ping h-16 w-16 rounded-full bg-violet-400 opacity-20" />
      <div className="absolute animate-pulse h-16 w-16 rounded-full bg-violet-500 opacity-30" />
      <div className="absolute h-12 w-12 rounded-full bg-violet-600" />
      <img 
        src="/lovable-uploads/87084226-26ac-4812-b2c2-e5cc7b34d106.png" 
        alt="AI Assistant Avatar" 
        className="absolute w-24 h-24 object-cover z-10"
      />
    </div>
  );
};

export default SpeakingOrb;
