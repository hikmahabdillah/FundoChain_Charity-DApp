const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-15 w-15 border-b-3 border-t-3 border-b-yellow-400 border-t-white"></div>
      <p className="mt-4 text-lg text-white">Loading...</p>
    </div>
  );
};

export default Loading;
