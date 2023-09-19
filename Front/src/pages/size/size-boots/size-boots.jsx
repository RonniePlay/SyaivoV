import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";

const SizeBoots = () => {
  useEffect(() => {
    document.title = "Розміри взуття";
  }, []);

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <NavLink to="/size">Розміри</NavLink>
      </div>
    </>
  );
};

export default SizeBoots;
