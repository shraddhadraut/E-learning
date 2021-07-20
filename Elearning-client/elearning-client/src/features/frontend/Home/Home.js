import { makeStyles } from "@material-ui/core";
import React from "react";
import MetaTags from "react-meta-tags";
import MetaDesc from "../../../ui/meta/MetaDesc";

const Home = () => {
  const useStyle = makeStyles((theme) => ({
    root: {},
    baner: {
      maxHeight: "450px",
      backgroundImage: "url(/banerImg.jpg)",
      [theme.breakpoints.down("md")]: {
        maxHeight: "300px",
      },
    },
  }));

  const classes = useStyle();
  return (
    <>
      <MetaDesc
        title="Home"
        metadata={[{ name: "description", content: "Home Page Information" }]}
      />
      <div className={classes.baner}></div>
    </>
  );
};

export default Home;
