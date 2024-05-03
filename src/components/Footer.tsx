import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1E1E1F' }}>
      <Container>
        <Row>
          <Col className="text-center py-3" style={{ color: "white" }}>
            © 2024 Sellegate, Inc. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
