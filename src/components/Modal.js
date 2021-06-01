import React, { useContext } from "react";
import ReactModal from 'react-modal';
import Map from "./Map"
import { PhotoContext } from "../context/PhotoContext";
import { googleMapsApiKey } from "../api/config";

const Modal = () => {
    const {toggleModal, setToggleModal} = useContext(PhotoContext)
  return (
    <ReactModal 
        isOpen={toggleModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        appElement={document.getElementById('root')}>
            <Map
                apiKey={googleMapsApiKey}
                center={[42.302, -71.033]}
                zoom={13}
            />
            <div>
            <button
                type="button"
                onClick={() => setToggleModal(false)}
            >
                Close
            </button>
            </div>
    </ReactModal>
  );
};

export default Modal;
