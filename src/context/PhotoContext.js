import React, { createContext, useState } from "react";
import axios from "axios";
import { setupCache } from 'axios-cache-adapter'
import { apiKey } from "../api/config";
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
  
  const runSearch = query => {
    api
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
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
    <PhotoContext.Provider value={{ images, loading, runSearch, searchEntry, setSearchEntry, toggleSearch, setToggleSearch, toggleModal, setToggleModal }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
