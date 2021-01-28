import React from "react";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";

export default ({ color, size, onClick }) => (
  <PlaceTwoTone onClick={onClick} style={{ color, fontSize: size }} />
);
