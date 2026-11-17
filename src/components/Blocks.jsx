function Block({ b }) {
  switch (b.type) {
    case 'text':
        return <p className="my-5 mx-auto w-2/3">{b.text}</p>
    case 'video':
        return <video className="my-5 mx-auto w-2/3" src={b.src} controls loop playsInline preload="metadata" />
    case 'image':
        return (
        <img className={`mx-auto mt-10 ${b.half ? 'w-1/2' : 'w-2/3'}`} src={b.src}
          alt={b.alt ?? ''} loading="lazy" />
      )
    case 'youtube':
        return (
        <iframe className="mx-auto w-1/2 h-96 mt-10" loading="lazy" title={b.title}
          src={`https://www.youtube-nocookie.com/embed/${b.id}${b.list ? `?list=${b.list}` : ''}`}
          allowFullScreen />
      )
    default:
        return null
  }
}

export default function Blocks({ blocks }) {
  return <>{blocks.map((b, i) => <Block key={i} b={b} />)}</>
}