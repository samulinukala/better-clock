import React, { useState } from 'react';



const Customizer: React.FC = () => {
// Handle input changes for customization fields
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setCustomizations(prev => ({
    ...prev,
    [name]: value,
  }));
};

// Save the current customizations to state (or you could remove this if not needed)
const handleSave = () => {
  console.log('Current customizations:', customizations);
};

// State to hold current customization values
const [customizations, setCustomizations] = useState({
  backgroundColor: '#ffffff',
  textColor: '#333333',
  fontFamily: 'Arial, sans-serif',
  borderRadius: '8px',
});
  return (
    <div className="customizer-panel">
      <h2>CSS Customizer</h2>
      <div className="customization-options">
        {/* Background Color */}
        <div>
          <label htmlFor="backgroundColor">Background Color:</label>
          <input
            id="backgroundColor"
            name="backgroundColor"
            type="color"
            value={customizations.backgroundColor}
            onChange={handleChange}
          />
        </div>

        {/* Text Color */}
        <div>
          <label htmlFor="textColor">Text Color:</label>
          <input
            id="textColor"
            name="textColor"
            type="color"
            value={customizations.textColor}
            onChange={handleChange}
          />
        </div>

        {/* Font Family */}
        <div>
          <label htmlFor="fontFamily">Font Family:</label>
          <input
            id="fontFamily"
            name="fontFamily"
            type="text"
            value={customizations.fontFamily}
            onChange={handleChange}
          />
        </div>

        {/* Border Radius */}
        <div>
          <label htmlFor="borderRadius">Border Radius:</label>
          <input
            id="borderRadius"
            name="borderRadius"
            type="text"
            value={customizations.borderRadius}
            onChange={handleChange}
          />
        </div>

        {/* Save Button (optional - can be removed if not needed) */}
        <button onClick={handleSave}>Apply Customizations</button>
      </div>
    </div>
  );
};

export default Customizer;