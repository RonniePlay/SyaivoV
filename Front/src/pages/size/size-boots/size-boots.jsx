import { Link, NavLink } from "react-router-dom";

const SizeBoots = () => {
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
