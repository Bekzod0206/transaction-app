import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="navbar pt-3">
      <div className="container-fluid fs-5 fw-semibold">

        <NavLink to="/" className="">
          Home
        </NavLink>
        <div className="d-flex gap-5">
          <NavLink
            to="/transaction"
            className={({ isActive }) =>
              isActive ? "nav-active" : ""
            }
          >
            Transaction
          </NavLink>
          <NavLink
            to="/graph"
            className={({ isActive }) =>
              isActive ? "nav-active" : ""
            }
          >
            Graph
          </NavLink>
        </div>

      </div>
    </nav>
  )
}

export default Navbar