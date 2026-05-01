export default function SettingsSkeleton() {
  return (
    <div className="max-w-6xl animate-pulse">
      <div className="h-8 w-64 bg-surface-container rounded-xl mb-2" />
      <div className="h-4 w-96 bg-surface-container rounded-xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          {[...Array(3)].map((_, i) => <div key={i} className="h-48 bg-surface-container-low rounded-xl" />)}
        </div>
        <div className="lg:col-span-5">
          <div className="h-[520px] bg-surface-container-low rounded-xl" />
        </div>
      </div>
    </div>
  )
}
