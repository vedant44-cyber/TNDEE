import { Typography } from "@mui/material";
import ParticlesComponent from "./components/particles";

const Credits = () => (
  <div className="credits">
    <ParticlesComponent id="particles" />
    <Typography variant="h3" id="welcome_heading" className="names">
      Vishnupriya 107123135
    </Typography>
    <Typography variant="h3" id="welcome_heading" className="names">
      Vedant Dorlikar 107123133
    </Typography>
    <Typography variant="h3" id="welcome_heading" className="names">
      Arunima Saha 107123017
    </Typography>
  </div>
);

export default Credits;
