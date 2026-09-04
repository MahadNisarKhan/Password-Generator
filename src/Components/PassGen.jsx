import React, {useState, useEffect, useCallback, useRef} from 'react'
import './PassGen.css'

function PassGen() {
    const textareaRef = useRef(null);
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

  const generatePassword = useCallback(() => { // used useCallback to memoize the function and prevent unnecessary re-renders, will only change if any of the dependencies change. If not used then the function will be recreated on every render, causing the useEffect to run infinitely (an infinite loop of re-renders).
    let charSet = '';
    let pass = '';

    if (includeUppercase) {
      charSet += uppercase;
    }
    if (includeLowercase) {
      charSet += lowercase;
    }
    if (includeNumbers) {
      charSet += numbers;
    }
    if (includeSymbols) {
      charSet += symbols;
    }
    if (!charSet) {
      setPassword("");
      return;
    }

    for (let i = 0; i < length; i++) {  // randomly select characters from the charSet to form the password
      const randomIndex = Math.floor(Math.random() * charSet.length);
      pass += charSet[randomIndex]; // append the selected character to the password -> 
    }

    setPassword(pass); // passing the password generated through loop to the state variable
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols, length]);

  useEffect(() => { // call the generatePassword function whenever any of the dependencies change
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, generatePassword]); // generatePassword is inclueded because -> React's rule: every value used inside useEffect must be in the dependency array.

  // if generatePassword is included inside the useEffect dependency array without useCallback, it will be recreated on every render, causing the useEffect to run infinitely (an infinite loop of re-renders). By using useCallback, we ensure that generatePassword is only recreated when its dependencies change, preventing unnecessary re-renders.

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [password]);

  const copy = (e) => {
    navigator.clipboard.writeText(password);
    textareaRef.current.select();
  }
  return (
    <>
    <div id="top">
      <h1>Security Key Generator</h1>
      <p> Generate a secure, random key with customizable options.</p>
    </div>
      <div className="container">
        <div className="header">
          <h1 id="h1">Random Security Key</h1>
        </div>
        <div className="password-display">
          <textarea id="password" placeholder="Generated Password" readOnly value={password} ref={textareaRef} />
          <button id="copy" onClick={copy}>
            Copy
          </button>
        </div>
        <div className="controls">
          <div className="bar">
            <input id="length" type="range" min="4" max="64" value={length} onChange={(e) => setLength(e.target.value)} />
            <div className="length-value">
            <label htmlFor="length">Length:</label>
            <input id="length-value" type="text" value={length} onChange={(e) => setLength(e.target.value)} />
            </div>
            <div className="tools">
              <div className="tool-row">
                <input id="uppercase" type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />
                <label htmlFor="uppercase">Uppercase</label>
              </div>
              <div className="tool-row">
                <input id="lowercase" type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} />
                <label htmlFor="lowercase">Lowercase</label>
              </div>
              <div className="tool-row">
                <input id="numbers" type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                <label htmlFor="numbers">Numbers</label>
              </div>
              <div className="tool-row">
                <input id="symbols" type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
                <label htmlFor="symbols">Symbols</label>
              </div>
            </div>
          </div>
          <div className="generate">
            <button id="generate" onClick={generatePassword}>
              Generate Key
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PassGen;