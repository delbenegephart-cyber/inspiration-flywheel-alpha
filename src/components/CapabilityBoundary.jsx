const items = [
  { label: '草图理解', en: 'Sketch Understanding', mvp: true },
  { label: '空间理解', en: 'Spatial Understanding', mvp: true },
  { label: '材质氛围', en: 'Material & Atmosphere', mvp: true },
  { label: '自动布局', en: 'Auto Layout', mvp: true },
  { label: '空间推理', en: 'Spatial Reasoning', mvp: false },
  { label: 'BIM 协同', en: 'BIM Collaboration', mvp: false },
  { label: 'Multi-Agent', en: 'Multi-Agent System', mvp: false },
]

export default function CapabilityBoundary() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <div className="flex items-center gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`
              flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs
              transition-all duration-200
              ${item.mvp
                ? 'text-accent bg-accent/5 border border-accent/15'
                : 'text-text-muted/40 glass border border-border-subtle/40'
              }
            `}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${item.mvp ? 'bg-accent' : 'bg-text-muted/30'}`} />
            <span>{item.label}</span>
            <span className="text-[9px] opacity-40 ml-0.5">{item.en}</span>
            {item.mvp && (
              <span className="text-[8px] uppercase tracking-wider text-accent/50 ml-0.5">MVP</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
