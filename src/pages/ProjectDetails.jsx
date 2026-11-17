import { Navigate, useParams } from 'react-router-dom'
import { bySlug } from '../data/projects'
import Blocks from '../components/Blocks'

import { STATUS } from '../data/status'

export default function ProjectDetails() {
  const { id } = useParams()
  const p = bySlug.get(id)
  if (!p) return <Navigate to="/" replace />

  const s = STATUS[p.status]
 
  return (
    <div className="text-white my-10 mx-auto">
      <h1 className="flex font-bold justify-center w-full text-lg">
        {p.repo
          ? <a className="hover:text-blue-500 underline" href={`https://github.com/${p.repo}`} target="_blank" rel="noopener noreferrer">{p.title}</a>
          : p.title}
        <span className={`px-2 ${s.color}`}>{s.label}</span>
      </h1>
      <p className="my-5 mx-auto w-2/3">{p.description}</p>
      {p.links?.length > 0 && (
        <ul className="my-5 mx-auto w-2/3">
          {p.links.map((l) => (
            <li key={l.href}><a className="text-sky-400 underline hover:text-blue-500" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a></li>
          ))}
        </ul>
      )}
      <Blocks blocks={p.body} />
    </div>
  )
}