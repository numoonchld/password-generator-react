import passwordGenerator from "generate-password-browser";
import { useState } from "react";

function App() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordHistory, setPasswordHistory] = useState([]);

  const handlePasswordGenerate = () => {
    console.log("generate password!");

    const newPassword = passwordGenerator.generate();

    setCurrentPassword(newPassword);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(currentPassword);
    alert("copied to clipboard");
  };

  return (
    <>
      <div className="container mt-5">
        <h1> Password Generator </h1>
        <hr />
        <div>
          <h2>Generator Settings</h2>

          <div className="d-flex flex-column justify-content-center align-items-center border my-5 py-5 bg-warning px-5">
            <p className="font-monospace  fs-1 ">{currentPassword}</p>
            <button
              type="button"
              className="btn btn-success w-100 mb-3"
              onClick={handlePasswordGenerate}
            >
              Generate new password
            </button>
            <button className="btn bg-light w-100" onClick={handleCopyToClipboard}>
              Copy to clipboard
            </button>
          </div>
        </div>
        <hr />
        <div>
          <h2>Password History</h2>
        </div>
      </div>
    </>
  );
}

export default App;
