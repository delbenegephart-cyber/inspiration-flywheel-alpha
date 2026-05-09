export default function AIAssistantPanel({ onSyncToAHOLO }) {
  const suggestions = [
    { text: '增加顶部采光', icon: '☀' },
    { text: '优化入口动线', icon: '↗' },
    { text: '材料比例统一', icon: '▦' },
  ]

  const materials = ['混凝土', '铝板', '石材']

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border-subtle">
        <div className="text-xs text-text-secondary tracking-wider uppercase font-medium">AI 助手</div>
        <div className="text-[10px] text-text-muted">AI Creative Assistant</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
        {/* Structure Score */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-text-secondary">结构合理性</span>
            <span className="text-sm text-accent font-semibold font-mono">82%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-accent/10 overflow-hidden">
            <div className="h-full w-[82%] rounded-full bg-accent transition-all duration-500" />
          </div>
        </div>

        {/* Suggestions */}
        <div>
          <div className="text-xs text-text-secondary mb-2 font-medium">建议</div>
          <div className="flex flex-col gap-1.5">
            {suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2 px-2.5 py-2 rounded-lg glass glass-hover">
                <span className="text-accent text-xs mt-px">{s.icon}</span>
                <span className="text-xs text-text-primary">{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div>
          <div className="text-xs text-text-secondary mb-2 font-medium">材质</div>
          <div className="flex flex-wrap gap-1.5">
            {materials.map((m, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg text-xs text-text-secondary glass border border-border-subtle">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* PPT Ready */}
        <div className="glass rounded-lg p-3 flex items-center gap-2 border border-accent/10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <div className="flex flex-col">
            <span className="text-xs text-text-primary font-medium">演示文稿就绪</span>
            <span className="text-[10px] text-text-muted">PPT 生成准备完成</span>
          </div>
        </div>
      </div>

      {/* Sync Button */}
      <div className="px-4 py-3 border-t border-border-subtle">
        <button
          onClick={onSyncToAHOLO}
          className="
            w-full px-4 py-2.5 rounded-lg text-xs font-semibold
            bg-accent text-bg-primary
            hover:bg-accent-dim active:scale-[0.98]
            transition-all duration-150
            shadow-[0_0_12px_rgba(0,255,136,0.2)]
            cursor-pointer
          "
        >
          同步至 AHOLO
        </button>
      </div>
    </div>
  )
}
