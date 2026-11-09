function Header({ view, setView, darkMode, setDarkMode }) {
  return (
    <header>
      <h1>Program Project Tracker</h1>

      <nav>
        <button onClick={() => setView("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => setView("about")}>
          About
        </button>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
    </header>
  );
}

export default Header;