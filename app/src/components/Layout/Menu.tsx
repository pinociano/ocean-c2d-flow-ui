import { Navbar, Nav, NavDropdown, Container, Badge } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import UIContext from 'Contexts/UIContext'

function Menu() {
  const { user } = useContext(UIContext)
  const history = useHistory()
  const [active, setActive] = useState<string | undefined>('assets')

  useEffect(() => {
    return history.listen((location) => {
      const path = location.pathname.substring(1)
      setActive(path)
    })
  }, [history])

  const logout = async () => {
    sessionStorage.removeItem('token')
    history?.push('/login')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="">
          <i className="fa-solid fa-earth-europe"></i> Gaia-X Compute to Data Flow
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {user ? (
          <>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav activeKey={active} className="container-fluid">
                <Nav.Item>
                  <Nav.Link
                    eventKey="assets"
                    href=""
                    onClick={(e) => {
                      e.preventDefault()
                      history?.push('/assets')
                    }}>
                    Asset
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    href=""
                    eventKey="marketplace"
                    onClick={(e) => {
                      e.preventDefault()
                      history?.push('/marketplace')
                    }}>
                    Marketplace
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    href=""
                    eventKey="compute"
                    onClick={(e) => {
                      e.preventDefault()
                      history?.push('/compute')
                    }}>
                    Compute
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Nav className="container-fluid">
                <Nav.Item className="ml-auto">
                  <Nav.Link
                    href=""
                    onClick={(e) => {
                      e.preventDefault()
                      logout()
                    }}>
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Navbar.Text>
                <Badge bg="primary">{user.username}</Badge>
              </Navbar.Text>
            </Navbar.Collapse>
          </>
        ) : null}
      </Container>
    </Navbar>
  )
}

export { Menu }

export default Menu
