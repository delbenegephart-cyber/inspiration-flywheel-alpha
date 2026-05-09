import { useState, useRef } from 'react'

const DEFAULT_SKETCH = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <rect fill="#1a1a24" width="320" height="240"/>
  <g stroke="#555580" stroke-width="1" fill="none" opacity="0.6">
    <rect x="40" y="60" width="240" height="140" rx="2"/>
    <line x1="40" y1="60" x2="100" y2="20"/>
    <line x1="280" y1="60" x2="220" y2="20"/>
    <line x1="100" y1="20" x2="220" y2="20"/>
    <rect x="80" y="80" width="60" height="80" rx="1"/>
    <rect x="180" y="80" width="60" height="80" rx="1"/>
    <line x1="40" y1="200" x2="280" y2="200"/>
    <rect x="140" y="140" width="40" height="60" rx="1"/>
    <line x1="110" y1="60" x2="110" y2="200" stroke-dasharray="4,4"/>
    <line x1="210" y1="60" x2="210" y2="200" stroke-dasharray="4,4"/>
  </g>
  <text x="160" y="235" text-anchor="middle" fill="#555580" font-size="10" font-family="sans-serif">DEFAULT SKETCH</text>
</svg>`)}`

export default function UploadZone({ onImageUpload, uploadedImage }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file)
    }
  }

  const handleClick = () => fileInputRef.current?.click()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) onImageUpload(file)
  }

  const displayImage = uploadedImage || DEFAULT_SKETCH

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs text-text-secondary tracking-wider uppercase font-medium">输入草图</div>

      {!uploadedImage ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            glass rounded-xl cursor-pointer transition-all duration-200
            flex flex-col items-center justify-center gap-2 p-4 min-h-[180px]
            ${isDragging ? 'border-accent bg-accent/5 glow-line' : 'glass-hover'}
          `}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span className="text-xs text-text-muted">Drop Sketch Here</span>
          <span className="text-[10px] text-text-muted/50">点击或拖拽上传</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="glass rounded-xl overflow-hidden cursor-pointer glass-hover relative group"
        >
          <img src={displayImage} alt="sketch" className="w-full h-auto object-cover" />
          <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-xs text-accent">更换草图</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  )
}
