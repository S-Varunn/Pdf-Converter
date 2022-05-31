import { useState } from "react";
import Modal from "./components/modal/Modal";

function App() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <p>Choose a element to Export</p>
      <br></br>
      <button
        onClick={() => {
          setOpenModal(!openModal);
        }}
      >
        Full Page
      </button>
      {openModal ? <Modal /> : null}
    </div>
  );
}

export default App;
