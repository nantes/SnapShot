import React, { createContext, useState } from "react";
import axios from "axios";
import { setupCache } from 'axios-cache-adapter'
import { apiKey } from "../api/config";
import { xmlToJson} from "../utils/utils"
export const PhotoContext = createContext();

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  exclude: { query: false },
})

const api = axios.create({
  adapter: cache.adapter
})

  const PhotoContextProvider = props => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEntry, setSearchEntry] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleModal, setToggleModal] = useState(false) 
  const [infoModal,setInfoModal] = useState({})
  
  const getPhotoInfo = id => {
    setLoading(true)
    api
      .get(`https://api.flickr.com/services/rest?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${id}`)
      .then(async response => {
        await cache.store.length()
        const XmlNode = new DOMParser().parseFromString(response.data, 'text/xml');
        const jsonResponse = xmlToJson(XmlNode)
        setInfoModal(jsonResponse.rsp.photo);
        setToggleModal(true)
        setLoading(false);
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });
  }
  const runSearch = query => {
    setLoading(true);
    api
      .get(
        `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&has_geo=1&format=json&nojsoncallback=1`
      )
      .then(async response => {
        await cache.store.length()
        setImages(response.data.photos.photo);
        setLoading(false);
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });
  };

  return (
    <PhotoContext.Provider value={{ images, loading, runSearch, searchEntry, getPhotoInfo, setSearchEntry, toggleSearch, setToggleSearch, toggleModal, setToggleModal, infoModal, setInfoModal }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
