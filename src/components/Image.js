import React, { useContext } from "react";
import { PhotoContext } from "../context/PhotoContext";

const Image = ({ url, title, id }) => {
  const {getPhotoInfo} = useContext(PhotoContext)
  return(
  <li>
    <img style={{cursor: "pointer"}}
      src={url} 
      alt={title}     
      onClick={() => {
        getPhotoInfo(id);
      }}/>
  </li>
  )
}

export default Image;
