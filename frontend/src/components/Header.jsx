import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
//import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleVendorSignIn = () => {
    // Navigate to vendor sign in
  };

  const handleBuyerSignIn = () => {
    // Navigate to buyer sign in
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className='text-white'>
      <Navbar bg='primary' variant='blue' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              {/*<img src={logo} alt='ProShop' />*/}
              Sanaa Art Shop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <NavDropdown
                title={<FaUser />}
                id='signin-options'
                show={showOptions}
                onMouseEnter={() => setShowOptions(true)}
                onMouseLeave={() => setShowOptions(false)}
              >
                <NavDropdown.Item onClick={handleVendorSignIn}>
                  Sign in as Vendor
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleBuyerSignIn}>
                  Sign in as Buyer
                </NavDropdown.Item>
              </NavDropdown>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Category Menu Section */}
      <div className="bg-light py-2">
  <Container>
    <div className="d-flex text-black flex-row overflow-auto gap-4">
      <Link to='/category/crafts' className="nav-link">Crafts</Link>
      <Link to='/category/fashion' className="nav-link">Fashion</Link>
      <Link to='/category/visual-arts' className="nav-link">Visual Arts</Link>
      <Link to='/category/music' className="nav-link">Music</Link>
      <Link to='/category/performers' className="nav-link">Performers</Link>
      <Link to='/category/films' className="nav-link">Films</Link>
      <Link to='/category/theatre-plays' className="nav-link">Theatre plays</Link>
      <Link to='/category/digital-media' className="nav-link">Digital Media</Link>
    </div>
  </Container>
</div>
{/* Category Menu Section */}
    </header>
  );
};

export default Header;
