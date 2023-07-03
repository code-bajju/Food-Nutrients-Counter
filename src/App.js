import React, { useState } from 'react';
import data from './data.json';

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalNutrients, setTotalNutrients] = useState(null);

  const handleSelectChange = (event) => {
    const selectedItemName = event.target.value;
    const selectedItem = data.find(item => item.name === selectedItemName);
    setSelectedItems(prevSelectedItems => [...prevSelectedItems, selectedItem]);
  };

  const handleCalculateClick = () => {
    let calculatedNutrients = null;

    if (selectedItems.length > 0) {
      calculatedNutrients = {};

      for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i];

        for (const nutrient in item.nutrients) {
          if (calculatedNutrients.hasOwnProperty(nutrient)) {
            calculatedNutrients[nutrient] += item.nutrients[nutrient];
          } else {
            calculatedNutrients[nutrient] = item.nutrients[nutrient];
          }
        }
      }
    }

    setTotalNutrients(calculatedNutrients);
  };

  const handleClearClick = () => {
    setSelectedItems([]);
    setTotalNutrients(null);
  };

  return (
    <div className="App">
      <h1>Dropdown App</h1>
      <select onChange={handleSelectChange}>
        <option value="">Select an item</option>
        {data.map(item => (
          <option key={item.name} value={item.name}>{item.name}</option>
        ))}
      </select>
      <div>
        <h2>Selected Items:</h2>
        {selectedItems.length > 0 ? (
          <ul>
            {selectedItems.map(item => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>No items selected</p>
        )}
        {selectedItems.length > 0 && (
          <div>
            <button onClick={handleCalculateClick}>Calculate Nutrients</button>
            <button onClick={handleClearClick}>Clear Selection</button>
          </div>
        )}
      </div>
      {totalNutrients && (
        <div>
          <h2>Total Nutrients:</h2>
          <ul>
            {Object.entries(totalNutrients).map(([nutrient, value]) => (
              <li key={nutrient}>
                {nutrient}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
