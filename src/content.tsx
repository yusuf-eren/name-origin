// import React from 'react';
import ReactDOM from 'react-dom/client';
import SelectionPopup from './components/SelectionPopup';
import './content.css';

let popupRoot: HTMLDivElement | null = null;
let reactRoot: ReactDOM.Root | null = null;
let showMenu = false;

function createPopupContainer() {
  if (popupRoot) {
    return popupRoot;
  }

  popupRoot = document.createElement('div');
  popupRoot.id = 'name-origin-popup-root';
  document.body.appendChild(popupRoot);

  return popupRoot;
}

function showPopup(text: string, x: number, y: number) {
  const container = createPopupContainer();

  console.log('showPopup', text);

  if (!reactRoot) {
    reactRoot = ReactDOM.createRoot(container);
  }

  reactRoot.render(
    <>
      <SelectionPopup
        text={text}
        x={x}
        y={y}
        showMenu={showMenu}
        onMenuToggle={() => {
          console.log('menu toggle');
          showMenu = true;
          showPopup(text, x, y);
        }}
        onClose={hidePopup}
      />
    </>
  );
}

function hidePopup() {
  showMenu = false;
  if (reactRoot && popupRoot) {
    reactRoot.render(null);
  }
}

document.addEventListener('mouseup', (e) => {
  const target = e.target as HTMLElement;
  
  if (target.closest('#name-origin-popup-root')) {
    return;
  }
  
  const selection = window.getSelection();
  const selectedText = selection?.toString().trim();

  if (selectedText && selectedText.length > 0) {
    const range = selection?.getRangeAt(0);
    const rect = range?.getBoundingClientRect();

    if (rect) {
      const x = rect.left + rect.width / 2;
      const y = rect.top + window.scrollY - 10;

      showPopup(selectedText, x, y);
    }
  } else {
    hidePopup();
  }
});

document.addEventListener('mousedown', (e) => {
  const target = e.target as HTMLElement;

  if (target.closest('#name-origin-popup-root')) {
    return;
  }

  const selection = window.getSelection();
  if (selection && !selection.toString()) {
    hidePopup();
  }
});
