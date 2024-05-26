export interface HoverCardProps extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
  background: string
  title: string
  desc: string
}

export function HoverCard({ title, background, desc }: HoverCardProps) {
  return (
    <div className="rounded-lg p-2 border border-gray-200 overflow-hidden sm:size-30 md:size-40 lg:size-60 duration-150 min-h-20 min-w-20">
      <div className="rounded-lg w-full h-3/4" style={{ background }}></div>
      <div className="p-3">
        <b className="font-bold">{ title }</b>
        <span className="text-xs line-clamp-2">{ desc }</span>
      </div>
    </div>
  )
}
