import { TAGS } from '../data/tags'
import { familyOf } from '../data/families'

const SIZES = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-sm' }

// variant="color":  every tag keeps its own color (filter bar)
// variant="family": look depends on the tag's family (project cards)
export default function TagChip({ id, size = 'sm', variant = 'family' }) {
  const t = TAGS[id]
  const style = variant === 'color' ? 'filled' : familyOf(id).style

  if (style === 'text') {
    return <span className="text-xs text-gray-400">{t.label}</span>
  }
  const look =
    style === 'outlined'
      ? 'border border-gray-500 text-gray-300'
      : `text-black ${t.color}`
  return (
    <span className={`inline-block rounded-full font-semibold ${SIZES[size]} ${look}`}>
      {t.label}
    </span>
  )
}
