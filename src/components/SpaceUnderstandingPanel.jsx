export default function SpaceUnderstandingPanel() {
  return (
    <div className="glass rounded-xl overflow-hidden flex flex-col h-full relative">
      <div className="px-3 py-2 border-b border-border-subtle flex items-center justify-between">
        <span className="text-[11px] text-text-secondary font-medium tracking-wide">空间理解</span>
        <span className="text-[10px] text-text-muted">Spatial Understanding</span>
      </div>
      <div className="flex-1 flex items-center justify-center p-3 relative bg-[#0d0d15]">
        {/* Grid overlay */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,255,136,0.12)" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid-large" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(0,255,136,0.2)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#grid-large)" />
        </svg>

        {/* 3D wireframe illustration */}
        <svg className="relative z-10 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
          <g stroke="#00ff88" strokeWidth="1.2" fill="none" opacity="0.7">
            {/* Main spatial volume */}
            <polygon points="50,70 350,70 350,250 50,250" strokeOpacity="0.4" />
            <polygon points="50,70 130,20 270,20 350,70" strokeOpacity="0.6" />
            <line x1="130" y1="20" x2="130" y2="250" strokeDasharray="4,6" strokeOpacity="0.3" />
            <line x1="270" y1="20" x2="270" y2="250" strokeDasharray="4,6" strokeOpacity="0.3" />

            {/* Internal structure */}
            <rect x="90" y="100" width="70" height="100" rx="1" strokeOpacity="0.5" />
            <rect x="240" y="100" width="70" height="100" rx="1" strokeOpacity="0.5" />
            <rect x="170" y="170" width="60" height="80" rx="1" strokeOpacity="0.5" />

            {/* Depth dimension lines */}
            <line x1="50" y1="70" x2="50" y2="250" strokeOpacity="0.2" />
            <line x1="350" y1="70" x2="350" y2="250" strokeOpacity="0.2" />
          </g>

          {/* Scanning line */}
          <line className="animate-scan" x1="0" y1="0" x2="400" y2="0" stroke="#00ff88" strokeWidth="1.5" strokeOpacity="0.8" />

          {/* Annotation nodes */}
          <circle cx="125" cy="150" r="2" fill="#00ff88" opacity="0.8" />
          <circle cx="275" cy="150" r="2" fill="#00ff88" opacity="0.8" />
          <circle cx="200" cy="210" r="2" fill="#00ff88" opacity="0.8" />

          {/* Connection lines for annotations */}
          <line x1="125" y1="150" x2="80" y2="120" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="275" y1="150" x2="320" y2="120" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="200" y1="210" x2="200" y2="270" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.4" />

          <text x="65" y="115" fill="#00ff88" fontSize="7" opacity="0.6" fontFamily="sans-serif">WALL</text>
          <text x="322" y="115" fill="#00ff88" fontSize="7" opacity="0.6" fontFamily="sans-serif">OPENING</text>
          <text x="210" y="280" fill="#00ff88" fontSize="7" opacity="0.6" fontFamily="sans-serif">FLOOR PLANE</text>

          {/* Axes */}
          <g stroke="#00ff88" strokeWidth="0.8" strokeOpacity="0.4">
            <line x1="15" y1="265" x2="45" y2="265" />
            <line x1="15" y1="265" x2="15" y2="240" />
            <text x="18" y="278" fill="#00ff88" fontSize="6" opacity="0.5" fontFamily="sans-serif">X</text>
            <text x="5" y="248" fill="#00ff88" fontSize="6" opacity="0.5" fontFamily="sans-serif">Y</text>
          </g>
        </svg>

        <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-accent/10 border border-accent/20">
          <span className="text-[10px] text-accent font-medium">AI ANALYZING</span>
        </div>

        {/* Confidence indicator */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="w-16 h-1 rounded-full bg-accent/20 overflow-hidden">
            <div className="h-full w-[82%] rounded-full bg-accent" />
          </div>
          <span className="text-[10px] text-accent/60 font-mono">82%</span>
        </div>
      </div>
    </div>
  )
}
