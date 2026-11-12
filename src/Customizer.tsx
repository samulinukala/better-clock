import { useEffect, useState, type ChangeEvent } from 'react';

export interface ComponentSizes {
  clock: number;
  calendar: number;
  timer: number;
  timeDifference: number;
}

export interface Customizations {
  backgroundColor: string;
  textColor: string;
  timeColor: string;
  borderColor: string;
  borderRadius: string;
  componentSizes: ComponentSizes;
}

interface CustomizerProps {
  customizations: Customizations;
  onApply: (customizations: Customizations) => void;
}

const Customizer = ({ customizations: appliedCustomizations, onApply }: CustomizerProps) => {
  const [customizations, setDraftCustomizations] = useState(appliedCustomizations);

  useEffect(() => {
    setDraftCustomizations(appliedCustomizations);
  }, [appliedCustomizations]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDraftCustomizations(previous => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onApply(customizations);
  };

  return (
    <div
      className="customizer-panel"
      style={{
        backgroundColor: customizations.backgroundColor,
        color: customizations.textColor,
        border: `1px solid ${customizations.borderColor}`,
        borderRadius: customizations.borderRadius,
      }}
    >
      <h2 style={{ color: customizations.timeColor }}>CSS Customizer</h2>
      <div className="customization-options">
        <div>
          <label htmlFor="backgroundColor">Background Color:</label>
          <input
            id="backgroundColor"
            name="backgroundColor"
            type="color"
            value={customizations.backgroundColor}
            onChange={handleChange}
            style={{ backgroundColor: customizations.backgroundColor }}
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
            style={{ backgroundColor: customizations.textColor }}
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
            style={{ backgroundColor: customizations.timeColor }}
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
            style={{ backgroundColor: customizations.borderColor }}
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          style={{
            color: customizations.timeColor,
            backgroundColor: customizations.backgroundColor,
            border: `1px solid ${customizations.borderColor}`,
            borderRadius: customizations.borderRadius,
          }}
        >
          Apply Customizations
        </button>
      </div>
    </div>
  );
};

export default Customizer;