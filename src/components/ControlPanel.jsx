import { useState } from 'react'

const SPACE_TYPES = ['Cafe', 'Gallery', 'Lobby']
const STYLE_TAGS = [
  { key: 'morning', label: '清晨', en: 'Morning' },
  { key: 'dusk', label: '黄昏', en: 'Dusk' },
  { key: 'night', label: '夜景', en: 'Night' },
  { key: 'rainy', label: '雨天', en: 'Rainy' },
]

export default function ControlPanel() {
  const [selectedType, setSelectedType] = useState('Cafe')
  const [selectedStyles, setSelectedStyles] = useState(['morning'])

  const toggleStyle = (key) => {
    setSelectedStyles((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Space Type */}
      <div>
        <div className="text-xs text-text-secondary tracking-wider uppercase font-medium mb-2">空间类型</div>
        <div className="flex flex-col gap-1.5">
          {SPACE_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`
                px-3 py-2 rounded-lg text-xs transition-all duration-200 text-left
                ${selectedType === type
                  ? 'bg-accent/10 border border-accent/30 text-accent shadow-[0_0_8px_rgba(0,255,136,0.1)]'
                  : 'glass glass-hover text-text-secondary border border-transparent'
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Style Tags */}
      <div>
        <div className="text-xs text-text-secondary tracking-wider uppercase font-medium mb-2">风格氛围</div>
        <div className="flex flex-wrap gap-1.5">
          {STYLE_TAGS.map((tag) => {
            const active = selectedStyles.includes(tag.key)
            return (
              <button
                key={tag.key}
                onClick={() => toggleStyle(tag.key)}
                className={`
                  px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200
                  ${active
                    ? 'bg-accent/10 border border-accent/30 text-accent'
                    : 'glass glass-hover text-text-muted border border-transparent'
                  }
                `}
              >
                <span className={active ? 'text-accent' : 'text-text-secondary'}>{tag.label}</span>
                <span className="ml-1 text-[10px] opacity-50">{tag.en}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
