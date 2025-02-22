
const SpeakingOrb = () => {
  return (
    <div className="relative flex items-center justify-center h-32 w-32">
      <div className="absolute animate-ping h-24 w-24 rounded-full bg-[#EFDAB5] opacity-20" />
      <div className="absolute animate-pulse h-24 w-24 rounded-full bg-[#EFDAB5] opacity-30" />
      <div className="absolute h-20 w-20 rounded-full bg-[#EFDAB5]" />
      <img 
        src="/lovable-uploads/87084226-26ac-4812-b2c2-e5cc7b34d106.png" 
        alt="AI Assistant Avatar" 
        className="absolute w-32 h-32 object-cover z-10"
      />
    </div>
  );
};

export default SpeakingOrb;
