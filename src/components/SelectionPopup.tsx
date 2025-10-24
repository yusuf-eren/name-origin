import React from 'react';
import './SelectionPopup.css';
import MenuPanel from './MenuPanel';

declare const chrome: {
  runtime: {
    getURL: (path: string) => string;
  };
};

interface SelectionPopupProps {
  text: string;
  x: number;
  y: number;
  showMenu: boolean;
  onMenuToggle: () => void;
  onClose: () => void;
}

const SelectionPopup: React.FC<SelectionPopupProps> = ({
  text,
  x,
  y,
  showMenu,
  onMenuToggle,
  onClose,
}) => {
  const logoUrl = chrome?.runtime?.getURL('name-origin-logo-48x48.png') || '';

  return (
    <>
      <div
        className="name-origin-selection-popup"
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
          transform: 'translate(-50%, -100%)',
        }}
        onClick={onMenuToggle}
      >
        <img src={logoUrl} alt="NO" className="name-origin-popup-icon-img" />
      </div>

      {showMenu && <MenuPanel text={text} x={x} y={y} onClose={onClose} />}
    </>
  );
};

export default SelectionPopup;
