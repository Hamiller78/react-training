import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { ConsultantProvider } from "./contexts/ConsultantContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import ProjectTable from "./components/ProjectView/ProjectTable";
import ConsultantTable from "./components/ConsultantView/ConsultantTable";

function App() {
  return (
    <Router>
      <div className="App">
        <Drawer variant="permanent">
          <List>
            <ListItemButton component={Link} to="/projects">
              <ListItemText primary="Projects" />
            </ListItemButton>
            <ListItemButton component={Link} to="/consultants">
              <ListItemText primary="Consultants" />
            </ListItemButton>
            {/* Add more navigation links here */}
          </List>
        </Drawer>
        <main>
          <Routes>
            <Route
              path="/projects"
              element={
                <ProjectProvider>
                  <ProjectTable />
                </ProjectProvider>
              }
            />
            <Route
              path="/consultants"
              element={
                <ConsultantProvider>
                  <ConsultantTable />
                </ConsultantProvider>
              }
            />
            {/* Add more routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
