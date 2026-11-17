import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { projects, normalize } from '../data/projects'
import { TAGS } from '../data/tags'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import ProjectCard from '../components/ProjectCard'
import TagChip from '../components/TagChip'
import {STATUS} from '../data/status.js'

export default function Projects() {
  const [params, setParams] = useSearchParams()
  const tagsParam = params.get('tags') ?? ''
  

  const activeTags = useMemo(
    () => tagsParam.split(',').filter((t) => t in TAGS),
    [tagsParam]
  )
  const [selectStatus, setSelectedStatus] = useState(null)
  const [input, setInput] = useState(params.get('q') ?? '')
  const q = useDebouncedValue(input)

  const update = (patch) => {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(patch)) v ? next.set(k, v) : next.delete(k)
    setParams(next, { replace: true })
  }

  useEffect(() => { update({ q: q.trim() }) }, [q])   // eslint-disable-line

  const toggleTag = (t) =>
    update({ tags: (activeTags.includes(t) ? activeTags.filter((x) => x !== t) : [...activeTags, t]).join(',') })

  const visible = useMemo(() => {
    const terms = normalize(q).split(/\s+/).filter(Boolean)
    return projects.filter(
      (p) =>
        (!activeTags.length || activeTags.some((t) => p.tags.includes(t))) &&
        terms.every((t) => p.searchText.includes(t))
    )
    .filter((p) => (!selectStatus || p.status === selectStatus))
      .sort((a, b) => STATUS[a["status"]]["order"] - STATUS[b["status"]]["order"])
  }, [q, activeTags, selectStatus])

  const filtering = Boolean(q.trim()) || activeTags.length > 0
  const focused = filtering ? [] : visible.filter((p) => p.focus)
  const rest = filtering ? visible : visible.filter((p) => !p.focus)

  return (
    <div className="page text-white pb-20">
      <input
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search projects…"
        aria-label="Search projects"
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 outline-none focus:border-sky-400"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {Object.keys(TAGS).map((t) => (
          <button
            key={t}
            onClick={() => toggleTag(t)}
            aria-pressed={activeTags.includes(t)}
            className={`rounded-full outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              activeTags.includes(t) ? '' : 'opacity-50 hover:opacity-100'
            }`}
          >
            <TagChip id={t} size="md" />
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
        <p aria-live="polite">
          {visible.length} project{visible.length === 1 ? '' : 's'}
        </p>
        {STATUS && Object.entries(STATUS).sort(([, a], [, b]) => a.order - b.order).map( ([key, value]) => ( 
        <button
          onClick={() => setSelectedStatus(key)}
          className={[ selectStatus === key && "underline", "rounded", "outline-none", "hover:text-white", "focus-visible:ring-2", "focus-visible:ring-sky-400"].filter(Boolean).join(" ")}> {value.label} </button>))}
        <button
          onClick={() => setSelectedStatus(null)}
          className={[ !selectStatus && "underline", "rounded", "outline-none", "hover:text-white", "focus-visible:ring-20", "focus-visible:ring-sky-400"].filter(Boolean).join(" ")}> All </button>
        {activeTags.length > 0 && (
          <button
            onClick={() => update({ tags: '' })}
            className="rounded underline outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Clear tags ({activeTags.length})
          </button>
        )}
      </div>

      {focused.length > 0 && (
        <section
          aria-labelledby="focus-title"
          className="mt-6 rounded-lg border-l-4 border-sky-400 bg-gray-800/40 px-4 py-3"
        >
          <h2 id="focus-title" className="text-sm font-semibold uppercase tracking-wide text-sky-300">
            Currently focused on
          </h2>
          <ul className="mt-1 space-y-2">
            {focused.map((p) => <li key={p.slug}><ProjectCard project={p} /></li>)}
          </ul>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mt-6">
          {focused.length > 0 && (
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">All projects</h2>
          )}
          <ul className="mt-2 space-y-2">
            {rest.map((p) => <li key={p.slug}><ProjectCard project={p} /></li>)}
          </ul>
        </section>
      )}

      {visible.length === 0 && (
        <p className="mt-10 text-center text-gray-400">No project matches your search.</p>
      )}
    </div>
  )
}
