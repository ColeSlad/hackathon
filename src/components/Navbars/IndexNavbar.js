import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              id="navbar-brand"
            >
              Mythological Tools
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              All the mythological tools you will ever need!
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("about-section")
                      .scrollIntoView({behavior: 'smooth'});
                  }}
                >
                  <i className="now-ui-icons location_map-big"></i>
                  <p>About</p>
                </NavLink>
              </NavItem>
              
              <NavItem>
                <Button
                  className="nav-link btn-neutral"
                  color="info"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("translate")
                      .scrollIntoView({behavior: 'smooth'});
                  }}
                  
                >
                  <i className="now-ui-icons business_globe mr-1"></i>
                  <p>Translate</p>
                </Button>
              </NavItem>
              <NavItem>
                <Button
                  className="nav-link btn-neutral"
                  color="info"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("encyclopedia")
                      .scrollIntoView({behavior: 'smooth'});
                  }}
                >
                  <i className="now-ui-icons education_glasses mr-1"></i>
                  <p>Encyclopedia</p>
                </Button>
              </NavItem>
              <NavItem>
                <Button
                  className="nav-link btn-neutral"
                  color="info"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("battle-section")
                      .scrollIntoView({behavior: 'smooth'});
                  }}
                >
                  <i className="now-ui-icons design_vector mr-1"></i>
                  <p>Battle Simulator</p>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
