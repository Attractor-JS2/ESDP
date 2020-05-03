import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import defaultImage from "../../assets/defaultImage/default-photo.jpeg";

const useStyles = makeStyles(() => ({
  root: {
    width: 500,
    display: "flex",
    textAlign: "left",
    margin: 10,
  },
  media: {
    height: 100,
    width: 100,
  },
  container: {
    padding: 2,
  },
}));
export default function PatientCard(props) {
  const classes = useStyles();
  const formattedDate = new Date(props.birthDate).toLocaleDateString();
  return (
    <div className={classes.container} onClick={props.onClick}>
      <div>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={defaultImage}
            title="Paella dish"
          />
          <CardContent>
            <Typography>Имя: {props.name}</Typography>
            <Typography>Дата рождения: {formattedDate}</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
