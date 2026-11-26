import { readFile, writeFile, readdir, mkdtemp, rm as rmDir } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { createInterface } from 'node:readline/promises'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DATA = path.join(ROOT, 'src/data/projects.json')
const TAGS_FILE = path.join(ROOT, 'src/data/tags.js')
const FAMILIES_FILE = path.join(ROOT, 'src/data/families.js')
const IMAGES = path.join(ROOT, 'src/assets/images')

const STATUSES = ['on', 'off', 'hiatus', 'done']
const BLOCKS = ['text', 'image', 'video', 'youtube']
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const KEY_RE = /^[a-z][a-z0-9_]*$/
const PALETTE = [
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan',
  'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
]

// ---------- storage ----------

const load = async () => JSON.parse(await readFile(DATA, 'utf8'))
const tagsText = () => readFile(TAGS_FILE, 'utf8')
const tagKeys = async () => [...(await tagsText()).matchAll(/^\s+(\w+):\s*\{/gm)].map((m) => m[1])
// family keys are the entries of FAMILIES in families.js (language, kind, ...)
const familyKeys = async () => [...(await readFile(FAMILIES_FILE, 'utf8')).matchAll(/^\s+(\w+):\s*\{\s*label:/gm)].map((m) => m[1])

const inline = (v) =>
  Array.isArray(v)
    ? `[${v.map(inline).join(', ')}]`
    : v && typeof v === 'object'
      ? `{ ${Object.entries(v).map(([k, x]) => `${JSON.stringify(k)}: ${inline(x)}`).join(', ')} }`
      : JSON.stringify(v)

function format(list) {
  const items = list.map((p) => {
    const lines = Object.entries(p).map(([k, v]) =>
      Array.isArray(v) && v.length && typeof v[0] === 'object'
        ? `    ${JSON.stringify(k)}: [\n${v.map((x) => `      ${inline(x)}`).join(',\n')}\n    ]`
        : `    ${JSON.stringify(k)}: ${inline(v)}`
    )
    return `  {\n${lines.join(',\n')}\n  }`
  })
  return `[\n${items.join(',\n')}\n]\n`
}

function validate(list, tags) {
  if (!Array.isArray(list)) return 'expected an array'
  const seen = new Set()
  for (const [i, p] of list.entries()) {
    if (!p || typeof p !== 'object') return `#${i}: not an object`
    if (!SLUG_RE.test(p.slug ?? '')) return `#${i}: invalid slug "${p.slug}"`
    if (seen.has(p.slug)) return `duplicate slug "${p.slug}"`
    seen.add(p.slug)
    for (const k of ['title', 'summary', 'description'])
      if (typeof p[k] !== 'string' || !p[k].trim()) return `${p.slug}: "${k}" is required`
    if ('image' in p && typeof p.image !== 'string') return `${p.slug}: "image" must be a string`
    if ('focus' in p && typeof p.focus !== 'boolean') return `${p.slug}: "focus" must be true or false`
    if (!STATUSES.includes(p.status)) return `${p.slug}: status must be one of ${STATUSES.join(', ')}`
    if (!Array.isArray(p.tags)) return `${p.slug}: tags must be an array`
    const bad = p.tags.filter((t) => !tags.includes(t))
    if (bad.length) return `${p.slug}: unknown tag(s) ${bad.join(', ')}`
    if (!Array.isArray(p.body)) return `${p.slug}: body must be an array`
    for (const b of p.body) if (!BLOCKS.includes(b?.type)) return `${p.slug}: unknown block type "${b?.type}"`
  }
  return null
}

async function appendTags(defs) {
  const entries = Object.entries(defs)
  if (!entries.length) return
  const text = await tagsText()
  const end = text.lastIndexOf('}') // closing brace of TAGS (assumes it is the last thing in the file)
  const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  const lines = entries.map(([k, t]) => `  ${k}: { label: ${q(t.label)}, color: ${q(t.color)}, family: ${q(t.family)} },\n`).join('')
  const before = text.slice(0, end)
  await writeFile(TAGS_FILE, (before.endsWith('\n') ? before : before + '\n') + lines + text.slice(end))
}

// newTags: tag definitions to append to tags.js together with the save
async function save(list, tags, newTags = {}) {
  const error = validate(list, [...tags, ...Object.keys(newTags)])
  if (error) throw new Error(error)
  await appendTags(newTags)
  await writeFile(DATA, format(list))
  tags.push(...Object.keys(newTags))
}

// ---------- prompts ----------

let rl
const ask = async (q, def = '') => {
  rl ??= createInterface({ input: process.stdin, output: process.stdout })
  return (await rl.question(def ? `${q} [${def}]: ` : `${q}: `)).trim() || def
}
const need = async (q) => {
  for (;;) {
    const v = await ask(q)
    if (v) return v
  }
}
const yes = async (q, def = 'n') => (await ask(`${q} (y/n)`, def)).toLowerCase().startsWith('y')
const closePrompt = () => {
  rl?.close()
  rl = null
}

const slugify = (s) =>
  s.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

function editor() {
  const env = process.env.VISUAL || process.env.EDITOR
  if (env) return env
  const hasCode = spawnSync('code', ['--version'], { shell: true, stdio: 'ignore' }).status === 0
  return hasCode ? 'code --wait' : process.platform === 'win32' ? 'notepad' : 'nano'
}

// Offers to create every tag in `picked` that doesn't exist yet. Throws if one is refused or invalid.
async function resolveTags(picked, known) {
  const created = {}
  const used = new Set([...(await tagsText()).matchAll(/bg-([a-z]+)-\d{3}/g)].map((m) => m[1]))

  for (const key of picked) {
    if (known.includes(key) || created[key]) continue
    if (!KEY_RE.test(key)) throw new Error(`"${key}" is not a valid tag key (lowercase letters/digits, starting with a letter)`)
    if (!(await yes(`Tag "${key}" doesn't exist. Create it?`, 'y'))) throw new Error(`unknown tag "${key}"`)

    const label = await ask('  Label shown on the site', key.charAt(0).toUpperCase() + key.slice(1))
    const suggested = PALETTE.find((c) => !used.has(c)) ?? PALETTE[0]
    let color
    for (;;) {
      color = (await ask(`  Color (${PALETTE.join(', ')})`, suggested)).toLowerCase()
      if (PALETTE.includes(color)) break
    }
    used.add(color)

    const families = await familyKeys()
    let family
    do family = (await ask(`  Family (${families.join(', ')})`, families[0])).toLowerCase()
    while (!families.includes(family))
    created[key] = { label, color: `bg-${color}-300`, family }
  }
  return created
}

// A target is a slug or the number shown by `ls` (1 = first line). An exact slug wins over a number.
// Returns the index in `list`, or -1.
function resolve(list, target) {
  const t = String(target).trim()
  const bySlug = list.findIndex((p) => p.slug === t)
  if (bySlug >= 0) return bySlug
  if (/^\d+$/.test(t)) {
    const i = Number(t) - 1
    if (i >= 0 && i < list.length) return i
  }
  return -1
}

// Inserts a missing optional field just before "body" so saved files stay tidy.
function setField(p, key, value) {
  if (key in p) return { ...p, [key]: value }
  const out = {}
  for (const [k, v] of Object.entries(p)) {
    if (k === 'body') out[key] = value
    out[k] = v
  }
  if (!(key in out)) out[key] = value
  return out
}

const withFocus = (p, on) => {
  const { focus: _old, ...rest } = p
  if (!on) return rest
  const out = {}
  for (const [k, v] of Object.entries(rest)) {
    out[k] = v
    if (k === 'status') out.focus = true
  }
  return out
}

// ---------- commands ----------

async function ls() {
  const list = await load()
  list.forEach((p, i) =>
    console.log(`${String(i + 1).padStart(2)}. ${p.focus ? '★' : ' '} ${p.slug.padEnd(22)} ${p.status.padEnd(7)} ${p.title}`)
  )
}

async function add() {
  const [list, tags] = await Promise.all([load(), tagKeys()])

  const title = await need('Title')
  let slug = await ask('Slug', slugify(title))
  while (!SLUG_RE.test(slug) || list.some((p) => p.slug === slug)) slug = await need('Slug invalid or already used, try another')

  const summary = await need('Summary (card text)')
  const description = await ask('Description (top of details page)', summary)

  let status = await ask(`Status (${STATUSES.join('/')})`, 'on')
  while (!STATUSES.includes(status)) status = await ask(`Pick one of ${STATUSES.join('/')}`, 'on')

  let picked, created
  for (;;) {
    picked = [
      ...new Set(
        (await ask(`Tags, comma separated, new ones can be created (${tags.join(', ')})`))
          .split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
      ),
    ]
    try {
      created = await resolveTags(picked, tags)
      break
    } catch (e) {
      console.log(`  ${e.message}`)
    }
  }

  const image = await ask('Card image file name in src/assets/images (Enter for none)')
  if (image) {
    const files = (await readdir(IMAGES)).map((f) => f.toLowerCase())
    if (!files.includes(image.toLowerCase())) console.log('  ! not found in src/assets/images (saved anyway)')
  }

  const repo = await ask('GitHub repo owner/name (optional)')
  const focus = await yes('Currently in focus?')

  const p = {
    slug, title, summary, description, status,
    ...(focus && { focus: true }),
    tags: picked,
    ...(image && { image }),
    ...(repo && { repo }),
    body: [],
  }
  await save([p, ...list], tags, created)
  console.log(`Added "${slug}" at the top.`)
  for (const [k, t] of Object.entries(created)) console.log(`Created tag "${k}" (${t.label}, ${t.color}).`)

  if (await yes('Open it in your editor to write links / the details content now?', 'y')) await edit(slug)
}

async function edit(slugArg) {
  const [list, tags] = await Promise.all([load(), tagKeys()])
  const target = slugArg ?? (await ls(), await need('Slug or number'))
  const i = resolve(list, target)
  if (i < 0) return console.log(`No project "${target}".`)
  const slug = list[i].slug

  const dir = await mkdtemp(path.join(tmpdir(), 'proj-'))
  const file = path.join(dir, `${slug}.json`)
  await writeFile(file, JSON.stringify(list[i], null, 2) + '\n')

  try {
    for (;;) {
      closePrompt()
      spawnSync(`${editor()} "${file}"`, { shell: true, stdio: 'inherit' })
      try {
        const edited = JSON.parse(await readFile(file, 'utf8'))
        const created = await resolveTags([...new Set(Array.isArray(edited.tags) ? edited.tags : [])], tags)
        await save(list.map((p, j) => (j === i ? edited : p)), tags, created)
        console.log(`Saved "${edited.slug}".`)
        for (const [k, t] of Object.entries(created)) console.log(`Created tag "${k}" (${t.label}, ${t.color}).`)
        return
      } catch (e) {
        console.log(`Not saved: ${e.message}`)
        if (!(await yes('Reopen the editor?', 'y'))) return
      }
    }
  } finally {
    await rmDir(dir, { recursive: true, force: true })
  }
}

async function rm(slugArg) {
  const [list, tags] = await Promise.all([load(), tagKeys()])
  const target = slugArg ?? (await ls(), await need('Slug or number'))
  const p = list[resolve(list, target)]
  if (!p) return console.log(`No project "${target}".`)
  const slug = p.slug
  if (!(await yes(`Delete "${p.title}"?`))) return console.log('Cancelled.')
  await save(list.filter((x) => x !== p), tags)
  console.log(`Deleted "${slug}".`)
}

async function mv(slug, position) {
  const [list, tags] = await Promise.all([load(), tagKeys()])
  const from = resolve(list, slug)
  const to = Number(position) - 1
  if (from < 0 || !Number.isInteger(to) || to < 0 || to >= list.length) return usage()
  const [p] = list.splice(from, 1)
  list.splice(to, 0, p)
  await save(list, tags)
  console.log(`Moved "${slug}" to position ${to + 1}.`)
}

async function toggleFocus(slugArg) {
  const [list, tags] = await Promise.all([load(), tagKeys()])
  const target = slugArg ?? (await ls(), await need('Slug or number'))
  const p = list[resolve(list, target)]
  if (!p) return console.log(`No project "${target}".`)
  const slug = p.slug
  const on = !p.focus
  await save(list.map((x) => (x === p ? withFocus(x, on) : x)), tags)
  console.log(`"${slug}" is ${on ? 'now' : 'no longer'} in focus.`)
}

const BULK_TEXT = ['title', 'summary', 'description', 'image', 'repo']
const BULK_OPTIONAL = ['image', 'repo'] // an empty value removes these
const BULK_FIELDS = ['status', 'focus', 'tags', ...BULK_TEXT]
const YES = ['true', 'yes', 'y', 'on', '1']
const NO = ['false', 'no', 'n', 'off', '0']

// edit:<field> <value> <targets>   e.g.  edit:status off 1,5,6,my-slug,9
// All targets are resolved and validated first: if one is wrong nothing is written.
async function bulk(field, value, ...rest) {
  const targets = rest.join(',').split(',').map((s) => s.trim()).filter(Boolean)
  if (!BULK_FIELDS.includes(field) || value === undefined || !targets.length) return usage()

  const [list, tags] = await Promise.all([load(), tagKeys()])

  const idx = []
  const unknown = []
  for (const t of targets) {
    const i = resolve(list, t)
    if (i < 0) unknown.push(t)
    else if (!idx.includes(i)) idx.push(i)
  }
  if (unknown.length) throw new Error(`Unknown project(s): ${unknown.join(', ')} (nothing changed)`)

  let created = {}
  let change
  let show = (p) => String(p[field] ?? '')

  if (field === 'status') {
    if (!STATUSES.includes(value)) throw new Error(`status must be one of ${STATUSES.join(', ')}`)
    change = (p) => ({ ...p, status: value })
  } else if (field === 'focus') {
    const v = value.toLowerCase()
    if (!YES.includes(v) && !NO.includes(v)) throw new Error('focus must be on/off (or true/false)')
    change = (p) => withFocus(p, YES.includes(v))
    show = (p) => (p.focus ? 'on' : 'off')
  } else if (field === 'tags') {
    // "cpp,gui" replaces the tags; "+cpp,-gui" adds / removes (can't mix both styles)
    const toks = value.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
    const modify = toks.some((t) => /^[+-]/.test(t))
    if (modify && toks.some((t) => !/^[+-]/.test(t))) throw new Error('use either plain tags (replace) or +tag/-tag (add/remove), not both')
    const add = modify ? toks.filter((t) => t[0] === '+').map((t) => t.slice(1)) : toks
    const del = modify ? toks.filter((t) => t[0] === '-').map((t) => t.slice(1)) : []
    created = await resolveTags(add, tags)
    change = (p) => ({
      ...p,
      tags: [...new Set([...(modify ? p.tags.filter((t) => !del.includes(t)) : []), ...add])],
    })
    show = (p) => p.tags.join(',')
  } else {
    if (!value && !BULK_OPTIONAL.includes(field)) throw new Error(`"${field}" can't be empty`)
    change = (p) => {
      if (value) return setField(p, field, value)
      const { [field]: _gone, ...others } = p
      return others
    }
  }

  const next = list.map((p, j) => (idx.includes(j) ? change(p) : p))
  await save(next, tags, created)

  const cut = (s) => (s.length > 40 ? `${s.slice(0, 37)}...` : s)
  for (const j of idx) {
    const [a, b] = [show(list[j]), show(next[j])]
    console.log(`${String(j + 1).padStart(2)}. ${list[j].slug.padEnd(22)} ${a === b ? `${field} unchanged (${cut(b) || 'empty'})` : `${field}: ${cut(a) || 'empty'} -> ${cut(b) || 'empty'}`}`)
  }
  for (const [k, t] of Object.entries(created)) console.log(`Created tag "${k}" (${t.label}, ${t.color}).`)
}

function usage() {
  console.log(`Usage: npm run proj -- <command>      (or: node scripts/projects.mjs <command>)

  ls                          list projects with their number (★ = in focus)
  add                         add a project (prompts, can create new tags)
  edit [slug|number]          edit one project as JSON in your editor
  edit:<field> <value> <targets>
                              set one field on several projects at once
  rm [slug|number]            delete a project
  mv <slug|number> <position> move a project (1 = top of the list)
  focus [slug|number]         toggle "currently in focus"

A number is the one printed by "ls". Numbers change when you add, move or delete
projects, so run "ls" first. Targets are comma separated and can mix numbers and slugs.

Bulk fields (edit:<field>):
  status       ${STATUSES.join(' | ')}
  focus        on | off
  tags         cpp,gui  replaces the tags   |   +cpp,-gui  adds / removes
  title summary description image repo     text ("" removes image and repo)

Examples:
  npm run proj -- ls
  npm run proj -- edit 3
  npm run proj -- edit:status off 1,5,6,my-slug,9
  npm run proj -- edit:tags +opengl,-gui 2,4
  npm run proj -- edit:focus on my-slug

Editor: $VISUAL or $EDITOR, else "code --wait", else notepad / nano.`)
}

// ---------- main ----------

const [cmd = '', ...args] = process.argv.slice(2)
const commands = { ls, add, edit, rm, mv, focus: toggleFocus }
const [name, field] = cmd.split(':')

try {
  if (name === 'edit' && field) await bulk(field, ...args)
  else await (commands[cmd] ?? usage)(...args)
} catch (e) {
  console.error(e.message)
  process.exitCode = 1
} finally {
  closePrompt()
}