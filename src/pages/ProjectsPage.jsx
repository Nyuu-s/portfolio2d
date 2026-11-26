import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { projects, normalize } from '../data/projects'
import { TAGS } from '../data/tags'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import ProjectCard from '../components/ProjectCard'
import TagChip from '../components/TagChip'
import {STATUS} from '../data/status.js'
import { FAMILY_ROWS } from '../data/families'

export default function Projects() {
  const [params, setParams] = useSearchParams()
  const tagsParam = params.get('tags') ?? ''
  

  const activeTags = useMemo(
    () => tagsParam.split(',').filter((t) => t in TAGS),
    [tagsParam]
  )
  const [selectStatus, setSelectedStatus] = useState(null)
  // show/hide the tag filter bubbles (remembered per browser, storage can be unavailable)
  const [showTags, setShowTags] = useState(() => {
    try { return localStorage.getItem('showTagFilters') !== '0' } catch { return true }
  })
  const toggleShowTags = () =>
    setShowTags((v) => {
      try { localStorage.setItem('showTagFilters', v ? '0' : '1') } catch { /* ignore */ }
      return !v
    })
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

  // search + status filters, before any tag is applied
  const base = useMemo(() => {
    const terms = normalize(q).split(/\s+/).filter(Boolean)
    return projects
      .filter((p) => terms.every((t) => p.searchText.includes(t)))
      .filter((p) => !selectStatus || p.status === selectStatus)
  }, [q, selectStatus])

  // every selected tag is an OR: a project shows if it has at least one of them
  const visible = useMemo(
    () =>
      base
        .filter((p) => !activeTags.length || activeTags.some((t) => p.tags.includes(t)))
        .sort((a, b) => STATUS[a["status"]]["order"] - STATUS[b["status"]]["order"]),
    [base, activeTags]
  )

  // number of projects having each tag (given search + status filters)
  const counts = useMemo(() => {
    const out = {}
    for (const t of Object.keys(TAGS)) out[t] = base.filter((p) => p.tags.includes(t)).length
    return out
  }, [base])

  const filtering = Boolean(q.trim()) || activeTags.length > 0
  const focused = filtering ? [] : visible.filter((p) => p.focus)
  const rest = filtering ? visible : visible.filter((p) => !p.focus)

  return (
    <div className="page text-white pb-20">
      <div className="mb-3 flex items-center justify-between text-sm text-gray-400">
        <p aria-live="polite">
          {visible.length} project{visible.length === 1 ? '' : 's'}
        </p>
          <button
          onClick={() => setSelectedStatus(null)}
          className={[ !selectStatus && "underline", "rounded", "outline-none", "hover:text-white", "focus-visible:ring-20", "focus-visible:ring-sky-400"].filter(Boolean).join(" ")}> All </button>
        {STATUS && Object.entries(STATUS).sort(([, a], [, b]) => a.order - b.order).map( ([key, value]) => ( 
        <button
          key={key}
          onClick={() => setSelectedStatus(key)}
          className={[ selectStatus === key && "underline", "rounded", "outline-none", "hover:text-white", "focus-visible:ring-2", "focus-visible:ring-sky-400"].filter(Boolean).join(" ")}> {value.label} </button>))}
       {activeTags.length > 0 && (
          <button
            onClick={() => update({ tags: '' })}
            className="rounded underline outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Clear tags ({activeTags.length})
          </button>
        )}
      </div>

      <div className="flex items-stretch gap-2">
        <button
          onClick={toggleShowTags}
          aria-expanded={showTags}
          aria-controls="tag-filters"
          className="w-28 shrink-0 whitespace-nowrap rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-300 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          Tags{activeTags.length > 0 && ` (${activeTags.length})`} {showTags ? '▾' : '▸'}
        </button>
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search projects…"
          aria-label="Search projects"
          className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 outline-none focus:border-sky-400"
        />
      </div>

      {/* one bordered "bubble" per family: tags flow freely inside it, so nothing has to line up across groups */}
      <div id="tag-filters" className={`mt-4 flex-wrap gap-3 ${showTags ? 'flex' : 'hidden'}`}>
        {FAMILY_ROWS.map((row) => (
          <fieldset
            key={row.key}
            aria-label={row.label}
            className="min-w-0 rounded-2xl border border-gray-700 bg-gray-800/40 px-3 pb-3 pt-1"
          >
            <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              {row.label}
            </legend>
            <div className="flex flex-wrap items-center gap-2">
              {row.tags.map((t) => {
                const active = activeTags.includes(t)
                return (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    aria-pressed={active}
                    className={`flex items-center gap-1.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      active ? '' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <TagChip id={t} size="md" variant="color" />
                    <span className="-ml-0.5 pr-1 text-xs text-gray-400">{counts[t]}</span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        ))}
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
