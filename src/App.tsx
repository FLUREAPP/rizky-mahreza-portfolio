import { FormEvent, useMemo, useState } from 'react'
import { ArrowUp, ArrowUpRight, Check, Download, Globe2, Mail, MapPin, Menu, MessageCircle, Phone, ShieldCheck, X } from 'lucide-react'
import { certifications, competencies, experience, profile, projects, stats } from './data'
import LiquidMetalHero from './components/ui/liquid-metal-hero'

const cvPath = '/Rizky-Mahreza-CV.pdf'
const profileImage = '/profile.webp'
const nav = [['Summary','summary'],['Experience','experience'],['Competencies','competencies'],['Certifications','certifications'],['Medical','medical'],['Projects','projects'],['Contact','contact']]
const categories = ['all','regulatory','technical','training','academic'] as const

type Category = typeof categories[number]

function SectionHeading({ eyebrow, title, dark = false }: { eyebrow: string; title: string; dark?: boolean }) {
  return <div className={`section-heading ${dark ? 'dark' : ''}`}><span>{eyebrow}</span><h2>{title}</h2></div>
}

function downloadCV() { window.open(cvPath, '_blank', 'noopener,noreferrer') }

export function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [category, setCategory] = useState<Category>('all')
  const [formState, setFormState] = useState<'idle'|'success'>('idle')
  const [errors, setErrors] = useState<Record<string,string>>({})
  const filtered = useMemo(() => category === 'all' ? certifications : certifications.filter(c => c[6] === category), [category])
  const activeCerts = certifications.filter(c => !c[4] || new Date(c[4]) >= new Date()).length

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next: Record<string,string> = {}
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const subject = String(data.get('subject') || '').trim()
    const message = String(data.get('message') || '').trim()
    if (!name) next.name = 'Full name is required.'
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.'
    if (!subject) next.subject = 'Subject is required.'
    if (message.length < 20) next.message = 'Message must be at least 20 characters.'
    setErrors(next)
    if (Object.keys(next).length) return
    setFormState('success')
    event.currentTarget.reset()
  }

  return <>
    <header className="nav-shell">
      <a className="brand" href="#home" aria-label="Rizky Mahreza home"><strong>RM</strong><span><b>Rizky Mahreza</b><small>SENIOR HSE SPECIALIST</small></span></a>
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'open' : ''}>{nav.map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<button className="lang"><Globe2 size={15}/> EN</button><button className="nav-cta" onClick={downloadCV}><Download size={16}/> Download CV</button></nav>
    </header>

    <main>
      <div id="home">
        <LiquidMetalHero
          badge="SENIOR HSE SPECIALIST · ENERGY SECTOR"
          title={profile.name}
          subtitle={profile.value}
          primaryCtaLabel="Get in Touch"
          secondaryCtaLabel="Download CV"
          onPrimaryCtaClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          onSecondaryCtaClick={downloadCV}
          features={['HSE Leadership', 'Energy Sector', 'AK3U · Kemnaker RI']}
        >
          <div className="profile-visual"><div className="profile-frame"><img className="profile-photo" src={profileImage} alt={`${profile.name}, ${profile.role}`} width="848" height="1200" fetchPriority="high"/><div className="float-badge">AK3U · Kemnaker RI</div><div className="profile-caption"><small>PROFILE — {profile.name}</small><b>{profile.role}</b></div><div className="years">7+</div><div className="cert-chip">CERTIFIED · ISO 45001 · 14001 · 9001</div></div></div>
        </LiquidMetalHero>
        <div className="hero-meta hero-meta-outside"><span><MapPin size={16}/> {profile.location}</span><a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp available</a></div>
        <div className="stats">{stats.map(([value,label]) => <div key={label}><strong>{label === 'Active Certifications' ? `${activeCerts}+` : value}</strong><span>{label}</span></div>)}</div>
      </div>

      <section id="summary" className="section light-section"><div className="summary-grid"><div><SectionHeading eyebrow="— EXECUTIVE SUMMARY" title="Building a culture where every operation goes home safe."/><p className="lead">{profile.bio}</p><div className="pills">{['Safety Leadership','Risk Management','Regulatory Compliance','Operational Excellence'].map(x => <span key={x}>{x}</span>)}</div></div><aside className="glance"><span>AT A GLANCE</span>{[['Specialisation',profile.specialisation],['Working Area',profile.workingArea],['Education',profile.education],['Lead Credentials',profile.leadCredentials.join(' · ')],['Languages',profile.languages.join(' · ') ]].map(([k,v]) => <div key={k}><small>{k}</small><b>{v}</b></div>)}</aside></div></section>

      <section id="experience" className="section"><SectionHeading eyebrow="— CAREER TIMELINE" title="Experience shaped in the field, strengthened by responsibility."/><div className="timeline">{experience.map((item,i) => <article className={`timeline-item ${i%2 ? 'right':''}`} key={`${item.start}-${item.role}`}><div className="timeline-dot"/><div className="timeline-card"><small className="period">{item.period}</small>{item.badge && <span className="status">{item.badge}</span>}<h3>{item.role}</h3><b>{item.company}</b><em>{item.location}</em><ul>{item.bullets.map(b => <li key={b}>{b}</li>)}</ul></div></article>)}</div></section>

      <section id="competencies" className="section alt"><SectionHeading eyebrow="— CORE COMPETENCIES" title="The technical and leadership disciplines I lead with."/><div className="competency-grid">{competencies.map(([title,desc],i) => <article key={title}><span>{String(i+1).padStart(2,'0')}</span><ShieldCheck size={22}/><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

      <section id="certifications" className="section"><SectionHeading eyebrow="— CERTIFICATIONS & CREDENTIALS" title="Validated by ministries, regulators and industry bodies."/><div className="filters">{categories.map(c => <button key={c} className={category===c?'active':''} onClick={() => setCategory(c)}>{c.toUpperCase()}</button>)}</div><div className="cert-grid">{filtered.map(c => { const active = !c[4] || new Date(c[4]) >= new Date(); return <article className="cert-card" key={c[0]}><div className="cert-top"><small>{c[6]}</small>{c[4] && <span className={active?'active-status':'expired-status'}>● {active?'ACTIVE':'EXPIRED'}</span>}</div><h3>{c[0]}</h3><p>{c[1]}</p><b>{c[2]}</b><div className="cert-meta"><span>Issued {c[3]}</span><span>{c[4] ? `Valid to ${c[4]}` : 'No expiry stated'}</span></div>{c[5] && <code>{c[5]}</code>}</article>})}</div></section>

      <section id="medical" className="dark-section section"><div className="medical-grid"><div><SectionHeading dark eyebrow="— MEDICAL FITNESS" title="Fit for work — with a health note."/><p className="dark-lead">The latest uploaded MCU records a status of <strong>Layak Bekerja dengan Catatan</strong> for 12 months, with a doctor’s note to maintain a healthy lifestyle.</p><div className="check-grid">{['Physical Examination & Vitals','Complete Blood Count & Chemistry','Chest X-Ray — documented in MCU','EKG — documented in MCU','Audiometry — documented in MCU','Psychological Screening — documented in MCU'].map(x => <div key={x}><Check size={17}/>{x}</div>)}</div></div><aside className="medical-card"><span className="fit">✓ FIT FOR WORK · WITH NOTE</span><h3>Ultra Health MCU</h3><p>Work-Fitness Evaluation</p><dl><div><dt>Date</dt><dd>18 September 2025</dd></div><div><dt>Issued By</dt><dd>RSU Mutiasari — Duri, Riau</dd></div><div><dt>Validity</dt><dd>12 months</dd></div></dl><div className="mini-stats"><b>STATUS<small>With note</small></b><b>VALIDITY<small>12 months</small></b><b>NOTE<small>Healthy lifestyle</small></b></div></aside></div></section>

      <section id="projects" className="section"><SectionHeading eyebrow="— PROJECTS & ACHIEVEMENTS" title="Field work that translates into measurable operational value."/><div className="project-grid">{projects.map(([cat,title,desc,tags],i) => <article className="project-card" key={title}><div className="project-image"><span>{cat}</span><div>{String(i+1).padStart(2,'0')}</div></div><div className="project-body"><h3>{title}</h3><p>{desc}</p><div>{tags.map(t => <span key={t}>{t}</span>)}</div><ArrowUpRight className="project-arrow"/></div></article>)}</div></section>

      <section id="contact" className="contact section"><div><SectionHeading dark eyebrow="— GET IN TOUCH" title="Let's discuss how I can strengthen your HSE programme."/><p className="dark-lead">Available for senior HSE roles, contract assignments and consulting engagements within the energy, infrastructure and industrial sectors.</p><div className="contact-links"><div><Mail/><span>Email<b>Available on request</b></span></div><a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer"><Phone/><span>WhatsApp<b>{profile.phone}</b></span></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><ArrowUpRight/><span>LinkedIn<b>linkedin.com/in/rizky-mahreza</b></span></a><div><MapPin/><span>Location<b>{profile.location}</b></span></div></div><button className="button primary" onClick={downloadCV}><Download size={16}/> Download CV</button></div><form className="contact-form" onSubmit={submit} noValidate><label>Full Name<input name="name" autoComplete="name" aria-invalid={!!errors.name}/>{errors.name&&<small>{errors.name}</small>}</label><label>Email Address<input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email}/>{errors.email&&<small>{errors.email}</small>}</label><label>Subject<input name="subject" aria-invalid={!!errors.subject}/>{errors.subject&&<small>{errors.subject}</small>}</label><label>Message<textarea name="message" rows={6} aria-invalid={!!errors.message}/>{errors.message&&<small>{errors.message}</small>}</label><button className="button primary" type="submit">Send Message <ArrowUpRight size={17}/></button>{formState==='success'&&<p className="success">Your message is validated. Delivery will be enabled after a professional email destination is confirmed.</p>}</form></section>
    </main>
    <footer><div><a className="brand" href="#home"><strong>RM</strong><span><b>{profile.name}</b><small>SENIOR HSE SPECIALIST</small></span></a><p>Executive HSE Portfolio · Pertamina Hulu Rokan working area.</p></div><div className="footer-direct"><b>DIRECT</b><a href={`https://wa.me/${profile.whatsapp}`}>WhatsApp · {profile.phone}</a><a href={profile.linkedin}>LinkedIn</a></div><a className="back-top" href="#home"><ArrowUp/><span className="sr-only">Back to top</span></a></footer>
  </>
}
