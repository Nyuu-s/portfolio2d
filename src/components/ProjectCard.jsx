import { Link } from 'react-router-dom'
import TagChip from './TagChip'
import { STATUS } from '../data/status'

const THUMB = 'w-28 sm:w-44 flex-shrink-0 self-start rounded-lg'

export default function ProjectCard({ project: p }) {
  const s = STATUS[p.status]
  return (
    <Link
      to={`/project/details/${p.slug}`}
      className="flex gap-4 -mx-3 p-3 rounded-lg outline-none hover:bg-gray-800 focus-visible:bg-gray-800 focus-visible:ring-2 focus-visible:ring-sky-400"
    >
      {p.image ? (
        <img
          src={p.image}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ aspectRatio: '16 / 9' }}
          className={`${THUMB} object-cover`}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{ aspectRatio: '16 / 9' }}
          className={`${THUMB} flex items-center justify-center bg-gray-800 text-3xl font-bold text-gray-600`}
        >
          {p.title.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="min-w-0 w-full">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="text-lg font-semibold leading-snug">{p.title}</span>
          {s && (
            <span className={`text-xs font-semibold ml-auto ${s.color}`}>
              <span aria-hidden="true">● </span>{s.label}
            </span>
          )}
        </div>
        <div className="mt-1 text-gray-300">{p.summary}</div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.tags
            .sort()
            .map((t) => <TagChip key={t} id={t} />)


          }

        </div>
      </div>
    </Link>
  )
}
