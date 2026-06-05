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
  'working-paper': 'Working Paper',
  'research-brief': 'Research Brief',
  'methodology-note': 'Methodology Note',
  explainer: 'Explainer',
};

const typeOrder = ['framework', 'working-paper', 'research-brief', 'methodology-note', 'explainer'];

function useContent() {
  return useMemo(() => {
    const areas = registry.researchAreas.map((area) => ({ ...area, ...areaMeta[area.title] }));
    const areaBySlug = Object.fromEntries(areas.map((area) => [area.slug, area]));
    const publications = registry.publications
      .filter((publication) => publication.public)
      .map((publication) => ({
        ...publication,
        href: `#/publications/${publication.slug}`,
        areaData: areaBySlug[publication.researchArea],
      }));
    const availableTypes = new Set(publications.map((publication) => publication.type));
    const categories = typeOrder
      .filter((type) => availableTypes.has(type))
      .map((type) => registry.publicationCategories.find((category) => category.type === type) || {
        type,
        slug: type,
        title: typeLabels[type],
        summary: `${typeLabels[type]} published by Singulary Research.`,
      });

    return { areas, publications, categories, areaBySlug };
  }, []);
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
      <p>Receive research briefs and public outputs from Singulary Research.</p>
      <div className="subscribe-row">
        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" aria-label="Email address" />
        <button type="submit">Subscribe <ArrowRight size={16} /></button>
      </div>
      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
    </form>
  );
}

function Footer() {
  const { categories } = useContent();
  return (
    <footer className="footer">
      <div>
        <Logo />
        <p>Structured public research outputs on AI, institutions, risk, and decision-making.</p>
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
        <h4>Publications</h4>
        {categories.map((category) => (
          <a key={category.type} href={`#/publications/category/${category.type}`}>{category.title}</a>
        ))}
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

function IconCard({ title, body, Icon, tone = 'blue', href }) {
  return (
    <article className={`card tone-${tone}`}>
      <div className="icon"><Icon size={26} /></div>
      <h3>{title}</h3>
      <p>{body}</p>
      {href ? <a href={href}>Explore <ArrowRight size={16} /></a> : null}
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
        <p className="lead">Singulary publishes structured research outputs on AI, institutions, risk, and decision-making.</p>
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
  const { areas, publications } = useContent();
  const latest = publications.slice(0, 6);
  return (
    <Shell active="home">
      <Hero />
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Research Areas</p>
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
            <p className="eyebrow">LATEST PUBLICATIONS</p>
          </div>
        </div>
        <div className="list compact-list">
          {latest.map((publication, index) => <Publication key={publication.slug} publication={publication} img={index} />)}
        </div>
      </section>
    </Shell>
  );
}

function PublicationFilters({ publications }) {
  const counts = publications.reduce((acc, item) => ({ ...acc, [item.type]: (acc[item.type] || 0) + 1 }), {});
  const entries = typeOrder.filter((type) => counts[type]).map((type) => [type, counts[type]]);

  return (
    <div className="filter">
      <a className="filter-link active-filter" href="#/publications">All <span>{publications.length}</span></a>
      {entries.map(([type, count]) => (
        <a className="filter-link" href={`#/publications/category/${type}`} key={type}>{typeLabels[type]} <span>{count}</span></a>
      ))}
    </div>
  );
}

function Publications() {
  const { publications, categories } = useContent();
  return (
    <Shell active="publications">
      <section className="page two-col">
        <div>
          <h1>Research publications</h1>
          <p className="lead">Public frameworks, working papers, briefs, methodology notes, and explainers from Singulary Research.</p>
          <PublicationFilters publications={publications} />
          <div className="category-stack">
            {categories.map((category) => (
              <a href={`#/publications/category/${category.type}`} key={category.slug}>
                <b>{category.title}</b>
                <span>{category.summary}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="list">
          {publications.map((publication, index) => <Publication key={publication.slug} publication={publication} img={index} />)}
        </div>
      </section>
    </Shell>
  );
}

function Publication({ publication, img }) {
  return (
    <a className="pub" href={publication.href}>
      <div className={`thumb t${img % 3}`} />
      <div>
        <small>{typeLabels[publication.type]} · {publication.publicationStatus}</small>
        <h3>{publication.title}</h3>
        <p>{publication.summary}</p>
        <span>{publication.areaData?.title}</span>
      </div>
      <ArrowRight size={18} />
    </a>
  );
}

function PublicationCategory({ type }) {
  const { publications, categories } = useContent();
  const category = categories.find((item) => item.type === type);
  const filtered = publications.filter((publication) => publication.type === type);

  if (!category) return <Publications />;

  return (
    <Shell active="publications">
      <section className="page">
        <p className="eyebrow">Publication Category</p>
        <h1>{category.title}</h1>
        <p className="lead">{category.summary}</p>
        <div className="list programme-projects">
          {filtered.map((publication, index) => <Publication key={publication.slug} publication={publication} img={index} />)}
        </div>
      </section>
    </Shell>
  );
}

function PublicationDetail({ slug }) {
  const { publications } = useContent();
  const publication = publications.find((item) => item.slug === slug);

  if (!publication) return <Publications />;

  return (
    <Shell active="publications">
      <section className="page programme-detail">
        <p className="eyebrow">{typeLabels[publication.type]}</p>
        <h1>{publication.title}</h1>
        <p className="lead">{publication.summary}</p>
        <div className="detail-grid">
          <article className="method-card">
            <h3>Type</h3>
            <p>{typeLabels[publication.type]}</p>
          </article>
          <article className="method-card">
            <h3>Research area</h3>
            <p>{publication.areaData?.title}</p>
          </article>
          <article className="method-card">
            <h3>Status</h3>
            <p>{publication.publicationStatus}</p>
          </article>
          <article className="method-card">
            <h3>Classification</h3>
            <p>{publication.classification}</p>
          </article>
        </div>
        <article className="method-card programme-projects">
          <h3>Purpose</h3>
          <p>{publication.purpose}</p>
          <h3>What this output will cover</h3>
          <p>{publication.coverage}</p>
          <h3>Limitations</h3>
          <p>{publication.limitations}</p>
        </article>
      </section>
    </Shell>
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
        <p className="lead">Public thematic lenses for Singulary publications and research outputs.</p>
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
  const { publications } = useContent();
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
        <ContentSection eyebrow="Public Outputs" title="Publications in this area">
          <div className="list programme-projects">
            {relatedPublications.length ? relatedPublications.map((publication, index) => <Publication key={publication.slug} publication={publication} img={index} />) : <EmptyState text="No public output is currently listed for this area." />}
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

function About() {
  return (
    <Shell active="about">
      <section className="page about">
        <div>
          <h1>About<br />Singulary Research</h1>
          <p className="lead">Singulary publishes structured research outputs on signal, institutional context, decision-making, and public-interest technology questions.</p>
        </div>
        <div className="about-orbit"><img src={symbol} alt="" /></div>
        <div className="about-cards">
          <IconCard title="Signal" body="We identify weak signals across technology, institutions, society, work, and plausible futures." Icon={Activity} />
          <IconCard title="Interpretation" body="We add context, boundaries, and human judgement so noise becomes research intelligence." Icon={BookOpen} />
          <IconCard title="Decision & Consequence" body="We connect analysis to institutional decisions and the consequences those decisions create." Icon={Target} />
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
    const updateHash = () => {
      setRoute(getRoute());
      requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0 }));
    };
    addEventListener('hashchange', updateHash);
    return () => removeEventListener('hashchange', updateHash);
  }, []);

  const [, areaSlug] = route.match(/^research-areas\/([^/]+)/) || [];
  const [, publicationCategory] = route.match(/^publications\/category\/([^/]+)/) || [];
  const [, publicationSlug] = route.match(/^publications\/([^/]+)/) || [];

  if (route === '' || route === '/') return <Home />;
  if (route === 'publications') return <Publications />;
  if (publicationCategory) return <PublicationCategory type={publicationCategory} />;
  if (publicationSlug) return <PublicationDetail slug={publicationSlug} />;
  if (route === 'research-areas' || areaSlug) return <ResearchAreas slug={areaSlug} />;
  if (route.startsWith('programmes') || route.startsWith('projects')) return <ResearchAreas />;
  if (route === 'about') return <About />;
  return <Home />;
}

createRoot(document.getElementById('root')).render(<App />);
