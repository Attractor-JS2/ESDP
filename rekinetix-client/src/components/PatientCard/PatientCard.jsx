import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import defaultImage from "../../assets/defaultImage/default-photo.jpeg";

const useStyles = makeStyles((theme) => ({
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
            <Typography>Name: {props.name}</Typography>
            <Typography>Age: {props.age}</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
