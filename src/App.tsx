import { useMemo, useState } from 'react'
import { ArrowUp, ArrowUpRight, BriefcaseBusiness, Check, Instagram, Mail, MapPin, Menu, MessageCircle, ShieldCheck, X } from 'lucide-react'
import { certifications, competencies, experience, profile, projects, stats } from './data'
import { LiquidMetalButton } from './components/ui/liquid-metal-button'
import SplashCursor from './components/ui/SplashCursor'

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

function LinkedinMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M6.5 8.25A1.75 1.75 0 1 0 6.5 4.75a1.75 1.75 0 0 0 0 3.5ZM5 9.75h3v9.5H5v-9.5Zm5 0h2.88v1.3h.04c.4-.76 1.38-1.55 2.84-1.55 3.04 0 3.6 2 3.6 4.6v5.15h-3v-4.57c0-1.09-.02-2.5-1.52-2.5-1.52 0-1.75 1.18-1.75 2.42v4.65h-3v-9.5Z"/>
    </svg>
  )
}

function DiscordMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M19.54 5.4a16.1 16.1 0 0 0-3.96-1.22l-.48.99a14.7 14.7 0 0 0-6.2 0l-.48-.99A16.1 16.1 0 0 0 4.46 5.4C1.98 9.1 1.31 12.7 1.64 16.26a16 16 0 0 0 4.85 2.46l1.17-1.58a9.3 9.3 0 0 1-1.84-.88l.45-.34c3.56 1.65 7.42 1.65 10.94 0l.45.34c-.59.35-1.2.64-1.84.88l1.17 1.58a16 16 0 0 0 4.85-2.46c.38-4.12-.68-7.68-2.3-10.86Zm-10.73 8.72c-1.05 0-1.91-.96-1.91-2.14s.85-2.14 1.91-2.14 1.92.97 1.91 2.14c0 1.18-.86 2.14-1.91 2.14Zm6.38 0c-1.05 0-1.91-.96-1.91-2.14s.85-2.14 1.91-2.14 1.92.97 1.91 2.14c0 1.18-.86 2.14-1.91 2.14Z"/>
    </svg>
  )
}


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
        <LiquidMetalButton
          viewMode="icon"
          icon={menuOpen ? <X size={20} /> : <Menu size={20} />}
          ariaLabel="Toggle navigation"
          width={46}
          onClick={() => setMenuOpen((v) => !v)}
        />
        <nav className={menuOpen ? 'open' : ''}>
          {nav.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <span className="nav-divider" />
          <LiquidMetalButton label="EN" ariaLabel="Language English" width={64} />
          <LiquidMetalButton label="CV" width={74} onClick={downloadCV} />
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
                <LiquidMetalButton label="Let's Talk" href="#contact" />
                <LiquidMetalButton label="View CV" onClick={downloadCV} width={118} />
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
              {categories.map((item) => (
                <LiquidMetalButton
                  key={item}
                  label={item}
                  width={Math.max(78, Math.min(112, item.length * 8 + 30))}
                  onClick={() => setCategory(item)}
                  ariaLabel={`Filter credentials: ${item}`}
                />
              ))}
            </div>
          </div>
          <div className="credentials-grid">
            {filtered.map((item) => {
              const active = !item[4] || new Date(item[4]) >= new Date()
              return (
                <article className="credential-card luminous-card" key={item[0]}>
                  <div className="credential-luminous-icon" aria-hidden="true"><ShieldCheck size={23} strokeWidth={1.8} /></div>
                  <div className="credential-content">
                    <div className="credential-top"><span>{item[6]}</span>{item[4] && <b className={active ? 'valid' : 'expired'}>{active ? 'ACTIVE' : 'EXPIRED'}</b>}</div>
                    <h3>{item[0]}</h3>
                    <p>{item[1]}</p>
                    <strong>{item[2]}</strong>
                    <div className="credential-meta"><span>Issued {item[3]}</span><span>{item[4] ? `Valid to ${item[4]}` : 'No expiry stated'}</span></div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="approach" className="approach-section">
          <div className="approach-background" aria-hidden="true">
            <SplashCursor
              SIM_RESOLUTION={128}
              DYE_RESOLUTION={1440}
              DENSITY_DISSIPATION={3.5}
              VELOCITY_DISSIPATION={2}
              PRESSURE={0.1}
              CURL={3}
              SPLAT_RADIUS={0.2}
              SPLAT_FORCE={6000}
              COLOR_UPDATE_SPEED={10}
            />
          </div>
          <div className="approach-content">
            <div className="approach-intro">
              <div>
                <span className="section-kicker">MY PROFESSIONAL APPROACH</span>
                <h2>PREVENTION<br />BEFORE<br />INCIDENT.</h2>
              </div>
              <div className="approach-copy">
                <p>Safety is more than compliance. It is about identifying risks before work begins, preparing people properly, and making sure the right controls are in place.</p>
                <strong>SAFE PEOPLE.<br />SAFE OPERATIONS.<br />BETTER OUTCOMES.</strong>
              </div>
            </div>
            <div className="approach-cta">
              <span className="section-kicker">CLOSING CTA</span>
              <h3>Let's build safer,<br />smarter, and<br />more reliable<br />operations.</h3>
              <div className="approach-actions">
                <LiquidMetalButton label="Let's Work Together" href="#contact" width={162} />
                <LiquidMetalButton label="Connect on LinkedIn" href={profile.linkedin} width={174} />
              </div>
            </div>
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
              <div className="social-card-grid" aria-label="Social and contact links">
                <a className="social-card social-card-instagram" href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram className="social-card-icon" size={24} />
                  <span className="social-card-text"><small>Instagram</small><strong>@rizkymahreza</strong></span>
                </a>
                <a className="social-card social-card-linkedin" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <LinkedinMark className="social-card-brand-icon" />
                  <span className="social-card-text"><small>LinkedIn</small><strong>linkedin.com/in/rizky-mahreza</strong></span>
                </a>
                <a className="social-card social-card-discord" href={profile.discordUrl} target="_blank" rel="noreferrer" aria-label="Discord">
                  <DiscordMark className="social-card-brand-icon" />
                  <span className="social-card-text"><small>Discord</small><strong>{profile.discordUsername}</strong></span>
                </a>
                <a className="social-card social-card-email" href={`mailto:${profile.email}`} aria-label="Email">
                  <Mail className="social-card-icon" size={24} />
                  <span className="social-card-text"><small>Email</small><strong>{profile.email}</strong></span>
                </a>
                <a className="social-card social-card-whatsapp" href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <MessageCircle className="social-card-icon" size={24} />
                  <span className="social-card-text"><small>WhatsApp</small><strong>{profile.phone}</strong></span>
                </a>
              </div>
              <div className="contact-cv-action">
                <LiquidMetalButton label="Download latest CV" width={188} onClick={downloadCV} ariaLabel="Download latest CV" />
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
