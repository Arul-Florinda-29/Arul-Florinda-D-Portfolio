export default function ProjectCard({ project, index }) {
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : [];

  return (
    <article className="project-card">
      <div className="project-topline">
        <span className="project-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>PROJECT</span>
      </div>

      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <div className="tags">
        {technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>

      <div className="project-actions">
        {project.githubUrl ? (
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        ) : (
          <span className="disabled-link">GitHub — add link</span>
        )}

        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Live Demo ↗
          </a>
        ) : (
          <span className="disabled-link">Demo — add link</span>
        )}
      </div>
    </article>
  );
}
