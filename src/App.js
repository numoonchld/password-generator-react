import passwordGenerator from "generate-password-browser";
import { useEffect, useState } from "react";

function App() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordHistory, setPasswordHistory] = useState([]);

  const [includeAlphabets, setIncludeAlphabets] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handlePasswordGenerate = () => {
    if (
      includeAlphabets === false &&
      includeNumbers === false &&
      includeSymbols === false
    ) {
      alert("At least one pool of elements must be active!");
      return;
    }

    const newPassword = passwordGenerator.generate({
      lowercase: includeAlphabets,
      uppercase: includeAlphabets,
      numbers: includeNumbers,
      symbols: includeSymbols,
    });
    setCurrentPassword(newPassword);

    const newPasswordList = [...passwordHistory, newPassword];
    setPasswordHistory(newPasswordList);
    localStorage.setItem(
      "passwordHistoryStorage",
      JSON.stringify(newPasswordList)
    );
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(currentPassword);
    alert("copied password to clipboard");
  };

  useEffect(() => {
    if (
      includeAlphabets === false &&
      includeNumbers === false &&
      includeSymbols === false
    ) {
      alert("At least one pool of elements must be active!");
    }
  }, [includeAlphabets, includeNumbers, includeSymbols]);

  return (
    <>
      <div className="container mt-5">
        <h1> Password Generator </h1>
        <h6> Submission by Raghavendra Saralaya</h6>
        <hr />
        <div>
          <h2>Settings</h2>
          <div className="d-flex flex-row justify-content-between mt-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={includeAlphabets}
                id="checkboxForAlphabets"
                checked={includeAlphabets}
                onChange={() => setIncludeAlphabets(!includeAlphabets)}
              />
              <label
                className="form-check-label"
                htmlFor="checkboxForAlphabets"
              >
                Alphabets
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={includeNumbers}
                id="checkboxForNumbers"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
              />
              <label className="form-check-label" htmlFor="checkboxForNumbers">
                Numbers
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={includeSymbols}
                id="checkboxForSymbols"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
              />
              <label className="form-check-label" htmlFor="checkboxForSymbols">
                Special Characters
              </label>
            </div>
          </div>
          <hr />
          <div className="d-flex flex-column justify-content-center align-items-center border my-5 py-5 bg-warning px-5">
            <p className="font-monospace  fs-1 ">{currentPassword}</p>
            <button
              type="button"
              className="btn btn-success w-100 mb-3"
              onClick={handlePasswordGenerate}
            >
              Generate new password
            </button>
            <button
              className="btn bg-light w-100"
              onClick={handleCopyToClipboard}
            >
              Copy to clipboard
            </button>
          </div>
        </div>
        <hr />
        <div>
          <h2>History</h2>
          <ul className="list-group">
            {passwordHistory
              .slice(-5)
              .reverse()
              .map((password) => (
                <li key={password} className="list-group-item">
                  {password}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
