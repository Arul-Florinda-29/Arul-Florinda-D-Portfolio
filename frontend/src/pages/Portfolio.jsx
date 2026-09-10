import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import { api } from "../api";
import { fallbackProjects, profile } from "../data";

export default function Portfolio() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [achievements, setAchievements] = useState([]);
  const [events, setEvents] = useState([
    {
      _id: "fallback-event",
      title: "Hackathon Participation",
      type: "Hackathon",
      description:
        "Contributed to website front-end development, idea presentation and team collaboration."
    }
  ]);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [p, a, e] = await Promise.all([
          api("/projects"),
          api("/achievements"),
          api("/events")
        ]);

        if (p.length) setProjects(p);
        setAchievements(a);
        if (e.length) setEvents(e);
      } catch {
        // Fallback content keeps the portfolio viewable if the backend is offline.
      }
    }

    loadData();
  }, []);

  async function submitContact(event) {
    event.preventDefault();
    setStatus("Sending...");

    try {
      await api("/contact", {
        method: "POST",
        body: JSON.stringify(contact)
      });

      setContact({ name: "", email: "", message: "" });
      setStatus("Message sent successfully.");
    } catch {
      setStatus(
        "Could not connect to the backend. Start the Express server and MongoDB."
      );
    }
  }

  return (
    <>
      <Navbar />

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-tech-image">
                <img
                   src="/images/code%20image.png"
                   alt=""
                 />
            </div>
              <p className="eyebrow">Portfolio · Full-Stack Internship Project</p>

              <h1>
                Hi, I&apos;m <span>{profile.name}</span>
              </h1>

              <h2>{profile.role}</h2>
              <p className="hero-headline">{profile.headline}</p>
              <p className="hero-intro">{profile.intro}</p>

              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  View My Projects
                </a>
                <a className="button button-secondary" href="#contact">
                  Contact Me
                </a>
              </div>
            </div>

            <aside className="hero-panel">
              <img
                src="/images/profile.jpg"
                alt="Arul Florinda D"
                className="profile-image"
              />

              <p className="panel-label">CURRENT FOCUS</p>

              <div className="focus-line">
                <span>01</span>
                <p>Full-Stack Development</p>
              </div>
              <div className="focus-line">
                <span>02</span>
                <p>Practical Project Building</p>
              </div>
              <div className="focus-line">
                <span>03</span>
                <p>Continuous Learning</p>
              </div>

              <div className="availability">
                <i />
                Learning · Building · Improving
              </div>
            </aside>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <SectionTitle
              eyebrow="01 · About"
              title="Curious by nature. Practical by approach."
            />

            <div className="about-layout">
              <div className="about-copy">
                <p>
                  I’m an aspiring Software Developer with an interest in coding,
                  Full-Stack Development, and technology. I enjoy participating
                  in both technical and non-technical events, where I get
                  opportunities to explore new ideas, improve my skills, and work
                  with others.
                </p>
                <p>
                  I’m always interested in learning new skills and technologies
                  and applying what I learn through projects and practical
                  experiences. I’m a quick learner, good team member, and willing
                  to take on new challenges.
                </p>
              </div>

              <div className="about-principles">
                {[
                  ["01", "LEARN", "Always exploring new skills, technologies and ideas."],
                  ["02", "PARTICIPATE", "Enjoy taking part in technical and non-technical events."],
                  ["03", "BUILD", "Turn ideas and learning into practical projects."]
                ].map(([number, title, text]) => (
                  <div className="principle" key={title}>
                    <span>{number}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section muted-section" id="skills">
          <div className="container">
            <SectionTitle
              eyebrow="02 · Skills"
              title="A growing technical toolkit."
              text="Core skills I use today, plus full-stack technologies I am actively learning through internship work."
            />

            <div className="skills-layout">
              <div className="skill-column">
                <h3>Current Skills</h3>

                <div className="skill-row">
                  <span>Programming</span>
                  <p>Python · C · C++ <small>(Basic)</small></p>
                </div>
                <div className="skill-row">
                  <span>Web</span>
                  <p>HTML · CSS · JavaScript <small>(Basic)</small></p>
                </div>
                <div className="skill-row">
                  <span>Tools</span>
                  <p>GitHub <small>(Basic)</small> · Canva</p>
                </div>
              </div>

              <div className="learning-box">
                <p className="panel-label">CURRENTLY EXPLORING</p>
                <h3>Full-Stack Internship Stack</h3>
                <p>
                  React.js, Node.js, Express.js, MongoDB and REST APIs are being
                  learned and applied through this internship project.
                </p>

                <div className="learning-tags">
                  {["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"].map(
                    (item) => (
                      <span key={item}>{item}</span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <SectionTitle
              eyebrow="03 · Projects"
              title="Work that turns learning into practice."
              text="Selected academic, personal and project work."
            />

            <div className="project-grid">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project._id || project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section internship-section" id="internship">
          <div className="container internship-grid">
            <div>
              <p className="eyebrow">04 · Internship</p>
              <h2>Full Stack Development Intern</h2>
              <p className="internship-org">
                Thiranex – Skill Development &amp; Future Tech
              </p>
              <p className="internship-copy">
                This internship involves building a full-stack personal portfolio
                and gaining practical experience connecting the frontend, backend,
                REST APIs and database into one deployable project.
              </p>
            </div>

            <div className="internship-list">
              {[
                "React.js",
                "Node.js",
                "Express.js",
                "MongoDB",
                "REST APIs",
                "Frontend and backend integration",
                "Database integration",
                "Deployment"
              ].map((item) => (
                <div key={item}>
                  <span>↗</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section muted-section" id="events">
          <div className="container">
            <SectionTitle
              eyebrow="05 · Events"
              title="Learning beyond the classroom."
              text="Technical and non-technical participation helps me practice teamwork, communication and idea presentation."
            />

            <div className="timeline">
              {events.map((event) => (
                <article
                  className="timeline-item"
                  key={event._id || event.title}
                >
                  <div className="timeline-marker" />
                  <div>
                    <span className="event-type">
                      {event.type || "Event"}
                    </span>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    {event.date && <small>{event.date}</small>}
                  </div>
                </article>
              ))}

              <article className="timeline-item placeholder-item">
                <div className="timeline-marker" />
                <div>
                  <span className="event-type">Future Participation</span>
                  <h3>Add future technical or non-technical events</h3>
                  <p>Use the admin dashboard to keep this section updated.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="achievements">
          <div className="container">
            <SectionTitle
              eyebrow="06 · Achievements"
              title="Progress worth recording."
              text="Highlights of my learning, participation, and accomplishments."
            />

            {achievements.length ? (
              <div className="achievement-grid">
                {achievements.map((item) => (
                  <article className="achievement-card" key={item._id}>
                    <span>ACHIEVEMENT</span>
                    <h3>{item.title}</h3>
                    {item.issuer && <p>{item.issuer}</p>}
                    {item.description && <p>{item.description}</p>}
                    {item.date && <small>{item.date}</small>}
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">+</div>
                <div>
                  <h3>Achievements & Activities</h3>

<div className="achievement-list">
  <div className="achievement-item">
    <h4>🏆 Hackathon</h4>
    <p>
      Participated in hackathon activities with contributions to
      front-end development and idea presentation.
    </p>
  </div>

  <div className="achievement-item">
    <h4>📜 Certifications</h4>
    <p>
      Completed certifications and learning activities to strengthen
      technical skills.
    </p>
  </div>

  <div className="achievement-item">
    <h4>🏅 Sports & Games</h4>
    <p>
      Participated in games and sports activities, building teamwork
      and discipline.
    </p>
  </div>

  <div className="achievement-item">
    <h4>💡 Learning & Growth</h4>
    <p>
      Always exploring new skills, technologies, and opportunities
      to learn.
    </p>
  </div>
</div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="section education-section">
          <div className="container">
            <SectionTitle
              eyebrow="07 · Education"
              title="Academic foundation."
            />

            <div className="education-row">
              <div>
                <span>10th Standard</span>
                <h3>ICSE School</h3>
                <p>80.5%</p>
              </div>
              <div>
                <span>12th Standard</span>
                <h3>Matric Higher Secondary</h3>
                <p>89.5%</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">08 · Contact</p>
              <h2>Have an opportunity or project in mind?</h2>
              <p className="contact-copy">
                I’m open to learning, collaboration and opportunities where I
                can contribute and continue developing my skills.
              </p>

              <div className="social-links">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
                <a href={`mailto:${profile.email}`}>
                  {profile.email} ↗
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={submitContact}>
              <label>
                Name
                <input
                  required
                  value={contact.name}
                  onChange={(e) =>
                    setContact({ ...contact, name: e.target.value })
                  }
                  placeholder="Your name"
                />
              </label>

              <label>
                Email
                <input
                  required
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Message
                <textarea
                  required
                  rows="5"
                  value={contact.message}
                  onChange={(e) =>
                    setContact({ ...contact, message: e.target.value })
                  }
                  placeholder="Write your message..."
                />
              </label>

              <button className="button button-primary" type="submit">
                Submit
              </button>

              {status && <p className="form-status">{status}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <p>© 2026 {profile.name}</p>
          <p>Full-Stack Development internship project.</p>
          <a href="/admin">Admin</a>
        </div>
      </footer>
    </>
  );
}
