import { useState } from 'react';
import { Loader } from 'lucide-react';
import './App.css';

function App() {
  const [colours, setColours] = useState([
    '#ec0606',
    '#2b283a',
    '#fbf3ab',
    '#aad1b6',
    '#a626d3',
  ]);
  const [seedColour, setSeedColour] = useState('#ff0000');
  const [selectedOption, setSelectedOption] = useState('select');
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const requestColours = async () => {
    setLoading(true);
    let formattedSeedColour = seedColour.substring(1);
    const res = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${formattedSeedColour}&mode=${selectedOption}&count=5`,
    );
    const json = await res.json();
    const newColours = json.colors.map((colorObj) => colorObj.hex.value);
    setColours(newColours);
    setLoading(false);
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
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className="select-theme"
        >
          <option value="">Select...</option>
          <option value="monochrome">Monochrome</option>
          <option value="monochrome-dark">Monochrome-dark</option>
          <option value="monochrome-light">Monochrome-light</option>
          <option value="analogic">Analogic</option>
          <option value="complement">Complement</option>
          <option value="analogic-complement">Analogic-complement</option>
          <option value="triad">Triad</option>
          <option value="quad">Quad</option>
        </select>
        <button className="btn-get-colours">Get colour scheme</button>
      </form>

      {loading && <Loader size={48} fill="red" />}

      <div className="colours">
        {colours.map((colour, index) => (
          <div
            key={index}
            className="colourDiv"
            style={{ backgroundColor: colour }}
          ></div>
        ))}

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
