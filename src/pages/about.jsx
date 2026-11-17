const journey = [
  "Having played video games when I was younger, I quickly found myself wanting to be on the other side of the mirror and create games, a way to tell stories and express my creativity in a more immersive and interactive way than conventional media.",
  "I started learning Python in high school with some algorithm puzzles, then began my studies in Lyon, where I learned the basics of object-oriented programming such as classes, inheritance and polymorphism. It was with C# and Java, which are syntactically close, and I got my Bac + 2 (HND).",
  "Then I continued in Rennes for my Bachelor's degree, where I learned more about computer science in general, with some famous sorting algorithms and how compilers work. I discovered the C and C++ programming languages there.",
  "Eventually I completed my journey in Montpellier with a Master's degree (Images and Games), where I learned more about game engines, the rendering pipeline with OpenGL, agent-oriented programming for AI, and image processing techniques. Most of the work done there was in C++.",
  "I landed a job at AUBAY, which found me a mission at AWS Blueage Mainframe Modernization. There I spent 3 years on different projects, each time encountering a new mainframe (z/OS, AS/400 and GS21), where we turned old mainframe apps written in COBOL and C into a modernized version in Java and PostgreSQL. It's by reading those old C programs that I fell in love with the language; maybe it struck a nostalgia, who knows.",
]

const interests = [
  {
    title: 'Programming',
    text: "Among the activities I enjoy, programming holds the gold medal. I love learning new languages and reinforcing my skills in those I already know. For me, programming is a series of challenges and puzzles to solve, and I especially enjoy finding solutions to complex problems.",
  },
  {
    title: 'Sciences',
    text: "I am absolutely amazed by the sciences, which represent for me the salvation of humanity. The areas I love the most, even though they often go far beyond my skills, are astronomy and everything related to space and the infinitely large. Second come neuroscience and everything related to understanding the human brain and digitizing consciousness / mind. Finally, I am also interested in quantum physics, which plays a major role in the infinitely small and contains so many mysteries.",
  },
  {
    title: 'Others',
    text: "I love learning new things on various topics, but I remain human above all, so yes, I also like playing video games, watching movies and series, and reading!",
  },
]

export default function About({ birthYear }) {
  const age = new Date().getFullYear() - birthYear

  return (
    <article className="page text-white pb-20">
      <p className="text-xl leading-relaxed">
        Hi, my name is Edgar, I am {age} years old and I am a software developer, passionate about computer science and video games since I was young. I first aimed for a career in game development, that's now more of a hobby, and I'm increasingly drawn to systems programming.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">My journey</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-gray-300">
          {journey.map((t, i) => <p key={i}>{t}</p>)}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">My interests</h2>
        <div className="mt-4 space-y-6">
          {interests.map(({ title, text }) => (
            <div key={title}>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-1 leading-relaxed text-gray-300">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}