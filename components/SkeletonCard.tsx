export default function SkeletonCard() {
  return (
    <div className="skeleton p-5 mb-5 break-inside-avoid">
      <div className="mb-3 flex items-center justify-between">
        <div className="skeleton-shimmer h-5 w-16" />
        <div className="skeleton-shimmer h-6 w-6 rounded-full" />
      </div>
      <div className="skeleton-shimmer h-6 w-full mb-2" />
      <div className="skeleton-shimmer h-6 w-3/4 mb-4" />
      <div className="skeleton-shimmer h-4 w-full mb-1" />
      <div className="skeleton-shimmer h-4 w-5/6 mb-4" />
      <div className="flex items-center justify-between mt-2">
        <div className="skeleton-shimmer h-3 w-20" />
        <div className="skeleton-shimmer h-4 w-16" />
      </div>
    </div>
  );
}