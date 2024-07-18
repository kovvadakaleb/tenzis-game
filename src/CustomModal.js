import Modal from "react-modal"

Modal.setAppElement("#root")

function CustomModal(props){
  return(
    <Modal className="modal-content" overlayClassName="modal-overlay"  isOpen={props.isOpen} onRequestClose={props.onClose} 
           

    >
    <h2>{props.modalMessage}</h2>
    
    <button onClick={props.onClose} className="modal-button">close</button>
    
    </Modal>
  )
}

export default CustomModal