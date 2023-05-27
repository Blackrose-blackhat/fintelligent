import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image1 from "../../assets/images/zayn.jpeg";
import "../../components/blogCards/Cards.css";
export default function BlogCards() {
  return (
    <div className="cards">
      <Card
        sx={{
          Height: 500,
          maxWidth: 745,
          // display: "flex",
          // flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="340"
          image={image1}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}
