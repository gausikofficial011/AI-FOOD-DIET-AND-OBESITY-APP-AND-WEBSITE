import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Offcanvas, Dropdown, Badge } from 'react-bootstrap';
import { FaAppleAlt, FaUser, FaSignOutAlt, FaBars, FaBell, FaUsers, FaChartLine, FaFileExport, FaQrcode, FaUtensils } from 'react-icons/fa';
import { BiDish} from 'react-icons/bi';
import { useAuth } from '../context/AuthContext';

const ResponsiveNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = React.useState(false);
  const isMobile = window.innerWidth < 768;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-2">
        <Container fluid>
          {isMobile ? (
            <>
              <Button variant="dark" onClick={() => setShowOffcanvas(true)} className="me-2">
                <FaBars />
              </Button>
              <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                <FaAppleAlt className="me-2" />
                <span>AI NutriTrack</span>
              </Navbar.Brand>
            </>
          ) : (
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
              <FaAppleAlt className="me-2" />
              AI NutriTrack
            </Navbar.Brand>
          )}

          {!isMobile && (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard"><FaChartLine className="me-1" /> Dashboard</Nav.Link>
            
{/* {user?.role == "superAdmin" && <Nav.Link as={Link} to="/allusers">
  <FaUsers className="me-2" />All users
</Nav.Link>} */}

{/* // To: */}
{(user?.role === "superAdmin" || user?.role === "admin") && <Nav.Link as={Link} to="/allusers">
  <FaUsers className="me-2" />All users
</Nav.Link>}
               {/* {user?.role=="superAdmin" && <Nav.Link as={Link} to="/allusers">                  <FaUsers className="me-2" />All users</Nav.Link>}   */}
              <Nav.Link as={Link} to="/log-food"><FaAppleAlt className="me-1" /> Log Food</Nav.Link>
              <Nav.Link as={Link} to="/chat"><FaAppleAlt className="me-1" /> Chat</Nav.Link>
              <Nav.Link as={Link} to="/allchats"><FaAppleAlt className="me-1" />All Chats</Nav.Link>
              <Nav.Link as={Link} to="/foods"><BiDish className="me-1"/>Food Database</Nav.Link>
              <Nav.Link as={Link} to="/recipes"><FaUtensils className="me-1" /> Recipes</Nav.Link>
              {/* <Nav.Link as={Link} to="/reports">Reports</Nav.Link> */}
              {/* <Nav.Link as={Link} to="/social"><FaUsers className="me-1" /> Social</Nav.Link> */}
              {/* <Nav.Link as={Link} to="/barcode"><FaQrcode className="me-1" /> Scan</Nav.Link> */}
              <Nav.Link as={Link} to="/export"><FaFileExport className="me-1" /> Export</Nav.Link>
            </Nav>
          )}

          <Nav>
            {user ? (
              <>
            {user?.role=="admin" && <Button variant='warning'>{user.role}</Button> }   
             {user?.role=="superAdmin" && <Button variant='success'>{user.role}</Button> }
                <Nav.Link as={Link} to="/profile">
                  <FaUser className="me-1" /> {user.username}
                </Nav.Link>

                <Button variant="outline-light" onClick={handleLogout}>
                  <FaSignOutAlt />
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><FaAppleAlt className="me-2" />NutriTrack</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" onClick={() => setShowOffcanvas(false)}>
                  <FaUser className="me-2" /> Profile
                </Nav.Link>
                <hr />
                <Nav.Link as={Link} to="/dashboard" onClick={() => setShowOffcanvas(false)}>
                  <FaChartLine className="me-2" /> Dashboard
                </Nav.Link>
             <Nav.Link as={Link} to="/allusers"  onClick={() => setShowOffcanvas(false)}>   
                            <FaUsers className="me-2" />All users
             </Nav.Link>
                <Nav.Link as={Link} to="/log-food" onClick={() => setShowOffcanvas(false)}>
                  <FaAppleAlt className="me-2" /> Log Food
                </Nav.Link>
                <Nav.Link as={Link} to="/foods" onClick={() => setShowOffcanvas(false)}>
                 <BiDish className="me-1"/> Food Database
                </Nav.Link>
                <Nav.Link as={Link} to="/recipes" onClick={() => setShowOffcanvas(false)}>
                  <FaUtensils className="me-2" /> Recipes
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/reports" onClick={() => setShowOffcanvas(false)}>
                  Reports
                </Nav.Link> */}
                <Nav.Link as={Link} to="/social" onClick={() => setShowOffcanvas(false)}>
                  <FaUsers className="me-2" /> Social
                </Nav.Link>
                <Nav.Link as={Link} to="/barcode" onClick={() => setShowOffcanvas(false)}>
                  <FaQrcode className="me-2" /> Scan
                </Nav.Link>
                <Nav.Link as={Link} to="/export" onClick={() => setShowOffcanvas(false)}>
                  <FaFileExport className="me-2" /> Export
                </Nav.Link>
                <hr />
                <Button variant="outline-danger" onClick={handleLogout} className="mt-3">
                  <FaSignOutAlt className="me-2" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={() => setShowOffcanvas(false)}>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" onClick={() => setShowOffcanvas(false)}>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ResponsiveNavbar;