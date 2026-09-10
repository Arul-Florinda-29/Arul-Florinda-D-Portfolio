import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

const emptyProject = {
  title: "",
  description: "",
  technologies: "",
  githubUrl: "",
  liveUrl: ""
};

const emptyAchievement = {
  title: "",
  issuer: "",
  date: "",
  description: ""
};

const emptyEvent = {
  title: "",
  type: "Technical",
  description: "",
  date: ""
};

export default function Admin() {
  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [events, setEvents] = useState([]);
  const [messages, setMessages] = useState([]);

  const [projectForm, setProjectForm] = useState(emptyProject);
  const [achievementForm, setAchievementForm] = useState(emptyAchievement);
  const [eventForm, setEventForm] = useState(emptyEvent);
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState("");

  async function load() {
    try {
      const [p, a, e, m] = await Promise.all([
        api("/projects"),
        api("/achievements"),
        api("/events"),
        api("/contact")
      ]);
      setProjects(p);
      setAchievements(a);
      setEvents(e);
      setMessages(m);
      setStatus("");
    } catch {
      setStatus(
        "Backend unavailable. Start MongoDB and the Express server."
      );
    }
  }

  useEffect(() => {
    load();
  }, []);

  function resetForms() {
    setProjectForm(emptyProject);
    setAchievementForm(emptyAchievement);
    setEventForm(emptyEvent);
    setEditing(null);
  }

  async function submitProject(e) {
    e.preventDefault();

    const payload = {
      ...projectForm,
      technologies: projectForm.technologies
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
    };

    await api(editing ? `/projects/${editing}` : "/projects", {
      method: editing ? "PUT" : "POST",
      body: JSON.stringify(payload)
    });

    resetForms();
    load();
  }

  async function submitAchievement(e) {
    e.preventDefault();

    await api(
      editing ? `/achievements/${editing}` : "/achievements",
      {
        method: editing ? "PUT" : "POST",
        body: JSON.stringify(achievementForm)
      }
    );

    resetForms();
    load();
  }

  async function submitEvent(e) {
    e.preventDefault();

    await api(editing ? `/events/${editing}` : "/events", {
      method: editing ? "PUT" : "POST",
      body: JSON.stringify(eventForm)
    });

    resetForms();
    load();
  }

  async function remove(path, id) {
    if (!window.confirm("Delete this item?")) return;

    await api(`/${path}/${id}`, { method: "DELETE" });
    load();
  }

  function editProject(item) {
    setProjectForm({
      title: item.title,
      description: item.description,
      technologies: (item.technologies || []).join(", "),
      githubUrl: item.githubUrl || "",
      liveUrl: item.liveUrl || ""
    });
    setEditing(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editAchievement(item) {
    setAchievementForm({
      title: item.title,
      issuer: item.issuer || "",
      date: item.date || "",
      description: item.description || ""
    });
    setEditing(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editEvent(item) {
    setEventForm({
      title: item.title,
      type: item.type || "Technical",
      description: item.description || "",
      date: item.date || ""
    });
    setEditing(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Portfolio CMS</p>
            <h1>Admin Dashboard</h1>
            <p>
              Manage projects, achievements, events and contact messages.
            </p>
          </div>
          <Link className="button button-secondary" to="/">
            ← Portfolio
          </Link>
        </div>

        <div className="admin-warning">
          Internship demo dashboard. Authentication is intentionally not
          included yet; protect these routes before public production use.
        </div>

        {status && <p className="admin-status">{status}</p>}

        <div className="admin-tabs">
          {["projects", "achievements", "events", "messages"].map((item) => (
            <button
              className={tab === item ? "active" : ""}
              key={item}
              onClick={() => {
                setTab(item);
                resetForms();
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {tab === "projects" && (
          <div className="admin-grid">
            <form className="admin-form" onSubmit={submitProject}>
              <h2>{editing ? "Edit Project" : "Add Project"}</h2>

              <input
                required
                placeholder="Project title"
                value={projectForm.title}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, title: e.target.value })
                }
              />

              <textarea
                required
                rows="4"
                placeholder="Short description"
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    description: e.target.value
                  })
                }
              />

              <input
                placeholder="Technologies, comma separated"
                value={projectForm.technologies}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    technologies: e.target.value
                  })
                }
              />

              <input
                placeholder="GitHub URL"
                value={projectForm.githubUrl}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    githubUrl: e.target.value
                  })
                }
              />

              <input
                placeholder="Live demo URL"
                value={projectForm.liveUrl}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    liveUrl: e.target.value
                  })
                }
              />

              <div className="admin-form-actions">
                <button className="button button-primary" type="submit">
                  {editing ? "Update Project" : "Add Project"}
                </button>

                {editing && (
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={resetForms}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <AdminList
              items={projects}
              onEdit={editProject}
              onDelete={(id) => remove("projects", id)}
            />
          </div>
        )}

        {tab === "achievements" && (
          <div className="admin-grid">
            <form className="admin-form" onSubmit={submitAchievement}>
              <h2>{editing ? "Edit Achievement" : "Add Achievement"}</h2>

              <input
                required
                placeholder="Certificate / achievement title"
                value={achievementForm.title}
                onChange={(e) =>
                  setAchievementForm({
                    ...achievementForm,
                    title: e.target.value
                  })
                }
              />

              <input
                placeholder="Issuer / organization"
                value={achievementForm.issuer}
                onChange={(e) =>
                  setAchievementForm({
                    ...achievementForm,
                    issuer: e.target.value
                  })
                }
              />

              <input
                placeholder="Date"
                value={achievementForm.date}
                onChange={(e) =>
                  setAchievementForm({
                    ...achievementForm,
                    date: e.target.value
                  })
                }
              />

              <textarea
                rows="4"
                placeholder="Description"
                value={achievementForm.description}
                onChange={(e) =>
                  setAchievementForm({
                    ...achievementForm,
                    description: e.target.value
                  })
                }
              />

              <div className="admin-form-actions">
                <button className="button button-primary" type="submit">
                  {editing ? "Update Achievement" : "Add Achievement"}
                </button>

                {editing && (
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={resetForms}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <AdminList
              items={achievements}
              onEdit={editAchievement}
              onDelete={(id) => remove("achievements", id)}
            />
          </div>
        )}

        {tab === "events" && (
          <div className="admin-grid">
            <form className="admin-form" onSubmit={submitEvent}>
              <h2>{editing ? "Edit Event" : "Add Event"}</h2>

              <input
                required
                placeholder="Event title"
                value={eventForm.title}
                onChange={(e) =>
                  setEventForm({ ...eventForm, title: e.target.value })
                }
              />

              <select
                value={eventForm.type}
                onChange={(e) =>
                  setEventForm({ ...eventForm, type: e.target.value })
                }
              >
                <option>Technical</option>
                <option>Non-Technical</option>
                <option>Hackathon</option>
              </select>

              <textarea
                rows="4"
                placeholder="Description"
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    description: e.target.value
                  })
                }
              />

              <input
                placeholder="Date"
                value={eventForm.date}
                onChange={(e) =>
                  setEventForm({ ...eventForm, date: e.target.value })
                }
              />

              <div className="admin-form-actions">
                <button className="button button-primary" type="submit">
                  {editing ? "Update Event" : "Add Event"}
                </button>

                {editing && (
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={resetForms}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <AdminList
              items={events}
              onEdit={editEvent}
              onDelete={(id) => remove("events", id)}
            />
          </div>
        )}

        {tab === "messages" && (
          <div className="message-list">
            {messages.length ? (
              messages.map((message) => (
                <article className="message-card" key={message._id}>
                  <div>
                    <h3>{message.name}</h3>
                    <a href={`mailto:${message.email}`}>
                      {message.email}
                    </a>
                  </div>
                  <p>{message.message}</p>
                  <small>
                    {new Date(message.createdAt).toLocaleString()}
                  </small>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">0</div>
                <div>
                  <h3>No contact messages yet.</h3>
                  <p>
                    Messages submitted through the portfolio form will appear
                    here.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function AdminList({ items, onEdit, onDelete }) {
  return (
    <div className="admin-list">
      {items.length ? (
        items.map((item) => (
          <article key={item._id}>
            <div>
              <span>{item.type || item.issuer || "Portfolio item"}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <div className="admin-item-actions">
              <button onClick={() => onEdit(item)}>Edit</button>
              <button onClick={() => onDelete(item._id)}>Delete</button>
            </div>
          </article>
        ))
      ) : (
        <p className="admin-empty">No records yet.</p>
      )}
    </div>
  );
}
