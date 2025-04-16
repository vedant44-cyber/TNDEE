import { Typography } from "@mui/material";
import ParticlesComponent from "./components/particles";
import "./styles.css";

const Home = () => (
  <div className="welcome">
    <ParticlesComponent id="particles" />
    <Typography variant="h3" id="welcome_heading" className="first">
      Transmission & Distribution
    </Typography>
    

    <Typography variant="h5" id="welcome_heading" className="fourth">
      HV Cable Inter-Sheath Configuration Tool for Electrical Stress Reduction
    </Typography>
    <Typography variant="h6" id="welcome_heading" className="fourth">
      Group Assignment for EEPC17 (2025)
    </Typography>
  </div>
);

export default Home;
