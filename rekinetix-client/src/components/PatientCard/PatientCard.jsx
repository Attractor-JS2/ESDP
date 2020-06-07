import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    textAlign: "left",
    margin: 10,
    backgroundColor: 'rgba(245, 245, 245, 0.6)',
    fontWeight: 'bold'
  },
  media: {
    height: 100,
    width: 100,
  },
  container: {
    padding: 2,
    width: '30%',
    cursor: 'pointer'
  },
}));
export default function PatientCard(props) {
  const classes = useStyles();
  const formattedDate = new Date(props.birthDate).toLocaleDateString();
  return (
    <div className={classes.container} onClick={props.onClick}>
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Typography>Имя: {props.name}</Typography>
            <Typography>Дата рождения: {formattedDate}</Typography>
            <Typography>Пол: {props.gender}</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
