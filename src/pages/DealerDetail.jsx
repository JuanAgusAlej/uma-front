import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import BackButton from '../commons/buttons/BackButton.jsx';
import PendingPackages from '../components/PendingPackages.jsx';
import HistorialPackages from '../components/HistorialPackages.jsx';
import repartidoresFake from '../statics/DummyData/repartidoresFake';
import { handleColorStatus } from '../utils/circleProgressFunctions.jsx';
import {
  GridButtonActive,
  PaperDetail,
  PrincipalBox,
  TypographyName,
} from '../statics/styles/dealerDetailStyle.jsx';
import { AvatarDistributorCard } from '../statics/styles/distributors/distributorsCardStyle.jsx';

const DealerDetail = () => {
  const params = useParams();
  const idDealer = params.id;
  const idArray = idDealer - 1;
  const estado = repartidoresFake[idArray].status;
  const fotoPerfil = repartidoresFake[idArray].img;
  const nombre = repartidoresFake[idArray].name;

  const navigate = useNavigate();
  const backToDealer = () => {
    navigate('/gestionar_repartidores');
  };
  return (
    <>
      <BackButton handleSubmit={backToDealer} />
      <PrincipalBox>
        <PaperDetail>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <AvatarDistributorCard alt="foto de perfil" src={fotoPerfil} />
            </Grid>
            <Grid item xs={8}>
              <TypographyName>{nombre}</TypographyName>
              <Typography
                variant="subtitle2"
                fontSize={15}
                color={handleColorStatus(estado)}
              >
                <FiberManualRecordIcon
                  fontSize="small"
                  color={handleColorStatus(estado)}
                />
                {estado}
              </Typography>
            </Grid>
            <GridButtonActive item xs={1}>
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} />
              </FormGroup>
            </GridButtonActive>
          </Grid>
          <PendingPackages />
          <HistorialPackages />
        </PaperDetail>
      </PrincipalBox>
    </>
  );
};

export default DealerDetail;
