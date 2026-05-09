const CONCEPT_IMAGE = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1"/>
      <stop offset="50%" style="stop-color:#16213e;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0f3460;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="w" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#e8e8ed;stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:#e8e8ed;stop-opacity:0.1"/>
    </linearGradient>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00ff88;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:#00ff88;stop-opacity:0.08"/>
      <stop offset="100%" style="stop-color:#00ff88;stop-opacity:0"/>
    </linearGradient>
  </defs>
  <rect fill="url(#g)" width="400" height="300"/>

  <!-- Floor -->
  <polygon points="0,220 400,220 400,300 0,300" fill="rgba(255,255,255,0.03)"/>

  <!-- Back wall -->
  <rect x="60" y="70" width="280" height="150" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>

  <!-- Floor line -->
  <line x1="0" y1="220" x2="400" y2="220" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>

  <!-- Large window with light -->
  <rect x="140" y="90" width="120" height="90" fill="url(#w)" rx="1"/>
  <line x1="200" y1="90" x2="200" y2="180" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
  <line x1="140" y1="135" x2="260" y2="135" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>

  <!-- Light glow from window -->
  <ellipse cx="200" cy="180" rx="80" ry="40" fill="url(#g2)"/>

  <!-- Furniture outlines -->
  <rect x="70" y="170" width="60" height="50" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" rx="1"/>
  <rect x="270" y="180" width="50" height="40" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" rx="1"/>
  <rect x="155" y="195" width="30" height="25" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" rx="1"/>
  <rect x="215" y="195" width="30" height="25" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" rx="1"/>

  <!-- Ambient accent glow -->
  <circle cx="200" cy="180" r="100" fill="rgba(0,255,136,0.03)"/>

  <text x="200" y="290" text-anchor="middle" fill="#444460" font-size="11" font-family="sans-serif">CONCEPT OUTPUT</text>
</svg>`)}`

export default function ConceptOutputPanel() {
  return (
    <div className="glass rounded-xl overflow-hidden flex flex-col h-full">
      <div className="px-3 py-2 border-b border-border-subtle flex items-center justify-between">
        <span className="text-[11px] text-text-secondary font-medium tracking-wide">概念输出</span>
        <span className="text-[10px] text-text-muted">Concept Output</span>
      </div>
      <div className="flex-1 flex items-center justify-center p-3 relative">
        <img
          src={CONCEPT_IMAGE}
          alt="concept output"
          className="w-full h-full object-contain rounded-lg"
        />
        <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-accent/10 border border-accent/20">
          <span className="text-[10px] text-accent font-medium">OUTPUT</span>
        </div>
      </div>
    </div>
  )
}
