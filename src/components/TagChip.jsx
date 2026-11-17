import { TAGS } from '../data/tags'

const SIZES = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-sm' }

export default function TagChip({ id, size = 'sm' }) {
  const t = TAGS[id]
  return (
    <span className={`inline-block rounded-full font-semibold text-black ${SIZES[size]} ${t.color}`}>
      {t.label}
    </span>
  )
}