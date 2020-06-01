import React, {useEffect} from "react";
import PatientCard from "../../components/PatientCard/PatientCard";
import {makeStyles} from "@material-ui/core/styles";
import defaultImage from "../../assets/defaultImage/default-photo.jpeg";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {NavLink as RouterNavLink} from "react-router-dom";
import {fetchPatientCards, fetchPatientInfo} from "../../store/actions/patientCards";
import {connect} from "react-redux";
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
  const top = 50;
  const left = 50;
  
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(() => ({
  paper: {
    position: "absolute",
  },
  media: {
    width: 200,
  },
  root: {
    width: 500,
    display: "flex",
    textAlign: "left",
  },
  title: {
    fontSize: 20,
    borderBottom: '1px solid black'
  },
}));

function Patients(props) {
  const {patient} = props;
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [selectedPatient, setPatient] = React.useState(null);

  const handleOpen = (id) => {
    setOpen(true);
    setPatient(id);
    console.log(id);
  };

  useEffect(() => {
    props.submitForm()
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleFetchPatient = () => {
    if(selectedPatient) {
      props.onFetchPatientInfo(selectedPatient());
    }
    console.log(id)
  };
  return (
    <div>
      {props.patientCards.map((person) => {
        return (
          <PatientCard
            key={person._id}
            name={person.fullname}
            birthDate={person.birthday}
            gender={person.gender}
            id={person._id}
            onClick={() => handleOpen(person._id)}
          />
        );
      })}
      <Modal 
        open={open}
        onEnter={()=>handleFetchPatient()}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
 <div style={modalStyle}  className={classes.paper}>
      {patient && patient.patient ? (
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={defaultImage}
            title="Paella dish"
          />    
          <CardContent>
            <Typography className={classes.title}>
              Имя: {patient.patient.fullname}
            </Typography>
            <Typography className={classes.title}>
              Год рождения: {new Date(patient.patient.birthday).toLocaleDateString()}
            </Typography>
            <Typography className={classes.title}>
              Пол: {patient.patient.gender}
            </Typography>
            <Typography className={classes.title}>
              Красные флаги: {patient.redFlags && patient.redFlags}
            </Typography>
            <Typography className={classes.title}>
              Диагноз: {patient.diagnosis && patient.diagnosis}
            </Typography>
            <Typography>
              <RouterNavLink to="/plan" exact>
                План лечения
              </RouterNavLink>
            </Typography>
            <Typography>
              <RouterNavLink to="/plan-chart" exact>
                Таблица плана лечения
              </RouterNavLink>
            </Typography>
            <Typography>
              <RouterNavLink to="/" exact>
                Протокол первичного приема
              </RouterNavLink>
            </Typography>
          </CardContent>
        </Card>
      ) : null}
    </div>    
      </Modal>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    patientCards: state.patientCards.patientCards,
    patient: state.patientCards.patient
  }
};

const mapDispatchToProps = dispatch => {
  return {
    submitForm: (data) => dispatch(fetchPatientCards(data)),
    onFetchPatientInfo: (id) => dispatch(fetchPatientInfo(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);