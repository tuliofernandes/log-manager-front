import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Sidebar = () => {
  return (
    <Nav className="flex-column">
      <LinkContainer to="/upload">
        <Nav.Link>Upload</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/view">
        <Nav.Link>View</Nav.Link>
      </LinkContainer>
    </Nav>
  );
};

export default Sidebar;
