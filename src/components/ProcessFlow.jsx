export default function ProcessFlow() {
  const steps = [
    { label: '草图输入', sublabel: 'Sketch Input', icon: '✎' },
    { label: '空间理解', sublabel: 'Spatial Understanding', icon: '◈' },
    { label: '概念输出', sublabel: 'Concept Output', icon: '◉' },
  ]

  return (
    <div className="flex items-center justify-center gap-0 py-3">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-xs">
              {step.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-text-primary font-medium leading-tight">{step.label}</span>
              <span className="text-[10px] text-text-muted leading-tight">{step.sublabel}</span>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex items-center mx-4">
              <div className="w-8 h-px bg-accent/20" />
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-accent/30 -ml-1">
                <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
