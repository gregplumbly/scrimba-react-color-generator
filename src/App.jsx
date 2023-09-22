import { useState } from 'react';

import './App.css';

// TODO hook up the select form to the API
// TODO style the select form and button
// TODO display the hex codes for each colour

function App() {
  const [colours, setColours] = useState([
    '#ec0606',
    '#2b283a',
    '#fbf3ab',
    '#aad1b6',
    '#a626d3',
  ]);
  const [seedColour, setSeedColour] = useState('#ff0000');
  const [selectedOption, setSelectedOption] = useState('monochrome');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const requestColours = async () => {
    let formattedSeedColour = seedColour.substring(1);
    const res = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${formattedSeedColour}&mode=${selectedOption}&count=5`,
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
          <option value="analogic">analogic</option>
          <option value="complement">complement</option>
          <option value="analogic-complement">analogic-complement</option>
          <option value="triad">triad</option>
          <option value="quad">quad</option>
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

      <div className="hexes">
        {colours.map((colour, index) => (
          <div key={index} className="hexDiv">
            {colour}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
