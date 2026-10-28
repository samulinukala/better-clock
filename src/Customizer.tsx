import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';

export interface Customizations {
  backgroundColor: string;
  textColor: string;
  timeColor: string;
  borderColor: string;
  borderRadius: string;
}

interface CustomizerProps {
  customizations: Customizations;
  setCustomizations: Dispatch<SetStateAction<Customizations>>;
}

const Customizer = ({ customizations: appliedCustomizations, setCustomizations }: CustomizerProps) => {
  const [customizations, setDraftCustomizations] = useState(appliedCustomizations);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDraftCustomizations(previous => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setCustomizations(customizations);
  };

  return (
    <div
      className="customizer-panel"
      style={{ border: `1px solid ${customizations.borderColor}`, borderRadius: customizations.borderRadius }}
    >
      <h2 style={{ color: appliedCustomizations.timeColor }}>CSS Customizer</h2>
      <div className="customization-options">
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

        <div>
          <label htmlFor="timeColor">Time and Header Color:</label>
          <input
            id="timeColor"
            name="timeColor"
            type="color"
            value={customizations.timeColor}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="borderColor">Border Color:</label>
          <input
            id="borderColor"
            name="borderColor"
            type="color"
            value={customizations.borderColor}
            onChange={handleChange}
          />
        </div>

        <button type="button" onClick={handleSave}>Apply Customizations</button>
      </div>
    </div>
  );
};

export default Customizer;