import React from 'react';
import { Navbar as N, Nav } from 'react-bootstrap';
function NavbarPlayers () {
  return (
    <N bg="primary" variant="dark">
      <N.Brand href="/admin">Dashboard</N.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
        <Nav.Link href="/play">Play</Nav.Link>
      </Nav>
    </N>
  );
}

export default NavbarPlayers;
