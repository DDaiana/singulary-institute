import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  ArrowRight,
  BookOpen,
  CircleDot,
  Cpu,
  Crosshair,
  FileText,
  Globe2,
  Landmark,
  Layers3,
  Network,
  ShieldCheck,
  Target,
  UserRound,
  Users,
} from 'lucide-react';
import registry from '../../../content/content-registry.json';
import './styles.css';

const nav = ['Research', 'Publications', 'Research Areas', 'Methodology', 'Archive', 'About'];
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

function slugify(value) {
  return value.toLowerCase().replaceAll('&', 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function useContent() {
  return useMemo(() => {
    const areas = registry.research_areas.map((area) => ({ ...area, ...areaMeta[area.title] }));
    const programmes = registry.programmes;
    const publications = registry.publications.map((publication) => ({
      ...publication,
      programmeData: programmes.find((programme) => programme.title === publication.programme),
      areaData: areas.find((area) => area.title === publication.research_area),
    }));

    return {
      areas,
      programmes,
      publications,
      archive: publications.filter((publication) => ['published', 'approved', 'review', 'draft'].includes(publication.status)),
    };
  }, []);
}

function Logo() {
  return (
    <a className="brand" href="#research" aria-label="Singulary Institute home">
      <img src={symbol} alt="" />
      <span>Singulary <em>Institute</em></span>
    </a>
  );
}

function Header({ active }) {
  return (
    <header className="header">
      <Logo />
      <nav aria-label="Primary navigation">
        {nav.map((item) => {
          const slug = slugify(item);
          return (
            <a key={item} className={active === slug ? 'active' : ''} href={`#${slug}`}>
              {item}
            </a>
          );
        })}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Logo />
        <p>Independent research infrastructure for the systems shaping our collective future.</p>
        <small>© 2026 Singulary Institute</small>
      </div>
      <div>
        <h4>Explore</h4>
        <a href="#research">Research</a>
        <a href="#publications">Publications</a>
        <a href="#research-areas">Research Areas</a>
        <a href="#archive">Archive</a>
      </div>
      <div>
        <h4>Institute</h4>
        <a href="#methodology">Methodology</a>
        <a href="#about">About</a>
        <a href="#research">Programmes</a>
      </div>
      <div className="subscribe">
        <h4>Stay informed</h4>
        <p>Receive research briefs and institutional signals on AI, governance, society, work, and futures.</p>
        <div className="subscribe-row">
          <input placeholder="Enter your email" aria-label="Email address" />
          <button>Subscribe <ArrowRight size={16} /></button>
        </div>
        <div className="legal">
          <a href="#methodology">Transparency</a>
          <a href="#methodology">AI Use</a>
          <a href="#about">Contact</a>
        </div>
      </div>
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

function formatDate(value) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
}

function IconCard({ title, body, Icon = FileText, tone = 'blue', meta, href = '#research-areas' }) {
  return (
    <article className={`card tone-${tone}`}>
      <div className="icon"><Icon size={26} /></div>
      {meta ? <small>{meta}</small> : null}
      <h3>{title}</h3>
      <p>{body}</p>
      <a href={href}>Explore <ArrowRight size={16} /></a>
    </article>
  );
}

function Hero() {
  const orbit = [
    ['Systems Perspective', 'We examine interactions that shape institutional outcomes.', Layers3, 'top'],
    ['Signal Detection', 'We identify patterns in noise, policy, markets, and behavior.', Activity, 'left'],
    ['Human Interpretation', 'We add context, nuance, and accountable judgment.', UserRound, 'right'],
    ['Meaning & Consequence', 'We connect signals to decisions, risk, and public action.', Target, 'bottom'],
  ];

  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Research Intelligence</p>
        <h1>Interpreting the systems shaping AI, institutions, and <span>decision-making.</span></h1>
        <p className="lead">Singulary Institute translates emerging signals into decision-ready research, publication infrastructure, and grant-ready programmes for public-interest analysis.</p>
        <a className="text-cta" href="#research-areas">Our Focus <ArrowRight size={18} /></a>
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
          <a href="#publications">View publications <ArrowRight size={18} /></a>
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
              href="#publications"
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
          <a href="#archive">Open archive <ArrowRight size={18} /></a>
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
          <a href="#research-areas">View all areas <ArrowRight size={18} /></a>
        </div>
        <div className="area-grid">
          {areas.map((area) => <IconCard key={area.slug} title={area.title} body={area.summary} Icon={area.Icon} tone={area.tone} href="#research-areas" />)}
        </div>
      </section>
    </Shell>
  );
}

function Publications() {
  const { publications } = useContent();
  const counts = publications.reduce((acc, item) => ({ ...acc, [item.type]: (acc[item.type] || 0) + 1 }), {});

  return (
    <Shell active="publications">
      <section className="page two-col">
        <div>
          <h1>Research publications</h1>
          <p className="lead">A content-driven publication surface for frameworks, briefs, signal reports, essays, and guides.</p>
          <div className="filter">
            <button>All Publications <span>{publications.length}</span></button>
            {Object.entries(counts).map(([type, count]) => <button key={type}>{typeLabels[type] || type} <span>{count}</span></button>)}
          </div>
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
    <article className="pub">
      <div className={`thumb t${img % 3}`} />
      <div>
        <small>{publication.research_area}</small>
        <h3>{publication.title}</h3>
        <p>{publication.summary}</p>
        <span>{publication.programme} · {typeLabels[publication.type] || publication.type} · {formatDate(publication.date)}{compact ? '' : ` · ${publication.status}`}</span>
      </div>
      <ArrowRight size={18} />
    </article>
  );
}

function ResearchAreas() {
  const { areas, publications } = useContent();
  return (
    <Shell active="research-areas">
      <section className="page">
        <h1>Research areas</h1>
        <p className="lead">The critical domains where technology, institutions, society, work, and plausible futures intersect.</p>
        <div className="areas-large">
          {areas.map((area) => {
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
    <Shell active="methodology">
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
    <Shell active="archive">
      <section className="page two-col archive">
        <div>
          <h1>Archive</h1>
          <p className="lead">A repository-backed timeline of publications, draft projects, programme outputs, and institutional signals.</p>
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
          <h1>About<br />Singulary Institute</h1>
          <p className="lead">The website is the public interface. The repository is the institution: research infrastructure, content system, publication pipeline, contributor system, governance, and public website.</p>
        </div>
        <div className="about-orbit"><img src={symbol} alt="" /></div>
        <div className="about-cards">
          <IconCard title="Research Infrastructure" body="Identity, governance, intelligence pipeline, theory, operations, publication, and programmes." Icon={Network} href="#methodology" />
          <IconCard title="Publication System" body="Structured content registry with linked programmes, research areas, publication states, and archive surfacing." Icon={BookOpen} href="#publications" />
          <IconCard title="Contributor System" body="Guidelines and editorial standards for grant-ready public-interest research collaboration." Icon={Users} href="#methodology" />
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

  if (hash.includes('publications')) return <Publications />;
  if (hash.includes('research-areas')) return <ResearchAreas />;
  if (hash.includes('methodology')) return <Methodology />;
  if (hash.includes('archive')) return <Archive />;
  if (hash.includes('about')) return <About />;
  return <Research />;
}

createRoot(document.getElementById('root')).render(<App />);
