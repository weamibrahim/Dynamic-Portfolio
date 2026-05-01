export default function ProjectSkeleton() {
  return (
    <div className="space-y-px">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 animate-pulse">
          <div className="col-span-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high" />
            <div className="space-y-1.5">
              <div className="h-3 w-32 bg-surface-container-high rounded" />
              <div className="h-2.5 w-24 bg-surface-container rounded" />
            </div>
          </div>
          <div className="col-span-2 flex items-center"><div className="h-5 w-20 bg-surface-container-high rounded-full" /></div>
          <div className="col-span-2 flex items-center gap-1">
            <div className="h-5 w-12 bg-surface-container-high rounded-full" />
            <div className="h-5 w-12 bg-surface-container-high rounded-full" />
          </div>
          <div className="col-span-2 flex items-center"><div className="h-3 w-24 bg-surface-container rounded" /></div>
          <div className="col-span-2 flex items-center justify-end gap-2">
            {[...Array(3)].map((_, j) => <div key={j} className="w-7 h-7 rounded-lg bg-surface-container-high" />)}
          </div>
        </div>
      ))}
    </div>
  )
}
