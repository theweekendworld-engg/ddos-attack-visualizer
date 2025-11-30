export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <div className="text-white text-xl font-medium">Loading 3D Globe...</div>
        <p className="text-white/60 text-sm mt-2">Preparing real-time attack visualization</p>
      </div>
    </div>
  );
}

