import React, { useContext } from "react";
import { PhotoContext } from "../context/PhotoContext";

const Image = ({ url, title }) => {
  const {setToggleModal} = useContext(PhotoContext)
  return(
  <li>
    <img 
      src={url} 
      alt={title}     
      onClick={() => {
        setToggleModal(true);
      }}/>
  </li>
  )
}

export default Image;
