// import React from 'react';
import ReactDOM from 'react-dom/client';
import SelectionPopup from './components/SelectionPopup';
import './content.css';

declare const chrome: {
  runtime: {
    getURL: (path: string) => string;
  };
};

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

// LinkedIn Integration
if (window.location.hostname.includes('linkedin.com')) {
  // Comments section integration
  const addLinkedInButtons = () => {
    const nameElements = document.querySelectorAll('.comments-comment-meta__description-title');
    
    nameElements.forEach((element) => {
      // Skip if already has a button
      if (element.querySelector('.name-origin-quick-btn')) {
        return;
      }

      const nameText = element.textContent?.trim() || '';
      if (!nameText) return;

      // Create small button with logo
      const button = document.createElement('span');
      button.className = 'name-origin-quick-btn';
      button.title = 'Analyze name origin';
      
      // Add logo image
      const logoImg = document.createElement('img');
      logoImg.src = chrome?.runtime?.getURL('name-origin-logo-48x48.png') || '';
      logoImg.alt = 'NO';
      button.appendChild(logoImg);
      
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + window.scrollY;
        
        // Directly open menu with the name
        showMenu = true;
        showPopup(nameText, x, y);
      });

      element.appendChild(button);
    });
  };

  // Profile page integration
  const addProfilePageButton = () => {
    // Check if we're on a profile page
    if (!window.location.pathname.startsWith('/in/')) {
      return;
    }

    // Find the main profile name (h1 element)
    const profileNameElements = document.querySelectorAll('h1.inline.t-24.v-align-middle.break-words');
    
    profileNameElements.forEach((element) => {
      // Skip if already has a button
      if (element.querySelector('.name-origin-quick-btn-profile')) {
        return;
      }

      const nameText = element.textContent?.trim() || '';
      if (!nameText) return;

      // Create small button with logo
      const button = document.createElement('span');
      button.className = 'name-origin-quick-btn-profile';
      button.title = 'Analyze nationality';
      
      // Add logo image
      const logoImg = document.createElement('img');
      logoImg.src = chrome?.runtime?.getURL('name-origin-logo-48x48.png') || '';
      logoImg.alt = 'NO';
      button.appendChild(logoImg);
      
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + window.scrollY;
        
        // Directly open menu with the name
        showMenu = true;
        showPopup(nameText, x, y);
      });

      element.appendChild(button);
    });
  };

  // "More Profiles for you" section integration
  const addMoreProfilesButtons = () => {
    // Find name containers in suggested profiles
    const nameContainers = document.querySelectorAll('.display-flex.align-items-center.mr1.hoverable-link-text.t-bold');
    
    nameContainers.forEach((container) => {
      // Skip if already has a button
      if (container.querySelector('.name-origin-quick-btn-suggested')) {
        return;
      }

      // Get the name from the span inside
      const nameSpan = container.querySelector('span[aria-hidden="true"]');
      const nameText = nameSpan?.textContent?.trim() || '';
      if (!nameText) return;

      // Create small button with logo
      const button = document.createElement('span');
      button.className = 'name-origin-quick-btn-suggested';
      button.title = 'Analyze nationality';
      
      // Add logo image
      const logoImg = document.createElement('img');
      logoImg.src = chrome?.runtime?.getURL('name-origin-logo-48x48.png') || '';
      logoImg.alt = 'NO';
      button.appendChild(logoImg);
      
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + window.scrollY;
        
        // Directly open menu with the name
        showMenu = true;
        showPopup(nameText, x, y);
      });

      container.appendChild(button);
    });
  };

  // Initial load
  setTimeout(() => {
    addLinkedInButtons();
    addProfilePageButton();
    addMoreProfilesButtons();
  }, 2000);

  // Watch for DOM changes
  const observer = new MutationObserver(() => {
    addLinkedInButtons();
    addProfilePageButton();
    addMoreProfilesButtons();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Product Hunt Integration
if (window.location.hostname.includes('producthunt.com')) {
  const addProductHuntButtons = () => {
    // Find name links in comments/posts
    const nameLinks = document.querySelectorAll('a.text-16.font-semibold.text-dark-gray[href^="/@"]');
    
    nameLinks.forEach((link) => {
      // Skip if already has a button
      if (link.querySelector('.name-origin-quick-btn-ph')) {
        return;
      }

      const nameText = link.textContent?.trim() || '';
      if (!nameText) return;

      // Create small button with logo
      const button = document.createElement('span');
      button.className = 'name-origin-quick-btn-ph';
      button.title = 'Analyze nationality';
      
      // Add logo image
      const logoImg = document.createElement('img');
      logoImg.src = chrome?.runtime?.getURL('name-origin-logo-48x48.png') || '';
      logoImg.alt = 'NO';
      button.appendChild(logoImg);
      
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + window.scrollY;
        
        // Directly open menu with the name
        showMenu = true;
        showPopup(nameText, x, y);
      });

      link.appendChild(button);
    });
  };

  // Initial load
  setTimeout(addProductHuntButtons, 2000);

  // Watch for DOM changes
  const phObserver = new MutationObserver(() => {
    addProductHuntButtons();
  });

  phObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
