import raw from './projects.json'

const index = (files, dir) =>
  new Map(
    Object.entries(files).map(([path, url]) => [
      path.slice(`../assets/${dir}/`.length).toLowerCase(),
      url,
    ])
  )

const images = index(
  import.meta.glob('../assets/images/*', { eager: true, import: 'default' }),
  'images'
)
const videos = index(
  import.meta.glob('../assets/videos/**/*', { eager: true, import: 'default' }),
  'videos'
)

const lookup = (map, kind, name) => {
  if (!name) return undefined
  const url = map.get(name.toLowerCase())
  if (!url && import.meta.env.DEV) console.warn(`[projects] ${kind} not found: ${name}`)
  return url
}
const img = (name) => lookup(images, 'image', name)
const vid = (name) => lookup(videos, 'video', name)

const resolveBlock = (b) => {
  if (b.type === 'image') return { ...b, src: img(b.src) }
  if (b.type === 'video') return { ...b, src: vid(b.src) }
  return b
}

export const normalize = (s) =>
  s.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')

export const projects = raw.map((p) => ({
  ...p,
  image: img(p.image),
  body: (p.body ?? []).map(resolveBlock),
  searchText: normalize(`${p.title} ${p.summary} ${p.description ?? ''}`),
}))

export const bySlug = new Map(projects.map((p) => [p.slug, p]))