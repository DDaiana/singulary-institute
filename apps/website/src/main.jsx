import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  ArrowRight,
  BookOpen,
  CircleDot,
  Cpu,
  Crosshair,
  Globe2,
  Landmark,
  Layers3,
  ShieldCheck,
  Target,
  UserRound,
  Users,
} from 'lucide-react';
import registry from '../../../content/content-registry.json';
import './styles.css';

const nav = [
  { label: 'Home', href: '#research', active: 'research' },
  { label: 'Publications', href: '#publications', active: 'publications' },
  { label: 'Programmes', href: '#programmes', active: 'programmes' },
  { label: 'About', href: '#about', active: 'about' },
];
const symbol = `${import.meta.env.BASE_URL}assets/singulary-symbol.png`;

const areaMeta = {
  'AI & Technology': { Icon: Cpu, tone: 'blue' },
  'Institutions & Governance': { Icon: Landmark, tone: 'purple' },
  'Society & Behavior': { Icon: Users, tone: 'mint' },
  'Economy & Work': { Icon: Globe2, tone: 'orange' },
  'Risk & Futures': { Icon: Crosshair, tone: 'rose' },
};

const typeLabels = {
  framework: 'Framework',
  brief: 'Research Brief',
  'signal-report': 'Signal Report',
  essay: 'Essay',
  guide: 'Guide',
};

const projectRoutes = {
  'the-missing-layer': '#programmes/policy-usability-and-decision-systems',
  'ai-enabled-manipulation': '#programmes/youth-safety-and-emerging-risks/ai-enabled-manipulation',
};

function useContent() {
  return useMemo(() => {
    const areas = registry.research_areas.map((area) => ({ ...area, ...areaMeta[area.title] }));
    const programmes = registry.programmes;
    const publications = registry.publications.map((publication) => ({
      ...publication,
      programmeData: programmes.find((programme) => programme.title === publication.programme),
      areaData: areas.find((area) => area.title === publication.research_area),
      href: projectRoutes[publication.slug] || '#publications',
    }));

    return {
      areas,
      programmes,
      publications,
      archive: publications.filter((publication) => ['published', 'approved', 'review', 'draft'].includes(publication.status)),
    };
  }, []);
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
}

function Logo() {
  return (
    <a className="brand" href="#research" aria-label="Singulary Institute home">
      <img src={symbol} alt="" />
      <span>Singulary <em>Research</em></span>
    </a>
  );
}

function Header({ active }) {
  return (
    <header className="header">
      <Logo />
      <nav aria-label="Primary navigation">
        {nav.map((item) => (
          <a key={item.label} className={active === item.active ? 'active' : ''} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const value = email.trim().toLowerCase();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!isValid) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    const stored = JSON.parse(localStorage.getItem('singulary-updates-emails') || '[]');
    if (stored.includes(value)) {
      setStatus('error');
      setMessage('This email is already on the Singulary updates list.');
      return;
    }

    localStorage.setItem('singulary-updates-emails', JSON.stringify([...stored, value]));
    setEmail('');
    setStatus('success');
    setMessage('Thank you. You have been added to the Singulary updates list.');
  }

  return (
    <form className="subscribe" onSubmit={handleSubmit} noValidate>
      <h4>Stay informed</h4>
      <p>Receive research briefs and insights on the forces shaping our future.</p>
      <div className="subscribe-row">
        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" aria-label="Email address" />
        <button type="submit">Subscribe <ArrowRight size={16} /></button>
      </div>
      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
      <div className="legal">
        <a href="#methodology">Transparency</a>
        <a href="#methodology">AI Use</a>
        <a href="#about">Contact</a>
      </div>
    </form>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Logo />
        <p>Independent research on the systems shaping our collective future.</p>
        <small>© 2026 Singulary Research</small>
      </div>
      <div>
        <h4>Explore</h4>
        <a href="#research">Home</a>
        <a href="#publications">Publications</a>
        <a href="#programmes">Programmes</a>
        <a href="#about">About</a>
      </div>
      <div>
        <h4>Institute</h4>
        <a href="#methodology">Methodology</a>
        <a href="#research-areas">Research Areas</a>
        <a href="#archive">Archive</a>
      </div>
      <Newsletter />
    </footer>
  );
}

function Shell({ children, active = 'research' }) {
  return (
    <>
      <Header active={active} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function IconCard({ title, body, Icon, tone = 'blue', meta, href = '#research-areas', showLink = true }) {
  return (
    <article className={`card tone-${tone}`}>
      <div className="icon"><Icon size={26} /></div>
      {meta ? <small>{meta}</small> : null}
      <h3>{title}</h3>
      <p>{body}</p>
      {showLink ? <a href={href}>Explore <ArrowRight size={16} /></a> : null}
    </article>
  );
}

function Hero() {
  const orbit = [
    ['Systems Perspective', 'We examine the interactions that shape outcomes.', Layers3, 'top'],
    ['Signal Detection', 'We identify patterns in noise and change.', Activity, 'left'],
    ['Human Interpretation', 'We add context, nuance, and judgment.', UserRound, 'right'],
    ['Meaning & Consequence', 'We connect signals to implications and action.', Target, 'bottom'],
  ];

  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Research Intelligence</p>
        <h1>Interpreting the systems shaping AI, institutions, and <span>decision-making.</span></h1>
        <p className="lead">Singulary Research investigates the signals behind technological, institutional, and societal change — translating complexity into clarity through rigorous analysis and original frameworks.</p>
        <a className="text-cta" href="#about">Our Focus <ArrowRight size={18} /></a>
      </div>
      <div className="orbit" aria-hidden="true">
        <div className="star-center"><img src={symbol} alt="" /></div>
        {orbit.map(([title, body, Icon, position]) => (
          <div className={`orbit-card ${position}`} key={title}>
            <Icon size={28} />
            <div>
              <b>{title}</b>
              <p>{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Research() {
  const { areas, programmes, publications } = useContent();
  return (
    <Shell active="research">
      <Hero />
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Research Programmes</p>
            <h2>Active institutional programmes</h2>
          </div>
        </div>
        <div className="programme-grid">
          {programmes.map((programme) => (
            <IconCard
              key={programme.slug}
              title={programme.title}
              body={programme.summary}
              Icon={BookOpen}
              tone={programme.status === 'active' ? 'blue' : 'purple'}
              meta={programme.status}
              href={`#programmes/${programme.slug}`}
            />
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Working Projects</p>
            <h2>Current research in motion</h2>
          </div>
        </div>
        <div className="list compact-list">
          {publications.map((publication, index) => <Publication key={publication.slug} publication={publication} img={index} />)}
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Research Areas</p>
            <h2>The domains we explore</h2>
          </div>
        </div>
        <div className="area-grid">
          {areas.map((area) => <IconCard key={area.slug} title={area.title} body={area.summary} Icon={area.Icon} tone={area.tone} href={`#research-areas/${area.slug}`} />)}
        </div>
      </section>
    </Shell>
  );
}

function PublicationFilters({ publications }) {
  const counts = publications.reduce((acc, item) => ({ ...acc, [item.type]: (acc[item.type] || 0) + 1 }), {});

  return (
    <div className="filter">
      <button>All Publications <span>{publications.length}</span></button>
      <button>Research Briefs <span>{counts.brief || 0}</span></button>
      <button>Signal Reports <span>{counts['signal-report'] || 0}</span></button>
      <button>Essays <span>{counts.essay || 0}</span></button>
      <button>Frameworks <span>{counts.framework || 0}</span></button>
    </div>
  );
}

function Publications() {
  const { publications } = useContent();
  return (
    <Shell active="publications">
      <section className="page two-col">
        <div>
          <h1>Research publications</h1>
          <p className="lead">In-depth analysis, original frameworks, and forward-looking perspectives on the systems shaping our future.</p>
          <PublicationFilters publications={publications} />
        </div>
        <div className="list">
          {publications.map((publication, index) => <Publication key={publication.slug} publication={publication} img={index} />)}
        </div>
      </section>
    </Shell>
  );
}

function Publication({ publication, img, compact = false }) {
  return (
    <a className="pub" href={publication.href}>
      <div className={`thumb t${img % 3}`} />
      <div>
        <small>{publication.research_area}</small>
        <h3>{publication.title}</h3>
        <p>{publication.summary}</p>
        <span>{formatDate(publication.date)} · {typeLabels[publication.type] || publication.type}{compact ? '' : ` · ${publication.programme}`}</span>
      </div>
      <ArrowRight size={18} />
    </a>
  );
}

function Programmes() {
  const { programmes, publications } = useContent();
  return (
    <Shell active="programmes">
      <section className="page">
        <h1>Programmes</h1>
        <p className="lead">Research programmes organise the institution’s working projects, methods, and intended outputs.</p>
        <div className="programme-grid page-grid">
          {programmes.map((programme) => (
            <IconCard
              key={programme.slug}
              title={programme.title}
              body={programme.summary}
              Icon={BookOpen}
              tone={programme.status === 'active' ? 'blue' : 'purple'}
              meta={programme.status}
              href={`#programmes/${programme.slug}`}
            />
          ))}
        </div>
        <div className="list programme-projects">
          {publications.map((publication, index) => <Publication key={publication.slug} publication={publication} img={index} />)}
        </div>
      </section>
    </Shell>
  );
}

function ProgrammeDetail({ slug }) {
  const { programmes, publications } = useContent();
  const programme = programmes.find((item) => item.slug === slug) || programmes[0];
  const related = publications.filter((publication) => publication.programme === programme.title);

  return (
    <Shell active="programmes">
      <section className="page programme-detail">
        <p className="eyebrow">Programme</p>
        <h1>{programme.title}</h1>
        <p className="lead">{programme.summary}</p>
        <article className="method-card">
          <h3>Programme focus</h3>
          <p>This programme connects research questions, signal monitoring, analysis, and publication outputs into a coherent programme of work.</p>
          <div className="mini-grid">
            {['Signal collection', 'Interpretation', 'Methodology', 'Outputs'].map((item) => <span key={item}><CircleDot size={14} />{item}</span>)}
          </div>
        </article>
        <div className="list programme-projects">
          {related.map((publication, index) => <Publication key={publication.slug} publication={publication} img={index} />)}
        </div>
      </section>
    </Shell>
  );
}

function AIManipulationProject() {
  return (
    <Shell active="programmes">
      <section className="page programme-detail">
        <p className="eyebrow">Youth Safety & Emerging Risks</p>
        <h1>AI-Enabled Manipulation</h1>
        <p className="lead">A prevention-focused intelligence project on emerging AI-enabled manipulation risks affecting young people.</p>
        <div className="project-grid">
          <article className="method-card">
            <h3>Project overview</h3>
            <p>The project tracks how AI systems can make manipulation more scalable, adaptive, personalised, and difficult for institutions to detect early.</p>
          </article>
          <article className="method-card">
            <h3>Why it matters</h3>
            <p>Youth-facing digital environments are changing quickly. Prevention-focused intelligence helps institutions identify weak signals before risks become normalised.</p>
          </article>
          <article className="method-card">
            <h3>Research focus</h3>
            <p>The work focuses on persuasion patterns, synthetic interaction, attention capture, institutional readiness, and early-warning indicators.</p>
          </article>
          <article className="method-card">
            <h3>Methodology</h3>
            <p>Signal collection, source review, scenario mapping, boundary checks, and interpretation are used to separate evidence, inference, and responsible analysis.</p>
          </article>
          <article className="method-card">
            <h3>Framework</h3>
            <p>The framework maps risk signals across actor capability, target vulnerability, platform affordance, institutional visibility, and intervention window.</p>
          </article>
          <article className="method-card">
            <h3>Outputs / intended deliverables</h3>
            <p>Outputs may include intelligence briefs, signal taxonomies, decision notes, methodological updates, and programme-linked publication drafts.</p>
          </article>
        </div>
      </section>
    </Shell>
  );
}

function ResearchAreas({ slug }) {
  const { areas, publications } = useContent();
  const visibleAreas = slug ? areas.filter((area) => area.slug === slug) : areas;
  return (
    <Shell active="research">
      <section className="page">
        <h1>Research areas</h1>
        <p className="lead">We explore the critical domains where technology, institutions, and society intersect.</p>
        <div className="areas-large">
          {visibleAreas.map((area) => {
            const related = publications.filter((publication) => publication.research_area === area.title).length;
            return <IconCard key={area.slug} title={area.title} body={area.summary} Icon={area.Icon} tone={area.tone} meta={`${related} linked item${related === 1 ? '' : 's'}`} href="#publications" />;
          })}
        </div>
      </section>
    </Shell>
  );
}

function Methodology() {
  const steps = ['Draft', 'Review', 'Approved', 'Website', 'LinkedIn', 'Archive'];
  return (
    <Shell active="research">
      <section className="page methodology">
        <div>
          <h1>Our methodology</h1>
          <p className="lead">We combine multi-source intelligence, human interpretation, publication discipline, and transparent methodological boundaries.</p>
          <div className="tabs">
            {steps.map((step, index) => <button className={index === 0 ? 'active' : ''} key={step}>{index + 1}. {step}</button>)}
          </div>
        </div>
        <article className="method-card">
          <h3>Publication pipeline</h3>
          <p>Every public item moves through a traceable institutional path: Draft to Review to Approved to Website to LinkedIn to Archive.</p>
          <div className="mini-grid">
            {['Source-linked', 'Programme-owned', 'Area-indexed', 'Archive-ready'].map((item) => <span key={item}><CircleDot size={14} />{item}</span>)}
          </div>
          <h4>Governance standards</h4>
          {['AI Use Policy', 'Transparency Statement', 'Methodological Boundaries', 'Contributor Guidelines', 'Editorial Standards'].map((item) => (
            <p className="principle" key={item}>
              <ShieldCheck size={15} />
              <b>{item}</b>
              <span>Maintained in repository governance.</span>
            </p>
          ))}
        </article>
      </section>
    </Shell>
  );
}

function Archive() {
  const { archive } = useContent();
  return (
    <Shell active="research">
      <section className="page two-col archive">
        <div>
          <h1>Archive</h1>
          <p className="lead">Explore our timeline of signals, analysis, and insights over time.</p>
          <div className="filter years">
            {['All Years', '2026', '2025', '2024'].map((year, index) => <button className={index === 0 ? 'active' : ''} key={year}>{year}</button>)}
          </div>
        </div>
        <div className="timeline">
          {archive.map((publication, index) => (
            <article key={publication.slug}>
              <span className="date">{formatDate(publication.date)}</span>
              <Publication publication={publication} img={index} compact />
            </article>
          ))}
        </div>
      </section>
    </Shell>
  );
}

function About() {
  return (
    <Shell active="about">
      <section className="page about">
        <div>
          <h1>About<br />Singulary Research</h1>
          <p className="lead">We are an independent research initiative focused on interpreting the systems shaping our collective future.</p>
        </div>
        <div className="about-orbit"><img src={symbol} alt="" /></div>
        <div className="about-cards">
          <IconCard title="Our Mission" body="To make sense of complex change through rigorous research and clear communication." Icon={Target} showLink={false} />
          <IconCard title="Our Approach" body="We study signals, build frameworks, and derive implications that inform better decisions." Icon={BookOpen} showLink={false} />
          <IconCard title="Our Focus" body="AI, institutions, society, and the interactions that will define the years ahead." Icon={UserRound} showLink={false} />
        </div>
        <div className="belief">
          <h2>We believe</h2>
          <p>Clarity is a force multiplier. By understanding the systems around us, we can make better decisions, build better futures, and navigate change with greater confidence.</p>
        </div>
      </section>
    </Shell>
  );
}

function App() {
  const [hash, setHash] = useState(location.hash || '#research');

  useEffect(() => {
    const updateHash = () => setHash(location.hash || '#research');
    addEventListener('hashchange', updateHash);
    return () => removeEventListener('hashchange', updateHash);
  }, []);

  const route = hash.replace(/^#/, '');
  const [, programmeSlug, projectSlug] = route.match(/^programmes\/([^/]+)\/?([^/]*)/) || [];
  const [, areaSlug] = route.match(/^research-areas\/([^/]+)/) || [];

  if (route === 'publications') return <Publications />;
  if (route === 'programmes') return <Programmes />;
  if (programmeSlug === 'youth-safety-and-emerging-risks' && projectSlug === 'ai-enabled-manipulation') return <AIManipulationProject />;
  if (programmeSlug) return <ProgrammeDetail slug={programmeSlug} />;
  if (route.startsWith('research-areas')) return <ResearchAreas slug={areaSlug} />;
  if (route === 'methodology') return <Methodology />;
  if (route === 'archive') return <Archive />;
  if (route === 'about') return <About />;
  return <Research />;
}

createRoot(document.getElementById('root')).render(<App />);
