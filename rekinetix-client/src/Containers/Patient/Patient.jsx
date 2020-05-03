import React, {useEffect} from "react";
import PatientCard from "../../components/PatientCard/PatientCard";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import defaultImage from "../../assets/defaultImage/default-photo.jpeg";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {NavLink as RouterNavLink} from "react-router-dom";
import {fetchPatientCards} from "../../store/actions/patientCards";
import {connect} from "react-redux";

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

function Patient(props) {
  
  
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [selectedPatient, setPatient] = React.useState({});
  const handleOpen = (index) => {
    setOpen(true);
    setPatient(props.patientCards[index]);
    console.log(index);
  };
  useEffect(() => {
    props.fetchPatientCards()
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      {selectedPatient ? (
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={defaultImage}
            title="Paella dish"
          />
          <CardContent>
            <Typography className={classes.title}>
              Имя: {selectedPatient.patientName}{" "}
            </Typography>
            <Typography className={classes.title}>
              Год рождения: {selectedPatient.patientAge}
            </Typography>
            <Typography className={classes.title} >
              Красные флаги: {selectedPatient.redFlags && selectedPatient.redFlags.join(', ')}
            </Typography>
            <Typography className={classes.title} >
              Диагноз: {selectedPatient.diagnosis && selectedPatient.diagnosis.join(', ')}
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
  );
  
  return (
    <div>
      {props.patientCards.map((person, index) => {
        return (
          <PatientCard
            key={index}
            name={person.patientName}
            age={person.patientAge}
            onClick={() => handleOpen(index)}
          />
        );
      })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    patientCards: state.patientCards.patientCards
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPatientCards: () => dispatch(fetchPatientCards())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);