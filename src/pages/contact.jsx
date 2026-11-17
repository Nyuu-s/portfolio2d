import cvFr from '../assets/cv_fr.pdf'
import cvEn from '../assets/cv_en.pdf'

const contacts = [
  { label: 'Email', text: 'edgar.jacquemoud99@gmail.com', href: 'mailto:edgar.jacquemoud99@gmail.com' },
  { label: 'LinkedIn', text: 'linkedin.com/in/edgargamedev', href: 'https://www.linkedin.com/in/edgargamedev/' },
  { label: 'GitHub', text: 'github.com/Nyuu-s', href: 'https://github.com/Nyuu-s' },
]

const others = [
  { label: 'Portfolio', text: '3D experience', href: 'http://3d.edgar.jacquemoud.com' },
  { label: 'CV', text: 'French (PDF)', href: cvFr },
  { label: 'CV', text: 'English (PDF)', href: cvEn },
]

function Rows({ items }) {
  return (
    <ul className="mt-3 divide-y divide-gray-800">
      {items.map(({ label, text, href }) => (
        <li key={text} className="flex gap-4 py-2 font-mono">
          <span className="w-24 flex-shrink-0 text-gray-400">{label}</span>
          <a
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="min-w-0 break-words text-cyan-300 hover:text-sky-300 hover:underline"
          >
            {text}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function Contact() {
  return (
    <div className="page text-white pb-20">
      <p className="text-xl">Here are my different contact methods and other useful links:</p>
      <Rows items={contacts} />

      <h2 className="mt-10 text-xl font-bold">Other infos</h2>
      <Rows items={others} />
    </div>
  )
}