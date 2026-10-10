import { Suspense, lazy, useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, AtSign, Check, Facebook, Github, GraduationCap, Layers, Linkedin, MapPin, Menu, MoveUpRight, Server, Smartphone, Sparkles, Terminal, X } from 'lucide-react'
import { profile, projects, stack, timeline, type TimelineEntry } from './content'

const HeroScene = lazy(() => import('./HeroScene'))

const roles = ['Software Developer', 'Backend Engineer', 'Full-stack Developer', 'Creative Problem Solver']
const terminalAnswers: Record<string, string> = {
  whoami: 'A software developer who likes thoughtful tools and clear systems.',
  interests: 'Backend · Web · Mobile · System design',
  status: 'Building interesting things. Open to good conversations.',
  help: 'Try: whoami, interests, status, clear',
}
const journeyIcons = { education: GraduationCap, mobile: Smartphone, backend: Server, fullstack: Layers, current: Sparkles }

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <a className="brand" href="#top" aria-label={`${profile.name}, back to top`}><span className="brand-mark">{profile.name[0].toUpperCase()}<span>.</span></span><span>{profile.name.toUpperCase()}<span className="brand-slash"> /</span> DEV</span></a>
    <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation" onClick={() => setOpen(false)}>
      <a href="#about"><span>01</span> About</a><a href="#stack"><span>02</span> Toolkit</a><a href="#work"><span>03</span> Selected work</a><a href="#journey"><span>04</span> Journey</a>
      <a className="nav-contact" href="#contact">Let’s talk <MoveUpRight size={14}/></a>
    </nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X/> : <Menu/>}</button>
  </header>
}

function ProjectVisual({ kind, accent }: { kind: string; accent: string }) {
  return <div className={`project-visual visual-${kind} accent-${accent}`}>
    <div className="visual-grain"/>
    {kind === 'atlas' && <>
      <div className="atlas-orbit orbit-a"/><div className="atlas-orbit orbit-b"/><div className="atlas-core"><span>API</span></div>
      <div className="atlas-tag tag-a">/v1/records <i>200</i></div><div className="atlas-tag tag-b">auth · secured</div><div className="visual-index">SERVICE / BLUEPRINT</div>
    </>}
    {kind === 'orbit' && <>
      <div className="orbit-window"><div className="window-top"><i/><i/><i/><span>orbit / workspace</span></div><div className="window-body"><div className="window-side"><b/><b/><b/><b/></div><div className="window-main"><i className="line-short"/><i/><i/><div className="note-card note-one">Thoughts on<br/>systems <span>↗</span></div><div className="note-card note-two">A small idea<br/>about focus <span>↗</span></div></div></div></div><div className="visual-index">PRODUCT / INTERFACE</div>
    </>}
    {kind === 'field' && <>
      <div className="field-sun"/><div className="field-hill hill-back"/><div className="field-hill hill-front"/><div className="field-phone"><div className="phone-island"/><div className="phone-kicker">FIELD NOTE · 018</div><div className="phone-title">The quiet<br/>between places.</div><div className="phone-rule"/><div className="phone-meta">37°33' N &nbsp; 126°58' E</div><div className="phone-wave">〰</div></div><div className="visual-index">MOBILE / FIELD JOURNAL</div>
    </>}
  </div>
}

function JourneyCard({ item, index, reduceMotion }: { item: TimelineEntry; index: number; reduceMotion: boolean }) {
  const StageIcon = journeyIcons[item.icon]
  return <motion.article className={`timeline-item${item.current ? ' timeline-current' : ''}`} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: 0.5, delay: index * 0.06 }}>
    <div className="timeline-track-meta"><span>STAGE</span><strong>{item.stage}</strong><i className="timeline-dot"/></div>
    <div className="timeline-card">
      <div className="timeline-card-head"><div className="timeline-category"><span className="timeline-icon"><StageIcon size={16}/></span>{item.category}</div><span className="timeline-stage-label">STAGE {item.stage}</span></div>
      <h3>{item.title}</h3><p className="timeline-description">{item.description}</p>
      <ul className="timeline-highlights">{item.highlights.map((highlight) => <li key={highlight}><Check size={13}/><span>{highlight}</span></li>)}</ul>
      <div className="timeline-card-footer">{item.technologies && <div className="timeline-tech-group"><span className="timeline-tech-label">TECHNOLOGIES</span><div className="timeline-tech-list">{item.technologies.map((technology) => <span className="timeline-tech" key={technology}>{technology}</span>)}</div></div>}{item.exploring && <div className="timeline-tech-group timeline-learning"><span className="timeline-tech-label">CURRENTLY EXPLORING</span><div className="timeline-tech-list">{item.exploring.map((technology) => <span className="timeline-tech" key={technology}>{technology}</span>)}</div></div>}{item.status && <span className="timeline-status"><i/> {item.status}</span>}</div>
    </div>
  </motion.article>
}

function App() {
  const [role, setRole] = useState(0)
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const reduceMotion = useReducedMotion()
  const terminalEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = window.setInterval(() => setRole((value) => (value + 1) % roles.length), 2900)
    if (reduceMotion) window.clearInterval(interval)
    return () => window.clearInterval(interval)
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 })
    let frame = 0
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [reduceMotion])

  useEffect(() => { terminalEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, [history])

  const runCommand = (event: FormEvent) => {
    event.preventDefault()
    const value = command.trim().toLowerCase()
    if (!value) return
    if (value === 'clear') { setHistory([]); setCommand(''); return }
    setHistory((entries) => [...entries, `$ ${value}`, `> ${terminalAnswers[value] ?? 'Command not found. Type “help” to see what I understand.'}`])
    setCommand('')
  }

  const handleTilt = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    event.currentTarget.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`)
    event.currentTarget.style.setProperty('--rx', `${((event.clientY - rect.top) / rect.height - 0.5) * -3}deg`)
    event.currentTarget.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - 0.5) * 4}deg`)
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true); window.setTimeout(() => setCopied(false), 1800)
  }

  return <>
    <div className="page-grain" aria-hidden="true"/><Header/>
    <main id="top">
      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="availability-pulse"/> AVAILABLE FOR SELECT PROJECTS <span className="eyebrow-line"/></div>
          <p className="hero-pretitle">Independent developer <span>·</span> Vietnam</p>
          <h1>Hello, I’m Le Huu<br/><span className="headline-accent">Duy</span></h1>
          <div className="role-line"><span className="role-prefix">I’M A</span><motion.span key={role} className="role-current" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>{roles[role]}</motion.span><span className="role-cursor"/></div>
          <p className="hero-intro">I turn curious ideas into considered software — from the first line of code to the last little detail.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={17}/></a><a className="button button-quiet" href="#contact">Contact me <ArrowUpRight size={15}/></a></div>
          <div className="hero-social"><span>FIND ME ELSEWHERE</span><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16}/></a><a href={`mailto:${profile.email}`} aria-label="Email"><AtSign size={16}/></a><span className="hero-location"><MapPin size={13}/> {profile.city}</span></div>
        </div>
          <div className="hero-visual"><div className="scene-backdrop"/><div className="hero-coordinate">10°49' N<br/>106°37' E</div><Suspense fallback={<div className="scene-loading">PREPARING THE WORKSPACE<span>· · ·</span></div>}><HeroScene/></Suspense><div className="hero-visual-index"><span>FIG. 001</span><span>A WORK IN PROGRESS</span></div></div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE <ArrowDown size={14}/></span><div className="hero-bottom-rule"/><span>DESIGN-LED ENGINEERING</span></div>
      </section>

      <section className="about section-shell section-pad" id="about">
        <div className="section-kicker"><span>01</span><span>THE PERSON BEHIND THE PIXELS</span><i/></div>
        <div className="about-grid">
          <div className="about-visual" onMouseMove={handleTilt}>
            <div className="portrait-card tilt-card"><div className="portrait-sky"><div className="portrait-glow"/><div className="portrait-orbit"/><div className="portrait-sun"/><div className="portrait-horizon"/><div className="portrait-mountain mountain-one"/><div className="portrait-mountain mountain-two"/></div><div className="portrait-caption"><span>IN A WORLD OF TABS</span><span>TAKE A BREATH ↗</span></div></div>
            <div className="floating-note note-location"><MapPin size={13}/><span>Based in<br/><b>Vietnam</b></span></div><div className="floating-note note-time"><span className="tiny-dot"/> <span>IN THE FLOW<br/><b>09:41 AM</b></span></div>
            <div className="about-visual-label">A LITTLE MORE HUMAN <span>↗</span></div>
          </div>
          <div className="about-copy">
            <p className="section-overline">HELLO, I’M {profile.name.toUpperCase()}.</p><h2>Code is a craft.<br/><span>Curiosity is the tool.</span></h2>
            <p className="about-lead">I’m a developer who enjoys the space where thoughtful design meets dependable engineering.</p>
            <p className="body-copy">I care about the things people notice, and the things they don’t: an interface that feels clear, a system that holds together, a detail that makes the whole experience feel considered. I’m still learning every day, and that’s my favorite part.</p>
            <div className="about-tags"><span>Curious by default</span><span>Detail-oriented</span><span>Always learning</span></div>
            <div className="terminal-card"><div className="terminal-top"><div><i/><i/><i/></div><span><Terminal size={13}/> DUYKR — ZSH</span><span className="terminal-top-right">INTERACTIVE SHELL</span></div><div className="terminal-body"><div className="terminal-intro">A few quick commands. Go on.</div><div className="terminal-history"><div><span className="terminal-prompt">$</span> whoami</div><div className="terminal-result">&gt; Software developer, perpetual learner.</div><div><span className="terminal-prompt">$</span> interests</div><div className="terminal-result">&gt; Backend · Web · Mobile · System design</div>{history.map((line, i) => <div className={line.startsWith('$') ? '' : 'terminal-result'} key={`${line}-${i}`}>{line.startsWith('$') && <span className="terminal-prompt">$ </span>}{line.startsWith('$') ? line.slice(2) : line}</div>)}</div><form className="terminal-input" onSubmit={runCommand}><span className="terminal-prompt">$</span><input aria-label="Terminal command" value={command} onChange={(e) => setCommand(e.target.value)} placeholder="try ‘status’ or ‘help’"/><button aria-label="Run command"><ArrowRight size={14}/></button></form><div ref={terminalEnd}/><div className="terminal-hint">COMMANDS: WHOAMI · INTERESTS · STATUS · HELP · CLEAR</div></div></div>
          </div>
        </div>
      </section>

      <section className="stack-section section-shell section-pad" id="stack">
        <div className="section-kicker"><span>02</span><span>TOOLS OF THE TRADE</span><i/></div>
        <div className="stack-heading"><div><p className="section-overline">MY EVERYDAY UNIVERSE</p><h2>A toolkit, not a checklist<span>.</span></h2></div><p className="stack-intro">A growing collection of tools I reach for to make ideas real. Each one is here because I’ve spent time learning how to use it.</p></div>
        <div className="stack-layout"><div className="stack-constellation" aria-hidden="true"><div className="constellation-glow"/><div className="constellation-ring ring-one"/><div className="constellation-ring ring-two"/><div className="constellation-ring ring-three"/><div className="constellation-core"><span>d<span>.</span></span><small>LEARNING<br/>IN ORBIT</small></div><span className="constellation-node node-react">◉</span><span className="constellation-node node-java">♨</span><span className="constellation-node node-db">▦</span><span className="constellation-node node-git">⌘</span><span className="constellation-coord">STACK / 0.1</span></div>
          <div className="stack-categories">{stack.map((group, i) => <article className={`stack-card stack-${group.color}`} key={group.category}><div className="stack-card-top"><span>{group.category}</span><span className="stack-index">{group.symbol}</span></div><div className="stack-card-content"><div className="stack-card-number">0{i + 1}</div><div className="stack-pills">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div><div className="stack-card-glow"/></article>)}</div></div>
      </section>

      <section className="work-section section-shell section-pad" id="work">
        <div className="section-kicker"><span>03</span><span>SELECTED EXPLORATIONS</span><i/></div>
        <div className="work-heading"><div><p className="section-overline">A FEW THINGS I’VE BEEN THINKING ABOUT</p><h2>Ideas made <span>tangible.</span></h2></div><div className="work-side-note"><Sparkles size={15}/><span>THREE CONCEPT PROJECTS<br/>MADE FOR THIS PORTFOLIO</span></div></div>
        <div className="project-list">{projects.map((project) => <article className={`project-card accent-${project.accent}`} key={project.number} onMouseMove={handleTilt}>
          <div className="project-card-main"><div className="project-meta"><span>{project.number} <i>—</i> {project.category}</span><span className="project-status"><i/>{project.status}</span></div><div className="project-title-row"><h3>{project.title}<sup>↗</sup></h3><a href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}><ArrowUpRight size={18}/></a></div><p className="project-description">{project.description}</p><div className="project-stack">{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={13}/></a>{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">LIVE PREVIEW <ArrowUpRight size={13}/></a>}<span>CASE STUDY IN PROGRESS</span></div></div>
          <ProjectVisual kind={project.visual} accent={project.accent}/>
        </article>)}</div><div className="work-footnote"><span><i/> SPECULATIVE CONCEPTS · NO CLAIMS OF LIVE USERS OR PRODUCTION RESULTS</span><a href="https://github.com/" target="_blank" rel="noreferrer">MORE ON GITHUB <ArrowUpRight size={14}/></a></div>
      </section>

      <section className="journey-section section-shell section-pad" id="journey">
        <div className="section-kicker"><span>04</span><span>ALWAYS BECOMING</span><i/></div>
        <div className="journey-intro"><div className="journey-heading"><p className="section-overline">MY DEVELOPER JOURNEY</p><h2>Learning by<br/><span>building what’s next.</span></h2><p>A path shaped by fundamentals, practical projects, and a habit of staying curious.</p></div><div className="journey-sample-note"><span className="sample-indicator"/><div><strong>SAMPLE TIMELINE</strong><p>Example milestones and skills. Edit these in <code>src/content.ts</code> to match your own experience.</p></div></div></div>
        <div className="timeline" aria-label="Developer journey stages"><div className="timeline-rail"><motion.div className="timeline-progress" initial={{ height: 0 }} whileInView={{ height: '100%' }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.4, ease: 'easeOut' }}/></div>{timeline.map((item, index) => <JourneyCard key={item.stage} item={item} index={index} reduceMotion={!!reduceMotion}/>)}</div>
      </section>

      <section className="contact-section section-shell" id="contact"><div className="contact-grid"/><div className="contact-topline"><span>ONE LAST THING</span><span>LET’S MAKE SOMETHING MATTER</span></div><p className="section-overline">HAVE A GOOD ONE IN MIND?</p><h2>Let’s make it<br/><span>real.</span></h2><p className="contact-copy">Have a project, an opportunity, or just a good idea to talk through? My inbox is open.</p><button className="button button-primary contact-button" onClick={copyEmail}>{copied ? 'Email copied!' : 'Say hello'} {copied ? <span>✓</span> : <ArrowUpRight size={17}/>}</button><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a><div className="contact-orbit contact-orbit-one"><a className="social-satellite satellite-github" href={profile.github} target="_blank" rel="noreferrer" aria-label="Visit GitHub"><Github size={18}/><span>GITHUB</span></a></div><div className="contact-orbit contact-orbit-two"><a className="social-satellite satellite-facebook" href={profile.facebook} target="_blank" rel="noreferrer" aria-label="Visit Facebook"><Facebook size={18}/><span>FACEBOOK</span></a><a className="social-satellite satellite-linkedin" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Visit LinkedIn"><Linkedin size={18}/><span>LINKEDIN</span></a></div><a className="contact-core" href="#top" aria-label={`${profile.name} website, back to top`}><span>D<span>.</span></span><small>MY WEBSITE</small></a><div className="contact-glow"/></section>
    </main>
    <footer className="site-footer section-shell"><a className="brand" href="#top"><span className="brand-mark">{profile.name[0].toUpperCase()}<span>.</span></span><span>{profile.name.toUpperCase()}<span className="brand-slash"> /</span> DEV</span></a><span className="footer-note">DESIGNED & BUILT WITH CURIOSITY <span>✳</span></span><span className="footer-copy">© {new Date().getFullYear()} {profile.name.toUpperCase()} · MADE WITH CARE</span><a className="back-top" href="#top">BACK TO TOP <ArrowUpRight size={13}/></a></footer>
  </>
}

export default App
