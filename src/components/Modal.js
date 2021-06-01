import React, { useContext } from "react";
import ReactModal from 'react-modal';
import styled from 'styled-components';

import Map from "./Map"
import { PhotoContext } from "../context/PhotoContext";
import { googleMapsApiKey } from "../api/config";

const MapWrapper = styled.div`
  height: 50vh;
  width: 100%;
`;

const ButtonWrapper = styled.button`
  margin: 12px;
  bottom: 0;
  padding: 30px;
`;

const ContentWrapper = styled.div`
  margin: 10px;

`;

const Modal = () => {
    const {toggleModal, setToggleModal, infoModal } = useContext(PhotoContext)

    const {latitude, longitude } = toggleModal ? infoModal.location.attributes : 0
  return (
    <ReactModal 
        isOpen={toggleModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        appElement={document.getElementById('root')}>
            <MapWrapper>
                <Map
                    apiKey={googleMapsApiKey}
                    center={[parseFloat(latitude), parseFloat(longitude)]}
                    zoom={13}
                    latitude={latitude}
                    longitude={longitude}
                />
            </MapWrapper>
            {toggleModal ?
(
            <ContentWrapper>
                <p>Title: {typeof infoModal.title === 'string' ? infoModal.title : "No Title"}</p>
                <p>Description: {typeof infoModal.description === 'string' ? infoModal.description : "No Description"}</p>
                <p>Date: {typeof infoModal.dates.attributes.taken === 'string' ? infoModal.dates.attributes.taken : "No Date"}</p>
                <p>Country: {typeof infoModal.location.country === 'string' ? infoModal.location.country : "No Country"}</p>
                <p>Locality: {typeof infoModal.location.locality === 'string' ? infoModal.location.locality: "No Locality"}</p>
                <p>PH: {typeof infoModal.owner.attributes.realname === 'string' ? infoModal.owner.attributes.realname : "No PH"}</p>

            </ContentWrapper>) : ""}
            <ButtonWrapper
                    onClick={() => setToggleModal(false)}
                >
                    Close
            </ButtonWrapper>
    </ReactModal>
  );
};

export default Modal;
