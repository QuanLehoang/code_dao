import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  Code2,
  Coffee,
  Copy,
  ExternalLink,
  Github,
  Instagram,
  Mail,
  Menu,
  Moon,
  Palette,
  Rocket,
  Send,
  Sun,
  Video,
  X,
  Youtube,
  Facebook,
  Play,
  CircleDashed,
  Heart,
  Terminal,
  Globe,
  Layers3,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { PortfolioChat } from "@/components/PortfolioChat";
import { AskAiSection } from "@/components/AskAiSection";

import {
  bank,
  journey,
  passions,
  profile,
  projects,
  skills,
  socials,
  type Project,
} from "@/lib/portfolio-data";

import Achievements from "@/components/Achievements";
import ClickIcons from "@/components/ClickIcons";
import avatar from "@/assets/avatar2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${profile.name} — Portfolio học sinh & hành trình sáng tạo`,
      },
      {
        name: "description",
        content: `Portfolio của ${profile.name}: dự án, kỹ năng, đam mê và hành trình học công nghệ.`,
      },
      {
        property: "og:title",
        content: `${profile.name} — Portfolio học sinh`,
      },
      {
        property: "og:description",
        content: `Khám phá dự án, kỹ năng và hành trình sáng tạo của ${profile.name}.`,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: Portfolio,
});

const nav = [
  { label: "Trang chủ", id: "home" },
  { label: "Về mình", id: "about" },
  { label: "Đam mê", id: "passions" },
  { label: "Thành tựu", id: "achievements" },
  { label: "Kỹ năng", id: "skills" },
  { label: "Dự án", id: "projects" },
  { label: "Hành trình", id: "journey" },
  { label: "Liên hệ", id: "contact" },
];

const iconMap: Record<string, typeof Code2> = {
  code: Code2,
  brain: BrainCircuit,
  palette: Palette,
  rocket: Rocket,
  bot: Bot,
  video: Video,
  facebook: Facebook,
  github: Github,
  instagram: Instagram,
  tiktok: Play,
  youtube: Youtube,
  discord: Bot,
};

const filters = [
  "Tất cả",
  "Đang phát triển",
  "Hoàn thành",
  "Ý tưởng",
] as const;

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "socials compact" : "socials"}>
      {socials.map((s) => {
        const Icon = iconMap[s.icon] ?? Globe;

        return (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            title={s.name}
          >
            <Icon size={compact ? 17 : 19} />
          </a>
        );
      })}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={`section-heading reveal ${center ? "center" : ""}`}>
      <span className="eyebrow">
        <span className="eyebrow-dot" /> {eyebrow}
      </span>

      <h2>{title}</h2>

      {text && <p>{text}</p>}
    </div>
  );
}

function Portfolio() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  const [filter, setFilter] =
    useState<(typeof filters)[number]>("Tất cả");

  const [selected, setSelected] = useState<Project | null>(null);

  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");

    if (saved === "dark") {
      setTheme("dark");
    }

    setLoading(true);

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 1650);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark",
    );

    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
      },
    );

    document
      .querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filter]);

  useEffect(() => {
    let frame = 0;

    function updateScrollProgress() {
      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      setScrollProgress(
        max > 0 ? window.scrollY / max : 0,
      );
    }

    function handlePointerMove(event: PointerEvent) {
      window.cancelAnimationFrame(frame);

      frame = window.requestAnimationFrame(() => {
        const x =
          (event.clientX / window.innerWidth - 0.5) * 2;
        const y =
          (event.clientY / window.innerHeight - 0.5) * 2;

        document.documentElement.style.setProperty(
          "--pointer-x",
          x.toFixed(3),
        );
        document.documentElement.style.setProperty(
          "--pointer-y",
          y.toFixed(3),
        );
      });
    }

    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress, {
      passive: true,
    });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(
        "scroll",
        updateScrollProgress,
      );
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );
    };
  }, []);

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(
      `Lời nhắn từ ${name} qua portfolio`,
    );

    const body = encodeURIComponent(
      `${message}\n\nTừ: ${name} (${email})`,
    );

    setFormSent(true);

    window.location.href =
      `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  async function copyAccount() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(
          bank.accountNumber,
        );
      } else {
        const input = document.createElement("textarea");

        input.value = bank.accountNumber;
        input.style.position = "fixed";
        input.style.opacity = "0";

        document.body.appendChild(input);

        input.select();

        const success = document.execCommand("copy");

        input.remove();

        if (!success) {
          throw new Error("Không thể sao chép");
        }
      }

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch {
      setCopied(false);
    }
  }

  const visibleProjects =
    filter === "Tất cả"
      ? projects
      : projects.filter((p) => p.status === filter);

  return (
    <>
      <ClickIcons />

      {loading && (
        <div
          className="loading-screen"
          aria-label="Đang tải portfolio"
        >
          <div className="loading-mark">
            <span className="loading-word" aria-label="HOANG QUAN">
              {"HOANG QUAN".split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  className={letter === " " ? "loading-space" : undefined}
                >
                  {letter}
                </span>
              ))}
            </span>
            <i />
            <b />
            <em />
          </div>

          <div className="loading-dots" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="loading-line">
            <span />
          </div>
        </div>
      )}

      <header className="site-header">
        <div
          className="scroll-progress"
          style={{
            transform: `scaleX(${scrollProgress})`,
          }}
        />

        <div className="container header-inner">
          <a
            href="#home"
            className="brand"
            aria-label="Về trang chủ"
          >
            <span className="brand-symbol">
              {profile.initials}
              <i />
            </span>

            <span className="brand-name">
              portfolio
              <span className="brand-period">.</span>
            </span>
          </a>

          <nav
            className={`nav-links ${menuOpen ? "open" : ""}`}
            aria-label="Điều hướng chính"
          >
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <Button
              variant="ghost"
              size="icon"
              aria-label={
                theme === "light"
                  ? "Chuyển sang giao diện tối"
                  : "Chuyển sang giao diện sáng"
              }
              title={
                theme === "light"
                  ? "Giao diện tối"
                  : "Giao diện sáng"
              }
              onClick={() =>
                setTheme(
                  theme === "light" ? "dark" : "light",
                )
              }
            >
              {theme === "light" ? (
                <Moon size={19} />
              ) : (
                <Sun size={19} />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="mobile-menu-button"
              aria-label={
                menuOpen ? "Đóng menu" : "Mở menu"
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </Button>

            <Button
              asChild
              className="header-contact"
            >
              <a href="#contact">
                Liên hệ
                <ArrowUpRight size={15} />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* =========================
            TRANG CHỦ
        ========================== */}
        <section id="home" className="hero">
          <div
            className="hero-grid"
            aria-hidden="true"
          />

          <div className="container hero-inner">
            <div className="hero-copy">
              <div className="hero-badge">
                <span className="live-dot" />
                {profile.role}
              </div>

              <h1>
                Xin chào,
                <br />
                mình là{" "}
                <span className="headline-accent">
                  {profile.name}
                  <span className="hello-spark">
                    ✳
                  </span>
                </span>
              </h1>

              <p className="hero-subtitle">
                {profile.intro}
                <br />
                <span>
                  Mình học, mình thử và mình tạo ra
                  những điều mới mỗi ngày.
                </span>
              </p>

              <div className="hero-ctas">
                <Button
                  asChild
                  size="lg"
                  className="primary-cta"
                >
                  <a href="#projects">
                    Xem dự án
                    <ArrowUpRight size={18} />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="secondary-cta"
                >
                  <a href="#about">
                    Về mình
                    <ArrowRight size={17} />
                  </a>
                </Button>
              </div>

              <div className="hero-social">
                <span>KẾT NỐI VỚI MÌNH</span>
                <SocialLinks />
              </div>
            </div>

            <div className="hero-visual">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />

              <div className="visual-sticker sticker-top">
                hello, world!
                <span>↗</span>
              </div>
<div className="avatar-frame">
  <img
    src={avatar}
    width={1024}
    height={1024}
    alt="Minh họa avatar học sinh với laptop"
  />
</div>

              <div className="visual-sticker sticker-bottom">
                <span className="sticker-icon">
                  <Code2 size={18} />
                </span>

                <span>
                  Luôn tò mò.
                  <br />
                  <strong>Luôn sáng tạo.</strong>
                </span>
              </div>

              <div className="visual-cross">
                ✳
              </div>
            </div>
          </div>

          <div className="container hero-bottom">
            <a
              href="#about"
              className="scroll-cue"
            >
              Cuộn để khám phá
              <ArrowDown size={16} />
            </a>

            <div className="current-status">
              <span className="status-pulse" />

              <span>
                Đang học{" "}
                <strong>
                  {profile.nowLearning}
                </strong>
              </span>

              <span className="status-divider" />

              <span>
                Đang xây dựng{" "}
                <strong>
                  {profile.nowBuilding}
                </strong>
              </span>
            </div>
          </div>
        </section>

        {/* =========================
            VỀ MÌNH
        ========================== */}
        <section
          id="about"
          className="section about-section"
        >
          <div className="container about-grid">
            <div>
              <SectionHeading
                eyebrow="01 / VỀ MÌNH"
                title={
                  <>
                    Một chút về <em>mình.</em>
                  </>
                }
              />

              <div className="about-note reveal">
                <span className="note-mark">
                  “
                </span>

                <p>{profile.about}</p>

                <span className="handwritten">
                  vẫn đang học mỗi ngày ↗
                </span>
              </div>
            </div>

            <div className="about-right reveal">
              <div className="about-label">
                RẤT VUI VÌ BẠN Ở ĐÂY ✳
              </div>

              <p>
                Mình không có một lộ trình hoàn hảo.
                Mình chỉ có sự tò mò, một chiếc laptop
                và thật nhiều ý tưởng muốn thử.
              </p>

              <div className="about-facts">
                <div>
                  <span>01</span>

                  <div>
                    <strong>Hiện tại</strong>
                    <p>
                      Học sinh & người thích tạo ra
                      sản phẩm
                    </p>
                  </div>
                </div>

                <div>
                  <span>02</span>

                  <div>
                    <strong>Quan tâm</strong>
                    <p>
                      Web, AI, thiết kế và cộng đồng
                    </p>
                  </div>
                </div>

                <div>
                  <span>03</span>

                  <div>
                    <strong>Mục tiêu</strong>
                    <p>
                      Học thật sâu, làm thật vui,
                      chia sẻ thật nhiều
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container stats-row">
            {profile.stats.map((stat, index) => (
              <div
                key={stat.label}
                className="stat reveal"
              >
                <span className="stat-index">
                  0{index + 1} /
                </span>

                <strong>{stat.value}</strong>

                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* =========================
            ĐAM MÊ
        ========================== */}
        <section
          id="passions"
          className="section passions-section"
        >
          <div className="container">
            <SectionHeading
              eyebrow="02 / ĐAM MÊ"
              title={
                <>
                  Những thứ khiến mình{" "}
                  <em>háo hức.</em>
                </>
              }
              text="Có những điều càng tìm hiểu, mình lại càng muốn thử thêm."
            />

            <div className="passion-grid">
              {passions.map((item, index) => {
                const Icon =
                  iconMap[item.icon] ?? Code2;

                return (
                  <article
                    className={`passion-card reveal tone-${item.color}`}
                    key={item.title}
                  >
                    <div className="passion-top">
                      <span className="passion-icon">
                        <Icon
                          size={26}
                          strokeWidth={1.8}
                        />
                      </span>

                      <span className="passion-number">
                        0{index + 1}
                      </span>
                    </div>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                    <div className="interest-meta">
                      <span>{item.interest}</span>
                      <span>✳</span>
                    </div>

                    <div className="interest-track">
                      <span className={item.width} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================
            THÀNH TỰU
        ========================== */}
        <Achievements />

        {/* =========================
            KỸ NĂNG
        ========================== */}
        <section
          id="skills"
          className="section skills-section"
        >
          <div className="container skills-layout">
            <div className="skills-intro">
              <SectionHeading
                eyebrow="04 / KỸ NĂNG"
                title={
                  <>
                    Bộ công cụ{" "}
                    <em>đang lớn dần.</em>
                  </>
                }
                text="Không phải chuyên gia mọi thứ — chỉ là luôn sẵn sàng học thêm điều mới."
              />

              <div className="skills-doodle">
                <Terminal size={34} />

                <span>
                  learn();
                  <br />
                  build();
                  <br />
                  repeat();
                </span>
              </div>
            </div>

            <div className="skill-groups">
              {skills.map((group, index) => (
                <div
                  className="skill-group reveal"
                  key={group.category}
                >
                  <div className="skill-group-heading">
                    <span>0{index + 1}</span>

                    <h3>{group.category}</h3>

                    <ChevronDown size={18} />
                  </div>

                  <div className="skill-items">
                    {group.items.map((item) => (
                      <div key={item.name}>
                        <span>{item.name}</span>

                        <span
                          className={`level ${
                            item.level === "Thành thạo"
                              ? "level-strong"
                              : item.level === "Khá"
                                ? "level-mid"
                                : "level-learning"
                          }`}
                        >
                          {item.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================
            DỰ ÁN
        ========================== */}
        <section
          id="projects"
          className="section projects-section"
        >
          <div className="container">
            <div className="projects-heading">
              <SectionHeading
                eyebrow="05 / DỰ ÁN"
                title={
                  <>
                    Ý tưởng thành{" "}
                    <em>hình hài.</em>
                  </>
                }
                text="Một vài dự án đã làm, đang làm và rất muốn làm."
              />

              <div
                className="project-filters"
                role="group"
                aria-label="Lọc dự án"
              >
                {filters.map((f) => (
                  <Button
                    key={f}
                    variant={
                      filter === f
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </Button>
                ))}
              </div>
            </div>

            <div className="project-grid">
              {visibleProjects.map((project) => (
                <article
                  key={project.id}
                  className="project-card reveal"
                >
                  <div
                    className={`project-art tone-${project.color}`}
                  >
                    <span className="project-art-grid" />

                    <span className="project-glyph">
                      {project.icon}
                    </span>

                    <span className="project-art-index">
                      PROJECT / 0{project.id}
                    </span>
                  </div>

                  <div className="project-body">
                    <div className="project-meta">
                      <span
                        className={`project-status status-${
                          project.status ===
                          "Hoàn thành"
                            ? "done"
                            : project.status ===
                                "Ý tưởng"
                              ? "idea"
                              : "progress"
                        }`}
                      >
                        <span /> {project.status}
                      </span>

                      <span>2026</span>
                    </div>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <div className="project-tags">
                      {project.stack.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="project-actions">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          setSelected(project)
                        }
                      >
                        Xem chi tiết
                        <ArrowUpRight size={16} />
                      </Button>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub ${project.title}`}
                          title="GitHub (liên kết mẫu)"
                        >
                          <Github size={18} />
                        </a>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Demo ${project.title}`}
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================
            HÀNH TRÌNH
        ========================== */}
        <section
          id="journey"
          className="section journey-section"
        >
          <div className="container">
            <SectionHeading
              eyebrow="06 / HÀNH TRÌNH"
              title={
                <>
                  Mỗi năm một{" "}
                  <em>chút xa hơn.</em>
                </>
              }
              text="Chưa phải hành trình dài, nhưng mình tự hào về từng bước nhỏ."
            />

            <div className="timeline">
              {journey.map((item, index) => (
                <article
                  className="timeline-item reveal"
                  key={item.year}
                >
                  <div className="timeline-year">
                    <span className="timeline-node" />
                    {item.year}
                  </div>

                  <div className="timeline-content">
                    <span className="timeline-step">
                      CHƯƠNG 0{index + 1}
                    </span>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                    <div className="timeline-tags">
                      {item.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="timeline-lesson">
                      <BookOpen size={17} />

                      <span>
                        Điều mình học được:{" "}
                        <em>{item.lesson}</em>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <AskAiSection />

        {/* =========================
            ỦNG HỘ
        ========================== */}
        <section
          id="donate"
          className="section donate-section"
        >
          <div className="container donate-layout">
            <div className="donate-copy reveal">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                07 / ỦNG HỘ
              </span>

              <span className="coffee-icon">
                <Coffee size={33} />
              </span>

              <h2>
                Một ly cà phê,
                <br />
                thêm nhiều <em>ý tưởng.</em>
              </h2>

              <p>
                Nếu bạn thấy portfolio hữu ích, bạn có
                thể ủng hộ mình ☕. Dù chỉ là một lời động
                viên, mình cũng rất vui rồi!
              </p>

              <div className="donate-footnote">
                <Heart size={16} />
                Cảm ơn bạn đã ghé qua góc nhỏ này.
              </div>
            </div>

            <div className="bank-card reveal">
              <div className="bank-card-head">
                <span>
                  THÔNG TIN CHUYỂN KHOẢN
                </span>

                <span>↗</span>
              </div>

              <div className="bank-content">
                <div className="qr-placeholder">
                  <div className="qr-pattern">
                    <span>✳</span>
                  </div>

                  <small>
                    Thay bằng QR thật
                  </small>
                </div>

                <div className="bank-details">
                  <div>
                    <small>NGÂN HÀNG</small>
                    <strong>{bank.name}</strong>
                  </div>

                  <div>
                    <small>SỐ TÀI KHOẢN</small>
                    <strong>
                      {bank.accountNumber}
                    </strong>
                  </div>

                  <div>
                    <small>CHỦ TÀI KHOẢN</small>
                    <strong>
                      {bank.accountName}
                    </strong>
                  </div>

                  <div>
                    <small>NỘI DUNG</small>
                    <strong>{bank.content}</strong>
                  </div>
                </div>
              </div>

              <Button
                onClick={copyAccount}
                className="copy-button"
              >
                {copied ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}

                {copied
                  ? "Đã sao chép!"
                  : "Sao chép số tài khoản"}
              </Button>

              <p className="bank-disclaimer">
                Thông tin trên là dữ liệu mẫu, chưa dùng
                để chuyển khoản.
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            LIÊN HỆ
        ========================== */}
        <section
          id="contact"
          className="section contact-section"
        >
          <div className="container contact-layout">
            <div className="contact-copy reveal">
              <SectionHeading
                eyebrow="08 / LIÊN HỆ"
                title={
                  <>
                    Cùng nhau tạo{" "}
                    <em>điều hay ho.</em>
                  </>
                }
                text="Có ý tưởng, câu hỏi, hoặc chỉ muốn chào một tiếng? Mình luôn sẵn lòng lắng nghe."
              />

              <a
                className="contact-email"
                href={`mailto:${profile.email}`}
              >
                <Mail size={22} />

                {profile.email}

                <ArrowUpRight size={20} />
              </a>

              <SocialLinks />
            </div>

            <div className="contact-form-wrap reveal">
              <span className="form-kicker">
                GỬI MỘT LỜI NHẮN ✳
              </span>

              <h3>
                Mình rất muốn nghe từ bạn.
              </h3>

              <form onSubmit={handleContact}>
                <div className="form-row">
                  <label>
                    Họ và tên

                    <input
                      name="name"
                      autoComplete="name"
                      required
                      minLength={2}
                      placeholder="Tên của bạn"
                    />
                  </label>

                  <label>
                    Email

                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="email@example.com"
                    />
                  </label>
                </div>

                <label>
                  Điều bạn muốn nói

                  <textarea
                    name="message"
                    required
                    minLength={10}
                    rows={5}
                    placeholder="Kể mình nghe ý tưởng của bạn..."
                  />
                </label>

                <Button
                  type="submit"
                  className="form-submit"
                >
                  Mở ứng dụng email
                  <Send size={17} />
                </Button>

                {formSent && (
                  <p
                    className="form-feedback"
                    role="status"
                  >
                    Bản nháp đã được chuyển tới ứng dụng
                    email của bạn. Trang này chưa tự gửi
                    thư; nếu ứng dụng không mở, hãy gửi
                    trực tiếp đến{" "}
                    <a
                      href={`mailto:${profile.email}`}
                    >
                      {profile.email}
                    </a>{" "}
                    nhé!
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* =========================
          FOOTER
      ========================== */}
      <footer className="footer">
        <div className="container footer-main">
          <div>
            <a
              href="#home"
              className="brand"
            >
              <span className="brand-symbol">
                {profile.initials}
                <i />
              </span>

              <span className="brand-name">
                portfolio
                <span className="brand-period">
                  .
                </span>
              </span>
            </a>

            <p>
              “Cứ tò mò, cứ thử, rồi sẽ tìm ra cách.”
            </p>
          </div>

          <div className="footer-right">
            <SocialLinks compact />

            <a href="#home">
              Lên đầu trang ↑
            </a>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>
            © 2026 {profile.name}. Được làm bằng sự
            tò mò và một chút cà phê.
          </span>

          <span>
            Designed to keep growing ✳
          </span>
        </div>
      </footer>

      <PortfolioChat />

      {/* =========================
          DIALOG CHI TIẾT DỰ ÁN
      ========================== */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
          }
        }}
      >
        <DialogContent className="project-dialog">
          <DialogHeader>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              DỰ ÁN / 0{selected?.id}
            </span>

            <DialogTitle>
              {selected?.title}
            </DialogTitle>

            <DialogDescription>
              {selected?.description}
            </DialogDescription>
          </DialogHeader>

          <p>{selected?.detail}</p>

          <div className="project-tags">
            {selected?.stack.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="dialog-actions">
            {selected?.github && (
              <Button asChild>
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  GitHub
                  <ArrowUpRight size={15} />
                </a>
              </Button>
            )}

            {selected?.demo && (
              <Button
                asChild
                variant="outline"
              >
                <a
                  href={selected.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe size={16} />
                  Demo
                </a>
              </Button>
            )}

            {!selected?.github &&
              !selected?.demo && (
                <span>
                  Dự án đang ở giai đoạn lên ý tưởng.
                </span>
              )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
