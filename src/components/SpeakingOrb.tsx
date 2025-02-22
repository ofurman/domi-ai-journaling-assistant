
const SpeakingOrb = () => {
  return (
    <div className="relative flex items-center justify-center h-40 w-40">
      <div className="absolute animate-ping h-36 w-36 rounded-full bg-[#EFDAB5] opacity-20" />
      <div className="absolute animate-pulse h-36 w-36 rounded-full bg-[#EFDAB5] opacity-30" />
      <div className="absolute h-32 w-32 rounded-full bg-[#EFDAB5]" />
      <img 
        src="/lovable-uploads/87084226-26ac-4812-b2c2-e5cc7b34d106.png" 
        alt="AI Assistant Avatar" 
        className="absolute w-40 h-40 object-cover rounded-full z-10"
      />
    </div>
  );
};

export default SpeakingOrb;
