import { useState } from 'react';

import './App.css';

function App() {
  const [colours, setColours] = useState([
    '#f55a5a',
    '#2b283a',
    '#fbf3ab',
    '#aad1b6',
    '#a626d3',
  ]);
  const [seedColour, setSeedColour] = useState('e66465');
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const requestColours = async () => {
    let formattedSeedColour = seedColour.substring(1);
    const res = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${formattedSeedColour}&mode=analogic&count=5`,
    );
    const json = await res.json();
    const newColours = json.colors.map((colorObj) => colorObj.hex.value);
    setColours(newColours);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestColours();
        }}
      >
        <input
          type="color"
          className="picker-input"
          name="picker"
          value={seedColour}
          onChange={(e) => setSeedColour(e.target.value)}
        />
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select...</option>
          <option value="monochrome">Monochrome</option>
          <option value="monochrome-dark">Monochrome-dark</option>
          <option value="monochrome-light">Monochrome-light</option>
          <option value="option4">Option 4</option>
          <option value="option5">Option 5</option>
          <option value="option6">Option 6</option>
          <option value="option7">Option 7</option>
        </select>
        <button>Get colour scheme</button>
      </form>

      <div className="colours">
        {colours.map((colour, index) => (
          <div
            key={index}
            className="colourDiv"
            style={{ backgroundColor: colour }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
