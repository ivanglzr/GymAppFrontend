import "@/css/Aside.css";

export default function Aside() {
  return (
    <aside id="aside">
      <nav className="aside-nav">
        <a href="#">
          <i className="fa-solid fa-house fa-2xl"></i>
        </a>
        <a href="#">
          <i className="fa-solid fa-clipboard-list fa-2xl"></i>
        </a>
        <a href="#">
          <i className="fa-solid fa-dumbbell fa-2xl"></i>
        </a>
        <a href="#">
          <i className="fa-solid fa-user fa-2xl"></i>
        </a>
        <a href="#">
          <i className="fa-solid fa-gear fa-2xl"></i>
        </a>
      </nav>
    </aside>
  );
}
