const DEFAULT_SKETCH = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect fill="#12121a" width="400" height="300"/>
  <g stroke="#666690" stroke-width="1.2" fill="none" opacity="0.7">
    <rect x="50" y="70" width="300" height="180" rx="2"/>
    <line x1="50" y1="70" x2="130" y2="20"/>
    <line x1="350" y1="70" x2="270" y2="20"/>
    <line x1="130" y1="20" x2="270" y2="20"/>
    <rect x="90" y="100" width="70" height="100" rx="1"/>
    <line x1="125" y1="100" x2="125" y2="200"/>
    <rect x="240" y="100" width="70" height="100" rx="1"/>
    <line x1="275" y1="100" x2="275" y2="200"/>
    <rect x="170" y="170" width="60" height="80" rx="1"/>
    <path d="M170 170 L200 150 L230 170" />
    <line x1="50" y1="250" x2="350" y2="250"/>
    <line x1="50" y1="70" x2="50" y2="250"/>
    <line x1="350" y1="70" x2="350" y2="250"/>
  </g>
  <text x="200" y="290" text-anchor="middle" fill="#444460" font-size="11" font-family="sans-serif">SKETCH INPUT</text>
</svg>`)}`

export default function SketchPanel({ uploadedImage }) {
  return (
    <div className="glass rounded-xl overflow-hidden flex flex-col h-full">
      <div className="px-3 py-2 border-b border-border-subtle flex items-center justify-between">
        <span className="text-[11px] text-text-secondary font-medium tracking-wide">草图输入</span>
        <span className="text-[10px] text-text-muted">Sketch Input</span>
      </div>
      <div className="flex-1 flex items-center justify-center p-3 relative">
        <img
          src={uploadedImage || DEFAULT_SKETCH}
          alt="sketch input"
          className="w-full h-full object-contain rounded-lg"
        />
        <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-accent/10 border border-accent/20">
          <span className="text-[10px] text-accent font-medium">INPUT</span>
        </div>
      </div>
    </div>
  )
}
