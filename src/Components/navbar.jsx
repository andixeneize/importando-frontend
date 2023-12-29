import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "@styles/navbar.module.css";




function BarraNav() {
  return (
      <Navbar>
        <Container className={styles.container}>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className={styles.nav}>
            <Nav.Link className={styles.option} href="/despacho">Despacho</Nav.Link>
            <Nav.Link className={styles.option} href="/consulta">Consulta</Nav.Link>
            <Nav.Link className={styles.option} href="/cobros">Cobros</Nav.Link>
            <Nav.Link className={styles.option} href="/login">Login</Nav.Link>
            <Nav.Link className={styles.option} href="/bultos">Bultos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default BarraNav;