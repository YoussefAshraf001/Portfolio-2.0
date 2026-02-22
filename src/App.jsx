import { useEffect, useRef, useState } from "react";
import { skillsImage } from "./skill-image";
import { education } from "./data/education";
import { experiences } from "./data/experiences";
import { projects } from "./data/projects";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
  FaLock,
  FaExternalLinkAlt,
  FaFilePdf,
} from "react-icons/fa";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getSkillFallback = (skill) =>
  skill
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const skills = [
  "HTML",
  "JavaScript",
  "TypeScript",
  "Redux",
  "React",
  "NextJS",
  "Vite",
  "Node.js",
  "Express.js",
  "REST API",
  "CSS",
  "Tailwind CSS",
  "Sass",
  "Framer Motion",
  "Firebase",
  "MongoDB",
  "MySQL",
  "Git",
  "GitHub",
  "UI/UX Design",
  "Figma",
  "Adobe XD",
];

const themes = [
  { id: "ocean", label: "Ocean" },
  { id: "aurora", label: "Aurora" },
  { id: "midnight", label: "Midnight" },
  { id: "obsidian", label: "Obsidian" },
  { id: "sunset", label: "Sunset" },
  { id: "forest", label: "Forest" },
  { id: "mono", label: "Mono" },
];

const DEFAULT_THEME = "ocean";
const CV_FILE = "/Youssef-Ashraf-CV.pdf";

const projectTabs = [
  { id: "featured", label: "Featured" },
  { id: "frontend", label: "Front End" },
  { id: "demos", label: "Demos" },
];

const sectionMotion = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.55, ease: [0.2, 0.9, 0.2, 1] },
  },
};

const cardMotion = {
  hidden: { opacity: 0 },
  show: (index) => ({
    opacity: 1,
    transition: {
      delay: index * 0.07,
      duration: 0.45,
      ease: [0.2, 0.8, 0.2, 1],
    },
  }),
};

function LinkIcon({ type }) {
  const iconMap = {
    github: FaGithub,
    linkedin: FaLinkedinIn,
    email: FaEnvelope,
    whatsapp: FaWhatsapp,
  };

  const Icon = iconMap[type];
  if (!Icon) return null;

  return (
    <span className="link-ic" aria-hidden="true">
      <Icon />
    </span>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    const saved = localStorage.getItem("portfolio-theme");
    return saved && themes.some((entry) => entry.id === saved)
      ? saved
      : DEFAULT_THEME;
  });
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [hireTab, setHireTab] = useState("whatsapp");
  const [projectTab, setProjectTab] = useState("featured");
  const [projectVersionByTitle, setProjectVersionByTitle] = useState({});
  const [loadedProjectImages, setLoadedProjectImages] = useState({});
  const [isSkillsHovered, setIsSkillsHovered] = useState(false);
  const [isSkillsDragging, setIsSkillsDragging] = useState(false);
  const [skillLoopDistance, setSkillLoopDistance] = useState(0);
  const skillsTrackRef = useRef(null);
  const skillsX = useMotionValue(0);

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!isHireOpen && !isContactOpen && !isProfileOpen && !isCvOpen) return;
    const onEscape = (event) => {
      if (event.key === "Escape") {
        setIsHireOpen(false);
        setIsContactOpen(false);
        setIsProfileOpen(false);
        setIsCvOpen(false);
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isHireOpen, isContactOpen, isProfileOpen, isCvOpen]);

  const carouselSkills = [...skills, ...skills];

  useEffect(() => {
    const measure = () => {
      if (!skillsTrackRef.current) return;
      setSkillLoopDistance(skillsTrackRef.current.scrollWidth / 2);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [carouselSkills.length]);

  useAnimationFrame((_, delta) => {
    if (!skillLoopDistance || isSkillsHovered || isSkillsDragging) return;
    const speed = 0.032;
    const next = skillsX.get() - delta * speed;
    if (next <= -skillLoopDistance) {
      skillsX.set(next + skillLoopDistance);
      return;
    }
    skillsX.set(next);
  });

  const normalizeSkillsTrack = () => {
    if (!skillLoopDistance) return;
    const current = skillsX.get();
    let normalized = current % skillLoopDistance;
    if (normalized > 0) normalized -= skillLoopDistance;
    skillsX.set(normalized);
  };
  const openHireModal = () => {
    setHireTab("whatsapp");
    setIsHireOpen(true);
  };
  const closeHireModal = () => setIsHireOpen(false);

  const handlePrivateLinkClick = (event, linkValue, label = "link") => {
    if (linkValue !== "private") return;
    event.preventDefault();
    toast(
      ({ closeToast }) => (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="pointer-events-auto w-[min(92vw,360px)] rounded-2xl border border-red-300/50 bg-red-950/90 p-3 text-red-50 shadow-2xl backdrop-blur"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-500 text-white">
              <FaLock className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">Confidential</p>
              <p className="mt-0.5 text-xs leading-5 text-red-100/90">
                {`This ${label} is private.`}
              </p>
            </div>
            <button
              type="button"
              onClick={closeToast}
              className="rounded-full p-1 text-xs text-red-100/70 hover:text-white"
              aria-label="Close toast"
            >
              x
            </button>
          </div>
        </motion.div>
      ),
      {
        position: "top-center",
        autoClose: 2400,
        closeButton: false,
        hideProgressBar: true,
        className: "!bg-transparent !shadow-none !p-0",
      },
    );
  };

  const filteredProjects = projects.filter(
    (project) =>
      Array.isArray(project.categories) &&
      project.categories.includes(projectTab),
  );
  const hasPriorityKeyword = (project) => {
    const value = project.keyword ?? project.keywork;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.trim().length > 0;
    return Boolean(value);
  };
  const orderedProjects = [...filteredProjects].sort(
    (a, b) => Number(hasPriorityKeyword(a)) - Number(hasPriorityKeyword(b)),
  );
  const markProjectImageLoaded = (key) => {
    setLoadedProjectImages((prev) =>
      prev[key] ? prev : { ...prev, [key]: true },
    );
  };

  return (
    <motion.div
      className="page-wrap text-main"
      data-theme={theme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="blob blob-a" />
      <div className="blob blob-b" />

      <header className="site-header sticky top-0 z-30 border-b backdrop-blur-xl">
        <nav className="mx-auto flex w-[92%] max-w-6xl items-center justify-between py-4">
          <a
            href="#top"
            className="text-accent text-2xl font-bold tracking-tight"
          >
            Youssef Ashraf
          </a>
          <div className="hidden gap-7 text-sm font-medium md:flex">
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#skills" className="nav-link">
              Skills
            </a>
            <a href="#projects" className="nav-link">
              Projects
            </a>
            <button type="button" onClick={openHireModal} className="nav-link">
              Contact
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              className="theme-select hidden rounded-full border px-3 py-2 text-xs font-semibold md:block"
              aria-label="Select theme"
            >
              {themes.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={openHireModal}
              className="btn-primary"
            >
              Hire Me
            </button>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto w-[92%] max-w-6xl py-10 md:py-14">
        <motion.section
          className="grid items-center gap-8 md:grid-cols-[1.2fr,1fr]"
          variants={sectionMotion}
          initial="hidden"
          animate="show"
        >
          <div className="space-y-5">
            <p className="text-accent text-xs font-semibold uppercase tracking-[0.22em]">
              Software Engineer Portfolio
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Youssef Ashraf
              <span className="text-accent-soft block">
                Builds products that feel fast and premium.
              </span>
            </h1>
            <p className="text-muted max-w-2xl text-base leading-7">
              Professional software engineer focused on robust frontend systems,
              polished user experiences, and pragmatic delivery.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                className="btn-primary"
                href="mailto:youssefashraf273@gmail.com"
              >
                <LinkIcon type="email" />
                Email
              </a>
              <a
                className="btn-ghost"
                href="https://github.com/YoussefAshraf001"
                target="_blank"
                rel="noreferrer"
              >
                <LinkIcon type="github" />
                GitHub
              </a>
              <a
                className="btn-ghost"
                href="https://www.linkedin.com/in/youssef-ashraf-853a271b4/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkIcon type="linkedin" />
                LinkedIn
              </a>
            </div>
          </div>
          <aside className="panel animate-float">
            <div className="mb-4 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsProfileOpen(true)}
                className="group rounded-2xl transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                aria-label="Expand profile image"
              >
                <img
                  src="/profile.png"
                  alt="Youssef Ashraf"
                  className="profile-img cursor-zoom-in transition duration-300 group-hover:scale-105 group-hover:shadow-xl"
                />
              </button>
              <div>
                <p className="text-accent text-xs uppercase tracking-[0.22em]">
                  What I Bring
                </p>
                <p className="text-main text-sm font-semibold">
                  Front-end Software Engineer
                </p>
              </div>
            </div>
            <div className="capability-grid">
              <article className="capability-card">
                <p className="capability-kicker">Build</p>
                <p className="capability-copy">
                  Clean, scalable React interfaces with reusable component
                  architecture.
                </p>
              </article>
              <article className="capability-card">
                <p className="capability-kicker">Design</p>
                <p className="capability-copy">
                  UI details that improve clarity, conversion, and overall
                  product feel.
                </p>
              </article>
              <article className="capability-card">
                <p className="capability-kicker">Ship</p>
                <p className="capability-copy">
                  Fast implementation cycles with production-ready code and
                  polish.
                </p>
              </article>
              <article className="capability-card">
                <p className="capability-kicker">Available</p>
                <p className="capability-copy">
                  Open to freelance and full-time opportunities.
                </p>
              </article>
            </div>
            <div className="cv-card mt-4">
              <p className="cv-kicker">Curriculum Vitae</p>
              <p className="cv-copy">
                One-page overview of experience, projects, and core technical
                focus.
              </p>
              <div className="cv-actions">
                <a className="btn-ghost cv-btn" href={CV_FILE} download>
                  <FaFilePdf className="h-4 w-4" />
                  Download
                </a>
              </div>
            </div>
          </aside>
        </motion.section>

        <motion.section
          id="about"
          className="mt-20 grid gap-6 md:grid-cols-[1fr,1.3fr] md:items-start"
          variants={sectionMotion}
          initial="hidden"
          animate="show"
        >
          <h2 className="section-title">About</h2>
          <article className="panel">
            <p className="text-muted leading-8">
              I am a professional software engineer with a passion for
              problem-solving and exploring new technologies. As a quick learner
              and enthusiastic programmer, I specialize in JavaScript and enjoy
              working on all aspects of web development. I am always excited to
              tackle new challenges and contribute to building innovative, open
              web solutions.
            </p>
          </article>
        </motion.section>

        <motion.section
          id="skills"
          className="mt-20 grid gap-6 md:grid-cols-[1fr,1.3fr] md:items-start"
          variants={sectionMotion}
          initial="hidden"
          animate="show"
        >
          <h2 className="section-title">Skills</h2>
          <div
            className="panel w-full overflow-hidden"
            aria-label="Skills carousel"
          >
            <motion.div
              ref={skillsTrackRef}
              className="flex w-max gap-3"
              style={{
                x: skillsX,
                cursor: isSkillsDragging ? "grabbing" : "grab",
              }}
              drag="x"
              dragConstraints={{ left: -skillLoopDistance, right: 0 }}
              dragElastic={0.04}
              onHoverStart={() => setIsSkillsHovered(true)}
              onHoverEnd={() => setIsSkillsHovered(false)}
              onDragStart={() => setIsSkillsDragging(true)}
              onDragEnd={() => {
                setIsSkillsDragging(false);
                normalizeSkillsTrack();
              }}
            >
              {carouselSkills.map((skill, index) => {
                const iconSrc = skillsImage(skill);
                return (
                  <motion.span
                    key={`${skill}-${index}`}
                    className="chip whitespace-nowrap"
                    whileHover={{
                      y: -3,
                      scale: 1.04,
                      transition: { duration: 1, ease: "easeOut" },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {iconSrc ? (
                      <img
                        src={iconSrc}
                        alt=""
                        className="skill-svg"
                        loading="lazy"
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="skill-ic">
                        {getSkillFallback(skill)}
                      </span>
                    )}
                    {skill}
                  </motion.span>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="mt-20 grid gap-6 md:grid-cols-[1fr,1.3fr] md:items-start"
          variants={sectionMotion}
          initial="hidden"
          animate="show"
        >
          <h2 className="section-title">Education</h2>
          <div className="education-shell space-y-4">
            {education.map((item, index) => {
              const EduIcon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  className="education-card panel panel-hover relative overflow-hidden"
                  style={{ "--edu-cursor-y": "1.7rem" }}
                  onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const localY = event.clientY - rect.top;
                    event.currentTarget.style.setProperty(
                      "--edu-cursor-y",
                      `${localY}px`,
                    );
                  }}
                  custom={index}
                  variants={cardMotion}
                  initial="hidden"
                  animate="show"
                >
                  <div className="education-row">
                    <div className="education-main">
                      <span
                        className="edu-icon-wrap education-pin"
                        aria-hidden="true"
                      >
                        <EduIcon />
                      </span>
                      {item.logo && (
                        <div className="education-logo-wrap">
                          <img
                            src={item.logo}
                            alt={`${item.org} logo`}
                            className="education-logo"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="education-kicker">Academic Track</p>
                        <h3 className="education-title">{item.title}</h3>
                        <p className="education-org">{item.org}</p>
                      </div>
                    </div>
                    <span className="education-period">{item.period}</span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          className="mt-20 grid gap-6 md:grid-cols-[1fr,1.3fr] md:items-start"
          variants={sectionMotion}
          initial="hidden"
          animate="show"
        >
          <h2 className="section-title">Experience</h2>
          <div className="space-y-3">
            {experiences.map((item, index) => (
              <motion.article
                key={item.company}
                className="panel panel-hover flex items-center gap-4"
                custom={index}
                variants={cardMotion}
                initial="hidden"
                animate="show"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-(--line) bg-white p-2">
                  <img
                    src={item.logo}
                    alt={`${item.company} logo`}
                    className="max-h-10 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-accent text-xs font-semibold uppercase tracking-[0.18em]">
                    {item.period}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                  <p className="text-muted mt-1">{item.company}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="projects-showcase mt-20"
          variants={sectionMotion}
          initial="hidden"
          animate="show"
        >
          <div className="projects-head mb-6">
            <div>
              <h2 className="section-title">Projects</h2>
              <p className="text-muted mt-2 max-w-2xl text-sm leading-6">
                A curated set of product builds, experiments, and interfaces
                with production-minded execution.
              </p>
            </div>
            <div className="projects-count-wrap">
              <p className="projects-count-value">{orderedProjects.length}</p>
              <p className="projects-count-label">In this view</p>
            </div>
          </div>

          <div className="projects-tabs-shell mb-6">
            {projectTabs.map((tab) => {
              const active = projectTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setProjectTab(tab.id)}
                  className={`project-tab-btn ${active ? "is-active" : ""}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={projectTab}
              className="projects-grid grid gap-4 md:grid-cols-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {orderedProjects.length === 0 && (
                <p className="text-muted panel md:col-span-2">
                  No projects in this tab yet.
                </p>
              )}
              {orderedProjects.map((project, index) => {
                const ProjectIcon = project.icon;
                const versions =
                  Array.isArray(project.versions) && project.versions.length > 0
                    ? project.versions
                    : [
                        {
                          id: "default",
                          label: "Current",
                          image: project.image,
                          code: project.code,
                          demo: project.demo,
                        },
                      ];
                const defaultVersionId =
                  versions.find((entry) => entry.latest)?.id ?? versions[0].id;
                const activeVersionId =
                  projectVersionByTitle[project.title] ?? defaultVersionId;
                const activeVersion =
                  versions.find((entry) => entry.id === activeVersionId) ??
                  versions[0];
                const projectImage = activeVersion.image ?? project.image;
                const projectCode = activeVersion.code ?? project.code;
                const projectDemo = activeVersion.demo ?? project.demo;
                const imageStateKey = `${project.title}-${activeVersion.id}`;
                const isImageLoaded = Boolean(
                  loadedProjectImages[imageStateKey],
                );
                const isCodePrivate = projectCode === "private";
                const isDemoPrivate = projectDemo === "private";
                return (
                  <article
                    key={project.title}
                    className="panel panel-hover group relative flex h-136 flex-col overflow-hidden border-[color-mix(in_srgb,var(--accent)_24%,transparent)] p-0 shadow-[0_16px_34px_color-mix(in_srgb,var(--accent)_14%,transparent)] md:h-140"
                  >
                    <div className="relative h-44 w-full overflow-hidden md:h-52">
                      {!isImageLoaded && (
                        <div className="absolute inset-0 animate-pulse bg-[color-mix(in_srgb,var(--accent)_16%,var(--paper))]" />
                      )}
                      <img
                        key={imageStateKey}
                        src={projectImage}
                        alt={`${project.title} preview`}
                        className={`h-full w-full rounded-lg bg-[color-mix(in_srgb,var(--accent)_10%,var(--paper))] object-cover transition-all duration-500 group-hover:scale-110 ${
                          isImageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        loading={index < 4 ? "eager" : "lazy"}
                        fetchPriority={index < 2 ? "high" : "auto"}
                        decoding="async"
                        onLoad={() => markProjectImageLoaded(imageStateKey)}
                        onError={(event) => {
                          event.currentTarget.alt = "";
                          if (event.currentTarget.dataset.fallback !== "1") {
                            event.currentTarget.dataset.fallback = "1";
                            event.currentTarget.src = "/profile.png";
                            return;
                          }
                          markProjectImageLoaded(imageStateKey);
                        }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                      <span
                        className="absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/35 bg-black/45 text-white backdrop-blur-sm"
                        aria-hidden="true"
                      >
                        <ProjectIcon />
                      </span>
                      {versions.length > 1 && (
                        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/45 p-1 backdrop-blur-sm">
                          {versions.map((version) => {
                            const isActive = version.id === activeVersion.id;
                            return (
                              <button
                                key={version.id}
                                type="button"
                                onClick={() =>
                                  setProjectVersionByTitle((prev) => ({
                                    ...prev,
                                    [project.title]: version.id,
                                  }))
                                }
                                className={`rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] transition ${
                                  isActive
                                    ? "bg-white text-slate-900"
                                    : "text-white/90 hover:bg-white/20"
                                }`}
                              >
                                {version.label}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="mb-2 inline-flex rounded-full border border-white/35 bg-black/45 px-2 py-1 text-[0.62rem] font-bold tracking-[0.08em] text-white/95 uppercase">
                          {project.role}
                        </p>
                        <h3 className="text-xl font-black text-white">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[radial-gradient(130%_100%_at_100%_-20%,color-mix(in_srgb,var(--accent)_10%,transparent)_0,transparent_55%),color-mix(in_srgb,var(--panel)_96%,transparent)] p-4 md:p-5">
                      <p className="text-muted line-clamp-3 min-h-[4.95rem] leading-7">
                        {project.desc}
                      </p>
                      <div className="mt-4 flex min-h-[4.05rem] flex-wrap content-start gap-2 overflow-hidden">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="chip chip-quiet text-[0.72rem] font-bold tracking-[0.02em]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {(projectCode || projectDemo) && (
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={`${project.title}-${activeVersion.id}-links`}
                            className="mt-auto flex flex-wrap gap-2 pt-5"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            {projectCode && (
                              <a
                                href={projectCode}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(event) =>
                                  handlePrivateLinkClick(
                                    event,
                                    projectCode,
                                    "repository",
                                  )
                                }
                                className={`btn-ghost ${isCodePrivate ? "opacity-55 saturate-50" : ""}`}
                              >
                                <LinkIcon type="github" />
                                Code
                              </a>
                            )}
                            {projectDemo && (
                              <a
                                href={projectDemo}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(event) =>
                                  handlePrivateLinkClick(
                                    event,
                                    projectDemo,
                                    "demo",
                                  )
                                }
                                className={`btn-primary ${isDemoPrivate ? "opacity-55 saturate-50" : ""}`}
                              >
                                <span
                                  className="inline-flex items-center"
                                  aria-hidden="true"
                                >
                                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
                                </span>
                                Live
                              </a>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </div>
                  </article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.section>
      </main>

      <AnimatePresence>
        {isCvOpen && (
          <motion.div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="CV preview"
            onClick={() => setIsCvOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="modal-panel h-[min(88vh,860px)] w-[min(94vw,980px)] p-2 md:p-3"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 14 }}
              transition={{ duration: 0.24, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <div className="mb-2 flex items-center justify-between gap-3 px-1">
                <h3 className="text-main text-base font-bold md:text-lg">
                  Curriculum Vitae
                </h3>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setIsCvOpen(false)}
                  aria-label="Close CV preview"
                >
                  x
                </button>
              </div>
              <iframe
                title="Youssef Ashraf CV"
                src={CV_FILE}
                className="h-[calc(100%-2.25rem)] w-full rounded-xl border border-(--line) bg-white"
              />
            </motion.div>
          </motion.div>
        )}
        {isProfileOpen && (
          <motion.div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Profile image preview"
            onClick={() => setIsProfileOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-[min(92vw,520px)]"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 14 }}
              transition={{ duration: 0.24, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <button
                type="button"
                className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/45 text-white backdrop-blur-sm"
                onClick={() => setIsProfileOpen(false)}
                aria-label="Close preview"
              >
                x
              </button>
              <img
                src="/profile.png"
                alt="Youssef Ashraf portrait"
                className="h-auto w-full rounded-3xl border border-(--line) bg-(--panel) object-cover shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
        {isHireOpen && (
          <motion.div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Hire me options"
            onClick={closeHireModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="modal-panel"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 14 }}
              transition={{ duration: 0.24, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-main text-xl font-bold">Hire Me</h3>
                <button
                  type="button"
                  className="modal-close"
                  onClick={closeHireModal}
                  aria-label="Close"
                >
                  x
                </button>
              </div>
              <div
                className="mt-4 flex gap-2 rounded-full border p-1"
                style={{ borderColor: "var(--line)" }}
              >
                <button
                  type="button"
                  className={`tab-btn ${hireTab === "whatsapp" ? "active" : ""}`}
                  onClick={() => setHireTab("whatsapp")}
                >
                  <LinkIcon type="whatsapp" />
                  WhatsApp
                </button>
                <button
                  type="button"
                  className={`tab-btn ${hireTab === "email" ? "active" : ""}`}
                  onClick={() => setHireTab("email")}
                >
                  <LinkIcon type="email" />
                  Email
                </button>
              </div>
              <div className="panel mt-4">
                <AnimatePresence mode="wait" initial={false}>
                  {hireTab === "whatsapp" ? (
                    <motion.div
                      key="hire-whatsapp"
                      className="space-y-3"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <p className="text-muted text-sm">
                        Fastest response. Start a direct chat.
                      </p>
                      <a
                        className="btn-primary"
                        href="https://wa.me/+201092201470"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <LinkIcon type="whatsapp" />
                        Open WhatsApp
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hire-email"
                      className="space-y-3"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <p className="text-muted text-sm">
                        For detailed project scope and timelines.
                      </p>
                      <a
                        className="btn-primary"
                        href="mailto:youssefashraf273@gmail.com"
                      >
                        <LinkIcon type="email" />
                        Send Email
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer theme="colored" newestOnTop pauseOnFocusLoss={false} />
    </motion.div>
  );
}

export default App;
