import { useMemo, useState } from 'react'
import { ArrowUpRight, BriefcaseBusiness, Check, Download, ExternalLink, Globe2, Linkedin, MapPin, Menu, MessageCircle, ShieldCheck, X } from 'lucide-react'
import { certifications, competencies, experience, profile, projects, stats } from './data'

const cvPath = '/Rizky-Mahreza-CV.pdf'
const profileImage = '/profile.webp'
const nav = [
  ['About', 'summary'],
  ['Experience', 'experience'],
  ['Expertise', 'competencies'],
  ['Credentials', 'certifications'],
  ['Projects', 'projects'],
  ['Contact', 'contact'],
] as const
const categories = ['all', 'regulatory', 'technical', 'training', 'academic'] as const

type Category = typeof categories[number]

function SectionIntro({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return (
    <div className="section-intro">
      <span className="section-kicker">{kicker}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function downloadCV() {
  window.open(cvPath, '_blank', 'noopener,noreferrer')
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [category, setCategory] = useState<Category>('all')
  const filtered = useMemo(
    () => category === 'all' ? certifications : certifications.filter((item) => item[6] === category),
    [category],
  )
  const activeCerts = certifications.filter((item) => !item[4] || new Date(item[4]) >= new Date()).length

  return (
    <div className="site-shell">
      <header className="nav-shell">
        <a className="brand" href="#home" aria-label="Rizky Mahreza home">
          <span className="brand-mark">RM</span>
          <span className="brand-copy">
            <strong>Rizky Mahreza</strong>
            <small>HSE • OIL & GAS</small>
          </span>
        </a>
        <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? 'open' : ''}>
          {nav.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <span className="nav-divider" />
          <button className="nav-lang" type="button" aria-label="Language English"><Globe2 size={15} /> EN</button>
          <button className="button button-small button-dark" type="button" onClick={downloadCV}><Download size={15} /> CV</button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-status"><span className="status-dot" /> Open to HSE opportunities</div>
              <span className="hero-kicker">SENIOR HSE SPECIALIST · RIAU, INDONESIA</span>
              <h1>Safety leadership for<br /><em>high-risk operations.</em></h1>
              <p className="hero-lead">{profile.value}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">Let's Talk <ArrowUpRight size={17} /></a>
                <button className="button button-ghost" type="button" onClick={downloadCV}><Download size={17} /> View CV</button>
              </div>
              <div className="hero-proof">
                <div><strong>{stats[0][0]}</strong><span>Years in HSE</span></div>
                <div><strong>{stats[1][0]}</strong><span>Major Projects</span></div>
                <div><strong>{activeCerts}+</strong><span>Active Credentials</span></div>
              </div>
            </div>

            <div className="hero-portrait">
              <div className="portrait-card">
                <img src={profileImage} alt="Rizky Mahreza — Senior HSE Specialist" width="848" height="1200" fetchPriority="high" />
                <div className="portrait-overlay" />
                <div className="portrait-meta">
                  <span className="portrait-label">PROFILE</span>
                  <strong>{profile.role}</strong>
                  <span>{profile.workingArea}</span>
                </div>
                <div className="portrait-badge"><ShieldCheck size={16} /> AK3U · BNSP · Oil & Gas</div>
              </div>
              <div className="portrait-note"><span>FIELD-FIRST</span><strong>Calm under pressure.<br />Clear on controls.</strong></div>
            </div>
          </div>
          <div className="hero-bottom"><span><MapPin size={15} /> {profile.location}</span><span>Available for senior HSE roles, contract work & consulting</span><a href="#experience">Explore experience <ArrowUpRight size={14} /></a></div>
        </section>

        <section id="summary" className="section section-light">
          <div className="summary-layout">
            <div>
              <SectionIntro kicker="01 · ABOUT" title="Built for the field, trusted by the operation." />
              <p className="body-large">{profile.bio}</p>
              <div className="tag-row">
                {['Safety Leadership', 'Risk Management', 'Regulatory Compliance', 'Operational Excellence'].map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <aside className="profile-panel">
              <span className="panel-label">AT A GLANCE</span>
              <div className="profile-facts">
                <div><small>Specialisation</small><strong>{profile.specialisation}</strong></div>
                <div><small>Working Area</small><strong>{profile.workingArea}</strong></div>
                <div><small>Education</small><strong>{profile.education}</strong></div>
                <div><small>Lead credentials</small><strong>{profile.leadCredentials.join(' · ')}</strong></div>
              </div>
            </aside>
          </div>
        </section>

        <section id="experience" className="section">
          <SectionIntro kicker="02 · EXPERIENCE" title="Progressive responsibility, measured in the field." copy="A career shaped by upstream operations, HSE systems, logistics coordination and frontline leadership." />
          <div className="experience-list">
            {experience.map((item, index) => (
              <article className="experience-item" key={`${item.start}-${item.role}`}>
                <div className="experience-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="experience-main">
                  <div className="experience-top"><span>{item.period}</span>{item.badge && <b>{item.badge}</b>}</div>
                  <h3>{item.role}</h3>
                  <p className="experience-company">{item.company} · {item.location}</p>
                  <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="competencies" className="section section-dark">
          <SectionIntro kicker="03 · EXPERTISE" title="Core disciplines that keep work controlled." copy="Practical capability across risk, permits, investigations, management systems and safety leadership." />
          <div className="expertise-grid">
            {competencies.map(([title, description], index) => (
              <article key={title} className="expertise-card">
                <div className="expertise-number">{String(index + 1).padStart(2, '0')}</div>
                <ShieldCheck size={19} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section">
          <div className="section-head-row">
            <SectionIntro kicker="04 · CREDENTIALS" title="Proof, not promises." copy="Certifications and formal credentials across regulatory, technical, training and academic domains." />
            <div className="filters" aria-label="Credential filters">
              {categories.map((item) => <button key={item} className={category === item ? 'active' : ''} type="button" onClick={() => setCategory(item)}>{item}</button>)}
            </div>
          </div>
          <div className="credentials-grid">
            {filtered.map((item) => {
              const active = !item[4] || new Date(item[4]) >= new Date()
              return (
                <article className="credential-card" key={item[0]}>
                  <div className="credential-top"><span>{item[6]}</span>{item[4] && <b className={active ? 'valid' : 'expired'}>{active ? 'ACTIVE' : 'EXPIRED'}</b>}</div>
                  <h3>{item[0]}</h3>
                  <p>{item[1]}</p>
                  <strong>{item[2]}</strong>
                  <div className="credential-meta"><span>Issued {item[3]}</span><span>{item[4] ? `Valid to ${item[4]}` : 'No expiry stated'}</span></div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="projects" className="section section-projects">
          <SectionIntro kicker="05 · SELECTED PROJECTS" title="Field work translated into operational value." />
          <div className="projects-list">
            {projects.map(([category, title, description, tags], index) => (
              <article className="project-row" key={title}>
                <div className="project-num">{String(index + 1).padStart(2, '0')}</div>
                <div className="project-content">
                  <span className="project-category">{category}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="project-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <ArrowUpRight className="project-icon" size={22} />
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-grid">
            <div className="contact-copy">
              <span className="section-kicker">06 · CONTACT</span>
              <h2>Let's talk about safer,<br /><em>stronger operations.</em></h2>
              <p>Available for senior HSE roles, contract assignments and consulting engagements across energy, infrastructure and industrial operations.</p>
              <div className="contact-actions">
                <a className="contact-link" href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={19} /><span><small>WhatsApp</small><strong>{profile.phone}</strong></span><ExternalLink size={15} /></a>
                <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={19} /><span><small>LinkedIn</small><strong>linkedin.com/in/rizky-mahreza</strong></span><ExternalLink size={15} /></a>
                <button className="contact-link" type="button" onClick={downloadCV}><Download size={19} /><span><small>Curriculum Vitae</small><strong>Download latest CV</strong></span><ExternalLink size={15} /></button>
              </div>
            </div>
            <div className="contact-card">
              <span className="panel-label">WHY RIZKY</span>
              {['Field-first HSE mindset', 'Upstream oil & gas exposure', 'Risk & permit discipline', 'Management-system awareness'].map((item) => <div className="why-row" key={item}><Check size={17} /> {item}</div>)}
              <div className="contact-location"><MapPin size={16} /><span>{profile.location}</span></div>
              <div className="contact-footer"><BriefcaseBusiness size={16} /><span>Open to the right opportunity</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#home"><span className="brand-mark">RM</span><span className="brand-copy"><strong>{profile.name}</strong><small>SENIOR HSE SPECIALIST</small></span></a>
        <span>Executive HSE Portfolio · {profile.workingArea}</span>
        <a className="back-top" href="#home" aria-label="Back to top"><ArrowUp size={17} /></a>
      </footer>
    </div>
  )
}
