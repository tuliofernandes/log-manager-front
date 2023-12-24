import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Sidebar from "./components/Sidebar";
import UploadLogs from "./pages/UploadLogs";
import ViewLogs from "./pages/ViewLogs";

import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Container fluid>
          <Row>
            <Col xs={2} id="sidebar-wrapper">
              <Sidebar />
            </Col>
            <Col xs={10} id="page-content-wrapper">
              <Routes>
                <Route path="/view" element={<ViewLogs />} />
                <Route path="/upload" element={<UploadLogs />} />
                <Route path="/" element={<ViewLogs />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
