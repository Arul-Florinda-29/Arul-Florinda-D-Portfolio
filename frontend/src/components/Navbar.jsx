import { useState } from "react";

const links = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Internship", "internship"],
  ["Events", "events"],
  ["Achievements", "achievements"],
  ["Contact", "contact"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="navbar container">
        <a className="brand" href="#home" aria-label="Home">
          AF<span>.</span>
        </a>

        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>

        <div className={`nav-links ${open ? "open" : ""}`}>
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
