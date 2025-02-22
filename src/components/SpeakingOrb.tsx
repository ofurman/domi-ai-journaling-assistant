
const SpeakingOrb = () => {
  return (
    <div className="relative flex items-center justify-center h-24 w-24">
      <div className="absolute animate-ping h-16 w-16 rounded-full bg-blue-400 opacity-20" />
      <div className="absolute animate-pulse h-16 w-16 rounded-full bg-blue-500 opacity-30" />
      <div className="absolute h-12 w-12 rounded-full bg-blue-600" />
    </div>
  );
};

export default SpeakingOrb;
