import { TAGS } from './tags'

// style: how a tag of this family is drawn on project cards
//   filled   -> colored pill (main identity of a project)
//   outlined -> neutral outlined pill
//   text     -> muted plain text, joined with " · "
export const FAMILIES = {
  language:  { label: 'Languages',  order: 0, style: 'filled' },
  kind:      { label: 'Type',       order: 1, style: 'outlined' },
  framework: { label: 'Frameworks', order: 2, style: 'text' },
  context:   { label: 'Context',    order: 3, style: 'text' },
}

const FALLBACK = { label: 'Other', order: 99, style: 'text' }

export const familyKey = (id) => TAGS[id]?.family ?? 'other'
export const familyOf = (id) => FAMILIES[familyKey(id)] ?? FALLBACK

// Sort tag ids by family order, then by declaration order in TAGS.
const declared = Object.keys(TAGS)
export const compareTags = (a, b) =>
  familyOf(a).order - familyOf(b).order || declared.indexOf(a) - declared.indexOf(b)

// [{ key, label, tags: [id, ...] }] for the filter bar, only families that have tags.
export const FAMILY_ROWS = [...Object.keys(FAMILIES), 'other']
  .map((key) => ({
    key,
    label: (FAMILIES[key] ?? FALLBACK).label,
    tags: declared.filter((id) => familyKey(id) === key),
  }))
  .filter((row) => row.tags.length)
