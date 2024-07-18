import Modal from "react-modal"

Modal.setAppElement("#root")

function CustomModal(props){
  return(
    <Modal isOpen={props.isOpen} onRequestClose={props.onClose} 
           style={{overlay:{backgroundColor:'rgba(0,0,0,0.5)'},
                   content:{top:'40%',bottom:'auto',left:'50%',right:'50%',transform:'translate(-50%,-50%)',marginRight:'-50%',textAlign:'center'}
                  }} 

    >
    <h2>{props.modalMessage}</h2>
    
    <button onClick={props.onClose} style={{padding:'10px 20px',fontSize:'16px',backgroundColor:'lightblue',marginLeft:'20px',border:'none',cursor:'pointer'}}>Close</button>
    
    </Modal>
  )
}

export default CustomModal