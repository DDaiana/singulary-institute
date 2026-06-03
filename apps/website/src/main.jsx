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
  { label: 'Home', href: '#/', active: 'home' },
  { label: 'Publications', href: '#/publications', active: 'publications' },
  { label: 'Research Areas', href: '#/research-areas', active: 'research-areas' },
  { label: 'About', href: '#/about', active: 'about' },
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

function useContent() {
  return useMemo(() => {
    const areas = registry.researchAreas.map((area) => ({ ...area, ...areaMeta[area.title] }));
    const areaBySlug = Object.fromEntries(areas.map((area) => [area.slug, area]));
    const programmes = registry.programmes.map((programme) => ({
      ...programme,
      href: `#/programmes/${programme.slug}`,
      areas: programme.researchAreas.map((slug) => areaBySlug[slug]).filter(Boolean),
    }));
    const programmeBySlug = Object.fromEntries(programmes.map((programme) => [programme.slug, programme]));
    const projects = registry.projects.map((project) => ({
      ...project,
      href: `#/projects/${project.slug}`,
      programmeData: programmeBySlug[project.programme],
      areas: project.researchAreas.map((slug) => areaBySlug[slug]).filter(Boolean),
    }));
    const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));
    const publications = registry.publications
      .filter((publication) => publication.public)
      .map((publication) => ({
        ...publication,
        href: `#/projects/${publication.project}`,
        projectData: projectBySlug[publication.project],
        programmeData: programmeBySlug[publication.programme],
        areaData: areaBySlug[publication.researchArea],
      }));

    return { areas, programmes, projects, publications, programmeBySlug, projectBySlug, areaBySlug };
  }, []);
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
}

function getRoute() {
  return (location.hash || '#/').replace(/^#\/?/, '');
}

function Logo() {
  return (
    <a className="brand" href="#/" aria-label="Singulary Institute home">
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
      setMessage('This email has already been recorded locally.');
      return;
    }

    localStorage.setItem('singulary-updates-emails', JSON.stringify([...stored, value]));
    setEmail('');
    setStatus('success');
    setMessage('Thank you. Your email has been recorded for Singulary updates.');
  }

  return (
    <form className="subscribe" onSubmit={handleSubmit} noValidate>
      <h4>Stay informed</h4>
      <p>Receive research briefs and insights. This frontend demo records emails locally until a mailing backend is configured.</p>
      <div className="subscribe-row">
        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" aria-label="Email address" />
        <button type="submit">Subscribe <ArrowRight size={16} /></button>
      </div>
      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
      <div className="legal">
        <a href="#/methodology">Transparency</a>
        <a href="#/governance">AI Use</a>
        <a href="#/about">Contact</a>
      </div>
    </form>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Logo />
        <p>Public-interest research infrastructure for interpreting signal, decision, and consequence.</p>
        <small>© 2026 Singulary Research</small>
      </div>
      <div>
        <h4>Explore</h4>
        <a href="#/">Home</a>
        <a href="#/publications">Publications</a>
        <a href="#/research-areas">Research Areas</a>
        <a href="#/about">About</a>
      </div>
      <div>
        <h4>Institute</h4>
        <a href="#/methodology">Methodology</a>
        <a href="#/archive">Archive</a>
        <a href="#/governance">Governance</a>
        <a href="#/research-infrastructure">Research Infrastructure</a>
      </div>
      <Newsletter />
    </footer>
  );
}

function Shell({ children, active = 'home' }) {
  return (
    <>
      <Header active={active} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function IconCard({ title, body, Icon, tone = 'blue', meta, href, showLink = true, linkText = 'Explore' }) {
  return (
    <article className={`card tone-${tone}`}>
      <div className="icon"><Icon size={26} /></div>
      {meta ? <small>{meta}</small> : null}
      <h3>{title}</h3>
      <p>{body}</p>
      {showLink && href ? <a href={href}>{linkText} <ArrowRight size={16} /></a> : null}
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
        <p className="lead">Singulary Research investigates signal, interpretation, decision, and consequence across technological, institutional, and societal change.</p>
        <a className="text-cta" href="#/about">Our Focus <ArrowRight size={18} /></a>
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

function Home() {
  const { areas, programmes, projects } = useContent();
  return (
    <Shell active="home">
      <Hero />
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Research Areas</p>
            <h2>The public entry points</h2>
          </div>
        </div>
        <div className="area-grid">
          {areas.map((area) => (
            <IconCard key={area.slug} title={area.title} body={area.summary} Icon={area.Icon} tone={area.tone} href={`#/research-areas/${area.slug}`} />
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Programmes</p>
            <h2>Operational research streams</h2>
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
              href={programme.href}
            />
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Projects</p>
            <h2>Current research in motion</h2>
          </div>
        </div>
        <div className="list compact-list">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} img={index} />)}
        </div>
      </section>
    </Shell>
  );
}

function ProjectCard({ project, img }) {
  return (
    <a className="pub" href={project.href}>
      <div className={`thumb t${img % 3}`} />
      <div>
        <small>{project.programmeData?.title}</small>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <span>{project.status} · {project.areas.map((area) => area.title).join(' · ')}</span>
      </div>
      <ArrowRight size={18} />
    </a>
  );
}

function PublicationFilters({ publications }) {
  const counts = publications.reduce((acc, item) => ({ ...acc, [item.type]: (acc[item.type] || 0) + 1 }), {});
  const entries = Object.entries(counts);

  return (
    <div className="filter">
      <button>All Publications <span>{publications.length}</span></button>
      {entries.map(([type, count]) => (
        <button key={type}>{typeLabels[type] || type} <span>{count}</span></button>
      ))}
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
          <p className="lead">Outputs generated by Singulary projects, linked back to their project, programme, and research area.</p>
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
        <small>{typeLabels[publication.type] || publication.type} · {publication.status}</small>
        <h3>{publication.title}</h3>
        <p>{publication.summary}</p>
        <span>
          {formatDate(publication.date)} · {publication.projectData?.title} · {publication.programmeData?.title} · {publication.areaData?.title}
        </span>
      </div>
      <ArrowRight size={18} />
    </a>
  );
}

function ResearchAreas({ slug }) {
  const { areas } = useContent();
  const area = areas.find((item) => item.slug === slug);

  if (area) return <ResearchAreaDetail area={area} />;

  return (
    <Shell active="research-areas">
      <section className="page">
        <h1>Research areas</h1>
        <p className="lead">Broad public lenses that lead into programmes, projects, and outputs.</p>
        <div className="areas-large">
          {areas.map((item) => (
            <IconCard key={item.slug} title={item.title} body={item.summary} Icon={item.Icon} tone={item.tone} href={`#/research-areas/${item.slug}`} />
          ))}
        </div>
      </section>
    </Shell>
  );
}

function ResearchAreaDetail({ area }) {
  const { programmes, projects, publications } = useContent();
  const relatedProgrammes = programmes.filter((programme) => programme.researchAreas.includes(area.slug));
  const relatedProjects = projects.filter((project) => project.researchAreas.includes(area.slug));
  const relatedPublications = publications.filter((publication) => publication.researchArea === area.slug);

  return (
    <Shell active="research-areas">
      <section className="page programme-detail">
        <p className="eyebrow">Research Area</p>
        <h1>{area.title}</h1>
        <p className="lead">{area.overview}</p>
        <div className="detail-grid">
          <article className="method-card">
            <h3>Why this area matters</h3>
            <p>{area.why_it_matters}</p>
          </article>
          <article className="method-card">
            <h3>Methodological note</h3>
            <p>{area.methodological_note}</p>
          </article>
        </div>
        <ContentSection eyebrow="Programmes" title="Related programmes">
          <div className="programme-grid page-grid">
            {relatedProgrammes.map((programme) => (
              <IconCard key={programme.slug} title={programme.title} body={programme.summary} Icon={BookOpen} tone={programme.status === 'active' ? 'blue' : 'purple'} meta={programme.status} href={programme.href} />
            ))}
          </div>
        </ContentSection>
        <ContentSection eyebrow="Projects" title="Current research in motion">
          <div className="list programme-projects">
            {relatedProjects.length ? relatedProjects.map((project, index) => <ProjectCard key={project.slug} project={project} img={index} />) : <EmptyState text="No active project is currently published for this area." />}
          </div>
        </ContentSection>
        <ContentSection eyebrow="Outputs" title="Related publications / outputs">
          <div className="list programme-projects">
            {relatedPublications.length ? relatedPublications.map((publication, index) => <Publication key={publication.slug} publication={publication} img={index} compact />) : <EmptyState text="No public output is currently listed for this area." />}
          </div>
        </ContentSection>
      </section>
    </Shell>
  );
}

function ProgrammeDetail({ slug }) {
  const { programmes, projects, publications } = useContent();
  const programme = programmes.find((item) => item.slug === slug);

  if (!programme) return <Home />;

  const activeProjects = projects.filter((project) => project.programme === programme.slug);
  const outputs = publications.filter((publication) => publication.programme === programme.slug);

  return (
    <Shell active="research-areas">
      <section className="page programme-detail">
        <p className="eyebrow">Programme</p>
        <h1>{programme.title}</h1>
        <p className="lead">{programme.overview}</p>
        <div className="detail-grid">
          <article className="method-card">
            <h3>Research questions</h3>
            {programme.research_questions.map((question) => <p className="principle" key={question}><CircleDot size={15} /><span>{question}</span></p>)}
          </article>
          <article className="method-card">
            <h3>Research areas</h3>
            <div className="mini-grid">
              {programme.areas.map((area) => <a href={`#/research-areas/${area.slug}`} key={area.slug}><CircleDot size={14} />{area.title}</a>)}
            </div>
            <h3>Status</h3>
            <p>{programme.status}</p>
          </article>
        </div>
        <ContentSection eyebrow="Projects" title="Active projects / Research in Motion">
          <div className="list programme-projects">
            {activeProjects.length ? activeProjects.map((project, index) => <ProjectCard key={project.slug} project={project} img={index} />) : <EmptyState text="No public active project is currently listed for this programme." />}
          </div>
        </ContentSection>
        <ContentSection eyebrow="Outputs" title="Outputs / Publications">
          <div className="list programme-projects">
            {outputs.length ? outputs.map((publication, index) => <Publication key={publication.slug} publication={publication} img={index} compact />) : <EmptyState text="No public output is currently listed for this programme." />}
          </div>
        </ContentSection>
        <article className="method-card programme-projects">
          <h3>Methodology</h3>
          <p>{programme.methodology}</p>
        </article>
      </section>
    </Shell>
  );
}

function ProjectDetail({ slug }) {
  const { projects, publications } = useContent();
  const project = projects.find((item) => item.slug === slug);

  if (!project) return <Home />;

  const outputs = publications.filter((publication) => publication.project === project.slug);

  return (
    <Shell active="research-areas">
      <section className="page programme-detail">
        <p className="eyebrow">{project.programmeData?.title}</p>
        <h1>{project.title}</h1>
        <p className="lead">{project.summary}</p>
        <div className="project-grid">
          <article className="method-card">
            <h3>Project overview</h3>
            <p>{project.overview}</p>
          </article>
          <article className="method-card">
            <h3>Why it matters</h3>
            <p>{project.why_it_matters}</p>
          </article>
          <article className="method-card">
            <h3>Methodology</h3>
            <p>{project.methodology}</p>
          </article>
          <article className="method-card">
            <h3>Framework</h3>
            <p>{project.framework}</p>
          </article>
        </div>
        <article className="method-card programme-projects">
          <h3>Research areas</h3>
          <div className="mini-grid">
            {project.areas.map((area) => <a href={`#/research-areas/${area.slug}`} key={area.slug}><CircleDot size={14} />{area.title}</a>)}
          </div>
          <h3>Outputs / intended deliverables</h3>
          {project.outputs.map((output) => <p className="principle" key={output}><ShieldCheck size={15} /><span>{output}</span></p>)}
        </article>
        <ContentSection eyebrow="Publications" title="Linked outputs">
          <div className="list programme-projects">
            {outputs.length ? outputs.map((publication, index) => <Publication key={publication.slug} publication={publication} img={index} compact />) : <EmptyState text="No public output is currently listed for this project." />}
          </div>
        </ContentSection>
      </section>
    </Shell>
  );
}

function ContentSection({ eyebrow, title, children }) {
  return (
    <section className="content-block">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function EmptyState({ text }) {
  return <p className="empty-state">{text}</p>;
}

function Methodology() {
  const steps = ['Draft', 'Review', 'Approved', 'Website', 'LinkedIn', 'Archive'];
  return (
    <Shell active="research-areas">
      <section className="page methodology">
        <div>
          <h1>Our methodology</h1>
          <p className="lead">We connect research areas, programmes, projects, and outputs through traceable signal interpretation.</p>
          <div className="tabs">
            {steps.map((step, index) => <button className={index === 0 ? 'active' : ''} key={step}>{index + 1}. {step}</button>)}
          </div>
        </div>
        <article className="method-card">
          <h3>Publication pipeline</h3>
          <p>Every public item moves through a traceable institutional path: Draft to Review to Approved to Website to LinkedIn to Archive.</p>
          <div className="mini-grid">
            {['Area-linked', 'Programme-owned', 'Project-grounded', 'Archive-ready'].map((item) => <span key={item}><CircleDot size={14} />{item}</span>)}
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
  const { publications } = useContent();
  return (
    <Shell active="research-areas">
      <section className="page two-col archive">
        <div>
          <h1>Archive</h1>
          <p className="lead">A timeline of public outputs and draft publication records.</p>
          <div className="filter years">
            <button>All Years <span>{publications.length}</span></button>
          </div>
        </div>
        <div className="timeline">
          {publications.map((publication, index) => (
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

function Governance() {
  return (
    <Shell active="research-areas">
      <section className="page">
        <h1>Governance</h1>
        <p className="lead">Repository-maintained standards for transparent, bounded, public-interest research.</p>
        <div className="areas-large">
          {['AI Use Policy', 'Transparency Statement', 'Methodological Boundaries', 'Contributor Guidelines', 'Editorial Standards'].map((item) => (
            <IconCard key={item} title={item} body="Maintained in the research-infrastructure governance system." Icon={ShieldCheck} tone="blue" showLink={false} />
          ))}
        </div>
      </section>
    </Shell>
  );
}

function ResearchInfrastructure() {
  return (
    <Shell active="research-areas">
      <section className="page">
        <h1>Research infrastructure</h1>
        <p className="lead">The repository is the institution: identity, governance, intelligence pipeline, theory, operations, publication, and programmes.</p>
        <div className="areas-large">
          {['Research Areas', 'Programmes', 'Projects / Research in Motion', 'Publications / Outputs'].map((item) => (
            <IconCard key={item} title={item} body="A connected layer in the Singulary research model." Icon={Layers3} tone="purple" showLink={false} />
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
          <p className="lead">Singulary is public-interest research infrastructure for interpreting signal, institutional context, decision, and consequence.</p>
        </div>
        <div className="about-orbit"><img src={symbol} alt="" /></div>
        <div className="about-cards">
          <IconCard title="Signal" body="We identify weak signals across technology, institutions, society, work, and plausible futures." Icon={Activity} showLink={false} />
          <IconCard title="Interpretation" body="We add context, boundaries, and human judgement so noise becomes research intelligence." Icon={BookOpen} showLink={false} />
          <IconCard title="Decision & Consequence" body="We connect analysis to institutional decisions and the consequences those decisions create." Icon={Target} showLink={false} />
        </div>
        <div className="belief">
          <h2>We believe</h2>
          <p>Clarity is a force multiplier. By understanding signal, interpretation, decision, and consequence, institutions can make better choices and navigate change with greater confidence.</p>
        </div>
      </section>
    </Shell>
  );
}

function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const updateHash = () => setRoute(getRoute());
    addEventListener('hashchange', updateHash);
    return () => removeEventListener('hashchange', updateHash);
  }, []);

  const [, areaSlug] = route.match(/^research-areas\/([^/]+)/) || [];
  const [, programmeSlug] = route.match(/^programmes\/([^/]+)/) || [];
  const [, projectSlug] = route.match(/^projects\/([^/]+)/) || [];

  if (route === '' || route === '/') return <Home />;
  if (route === 'publications') return <Publications />;
  if (route === 'research-areas' || areaSlug) return <ResearchAreas slug={areaSlug} />;
  if (programmeSlug) return <ProgrammeDetail slug={programmeSlug} />;
  if (projectSlug) return <ProjectDetail slug={projectSlug} />;
  if (route === 'methodology') return <Methodology />;
  if (route === 'archive') return <Archive />;
  if (route === 'governance') return <Governance />;
  if (route === 'research-infrastructure') return <ResearchInfrastructure />;
  if (route === 'about') return <About />;
  return <Home />;
}

createRoot(document.getElementById('root')).render(<App />);
