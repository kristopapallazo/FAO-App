import React, { type FC } from "react";
import classes from "./Avatar.module.css";

interface AvatarProps {
  img: string;
  //   size?: number;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  width?: number;
  height?: number;
}

const Avatar: FC<AvatarProps> = ({
  img,
  width = 30,
  height = 30,
  style = {},
  imgStyle = {},
}) => {
  return (
    <div style={{ width, height, ...style }}>
      {img && <img className={classes.img} src={img} style={{ ...imgStyle }} />}
    </div>
  );
};

export default Avatar;
