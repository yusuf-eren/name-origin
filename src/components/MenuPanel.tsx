import React, { useState, useEffect } from 'react';
import './MenuPanel.css';

interface MenuPanelProps {
  text: string;
  x: number;
  y: number;
  onClose: () => void;
}

declare const chrome: {
  storage: {
    sync: {
      get: (
        keys: string[],
        callback: (result: Record<string, string>) => void
      ) => void;
      set: (items: Record<string, string>, callback: () => void) => void;
      remove: (keys: string, callback: () => void) => void;
    };
  };
};

const MenuPanel: React.FC<MenuPanelProps> = ({ text, x, y, onClose }) => {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [position, setPosition] = useState({ x, y, placement: 'top' });

  useEffect(() => {
    chrome.storage.sync.get(['openaiApiKey'], (result) => {
      if (result.openaiApiKey) {
        setHasApiKey(true);
        fetchOrigin(result.openaiApiKey, text);
      }
    });

    const calculatePosition = () => {
      const viewportWidth = window.innerWidth;
      const panelWidth = 500;
      const panelHeight = 350;
      const margin = 20;

      let newX = x;
      let newY = y;
      let placement = 'top';

      if (y < panelHeight + margin) {
        newY = y + 60;
        placement = 'bottom';
      } else {
        newY = y - 10;
        placement = 'top';
      }

      if (x < panelWidth / 2 + margin) {
        newX = margin + panelWidth / 2;
      } else if (x > viewportWidth - panelWidth / 2 - margin) {
        newX = viewportWidth - panelWidth / 2 - margin;
      }

      setPosition({ x: newX, y: newY, placement });
    };

    calculatePosition();
  }, [text, x, y]);

  const saveApiKey = () => {
    chrome.storage.sync.set({ openaiApiKey: inputKey }, () => {
      setHasApiKey(true);
      setShowSettings(false);
      fetchOrigin(inputKey, text);
    });
  };

  const deleteApiKey = () => {
    chrome.storage.sync.remove('openaiApiKey', () => {
      setHasApiKey(false);
      setShowSettings(false);
      setResponse('');
    });
  };

  const fetchOrigin = async (key: string, selectedText: string) => {
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          input: [
            {
              role: 'system',
              content: `You are an expert onomastician (name researcher) specializing in identifying nationality and ethnic origin through anthroponymic analysis (study of personal names).

YOUR PRIMARY TASK: Determine the most likely nationality/ethnicity of a person based on their full name (first name + surname when provided).

ANALYSIS METHODOLOGY:
1. SURNAME IS CRITICAL - Surnames are the strongest indicator of nationality/ethnicity
2. First name + surname combination reveals cultural patterns
3. Spelling patterns indicate specific languages/regions
4. Name structure follows cultural naming conventions
5. Consider historical migration and diaspora patterns

KEY PRINCIPLES:
- "Yusuf Eren" = Turkish (Turkish first name + Turkish surname)
- "Yusuf Al-Ahmad" = Arab (Arabic naming pattern)
- "Joseph Cohen" = Jewish (likely Israeli/American)
- "José García" = Spanish/Hispanic
- "Giuseppe Rossi" = Italian

PROVIDE DETAILED ANALYSIS:
- Confidence levels for each nationality
- Explain WHY this name indicates specific nationality
- Regional specificity (not just "European" but "Southern Italian" or "Bavarian German")
- Consider both ethnic origin and current nationality
- Identify diaspora patterns (e.g., Turkish name in Germany)

If not a person's name, return primary_nationality as "Not a person's name".`,
            },
            {
              role: 'user',
              content: `Identify the nationality/ethnicity of this person: "${selectedText}"

REQUIRED ANALYSIS:
1. What is the most likely nationality? (Provide confidence %)
2. What specific region within that country? (if determinable)
3. Are there alternative nationalities? (ranked by likelihood)
4. What does the surname indicate?
5. What does the first name indicate?
6. What is the ethnic/cultural background?
7. Any diaspora indicators? (e.g., Turkish name with German spelling)
8. Historical/etymological roots of the name components

Be VERY specific and detailed. Explain your reasoning.`,
            },
          ],
          model: 'gpt-4.1-mini',

          // tools: [{ type: 'web_search' }],

          text: {
            format: {
              type: 'json_schema',
              name: 'nationality_analysis',
              schema: {
                type: 'object',
                properties: {
                  primary_nationality: {
                    type: 'string',
                    description: 'Most likely nationality (e.g., Turkish, Italian, German, Chinese, etc.)',
                  },
                  confidence_percentage: {
                    type: 'number',
                    description: 'Confidence level for primary nationality (0-100)',
                  },
                  specific_region: {
                    type: 'string',
                    description: 'Specific region or city within the country if determinable (e.g., "Anatolia, Turkey" or "Sicily, Italy")',
                  },
                  ethnic_background: {
                    type: 'string',
                    description: 'Ethnic or cultural background (e.g., "Turkic", "Arab", "Slavic", "Germanic", "Han Chinese")',
                  },
                  alternative_nationalities: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        nationality: { type: 'string' },
                        confidence: { type: 'number' },
                        reason: { type: 'string' }
                      },
                      required: ['nationality', 'confidence', 'reason'],
                      additionalProperties: false
                    },
                    description: 'Other possible nationalities ranked by likelihood with explanations',
                  },
                  surname_analysis: {
                    type: 'string',
                    description: 'Detailed analysis of the surname: origin, meaning, geographic distribution, cultural significance',
                  },
                  first_name_analysis: {
                    type: 'string',
                    description: 'Analysis of the first name: origin, popularity in specific regions, cultural/religious associations',
                  },
                  name_structure_pattern: {
                    type: 'string',
                    description: 'Explanation of naming convention pattern (e.g., "Turkish: Name + Surname", "Arabic: Name + Father\'s name + Family name")',
                  },
                  diaspora_indicators: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Signs of migration or diaspora (e.g., "Turkish name with German spelling", "Common in Turkish diaspora in Europe")',
                  },
                  historical_context: {
                    type: 'string',
                    description: 'Historical or etymological background of the name components',
                  },
                  similar_names_by_region: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        region: { type: 'string' }
                      },
                      required: ['name', 'region'],
                      additionalProperties: false
                    },
                    description: 'Similar names used in different regions showing variations',
                  },
                  cultural_religious_context: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Cultural, religious, or ethnic identities commonly associated (e.g., "Muslim", "Jewish", "Christian", "Secular")',
                  },
                },
                required: [
                  'primary_nationality',
                  'confidence_percentage',
                  'specific_region',
                  'ethnic_background',
                  'alternative_nationalities',
                  'surname_analysis',
                  'first_name_analysis',
                  'name_structure_pattern',
                  'diaspora_indicators',
                  'historical_context',
                  'similar_names_by_region',
                  'cultural_religious_context',
                ],
                additionalProperties: false,
              },
              strict: true,
            },
          },
          temperature: 0.7,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setResponse(JSON.stringify({ error: data.error.message }));
      } else if (data.output && data.output[0] && data.output[0].content && data.output[0].content[0]) {
        const textContent = data.output[0].content[0].text;
        setResponse(textContent);
      } else {
        setResponse(JSON.stringify({ error: 'Unexpected response format' }));
      }
    } catch (error) {
      setResponse(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setLoading(false);
    }
  };

  if (showSettings) {
    return (
      <div
        className="menu-panel"
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: position.placement === 'top' ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
        }}
      >
        <div className="menu-header">
          <h3>API Settings</h3>
          <button className="close-btn" onClick={() => setShowSettings(false)}>
            ×
          </button>
        </div>
        <div className="menu-content">
          <input
            type="password"
            className="api-key-input"
            placeholder="Enter OpenAI API Key"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
          />
          <div className="button-group">
            <button className="btn btn-primary" onClick={saveApiKey}>
              Save
            </button>
            {hasApiKey && (
              <button className="btn btn-secondary" onClick={deleteApiKey}>
                Delete Key
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!hasApiKey) {
    return (
      <div
        className="menu-panel"
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: position.placement === 'top' ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
        }}
      >
        <div className="menu-header">
          <h3>API Key Required</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="menu-content">
          <p style={{ marginBottom: '12px', color: '#000' }}>
            Please enter your OpenAI API key to continue.
          </p>
          <input
            type="password"
            className="api-key-input"
            placeholder="Enter OpenAI API Key"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
          />
          <button className="btn btn-primary" onClick={saveApiKey}>
            Save & Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="menu-panel"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: position.placement === 'top' ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
      }}
    >
      <div className="menu-header">
        <h3>Nationality Identifier</h3>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="menu-content">
        <div className="selected-text-box">
          <span className="selected-label">Selected:</span>
          <span className="selected-value">{text}</span>
        </div>

        {loading && (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        )}

        {!loading && response && (
          <>
            {(() => {
              try {
                const parsedResponse = JSON.parse(response);

                if (parsedResponse.error) {
                  return (
                    <div className="error-message">
                      Error: {parsedResponse.error}
                    </div>
                  );
                }

                return (
                  <div className="nationality-result">
                    <div className="primary-nationality-card">
                      <div className="nationality-flag">🌍</div>
                      <div className="nationality-info">
                        <div className="nationality-label">Most Likely</div>
                        <div className="nationality-name">{parsedResponse.primary_nationality || 'Unknown'}</div>
                        <div className="nationality-meta">
                          {parsedResponse.specific_region && (
                            <span className="meta-item">📍 {parsedResponse.specific_region}</span>
                          )}
                          {parsedResponse.ethnic_background && (
                            <span className="meta-item">👥 {parsedResponse.ethnic_background}</span>
                          )}
                        </div>
                      </div>
                      <div className="confidence-large">{parsedResponse.confidence_percentage}%</div>
                    </div>

                    {parsedResponse.alternative_nationalities &&
                      parsedResponse.alternative_nationalities.length > 0 && (
                        <div className="alternatives-section">
                          <div className="alternatives-title">Other Possibilities</div>
                          <div className="alternatives-grid">
                            {parsedResponse.alternative_nationalities.slice(0, 3).map(
                              (alt: { nationality: string; confidence: number; reason: string }, idx: number) => (
                                <div key={idx} className="alternative-card">
                                  <div className="alt-nationality">{alt.nationality}</div>
                                  <div className="alt-confidence">{alt.confidence}%</div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {parsedResponse.cultural_religious_context &&
                      parsedResponse.cultural_religious_context.length > 0 && (
                        <div className="quick-info">
                          {parsedResponse.cultural_religious_context.slice(0, 3).map(
                            (context: string, idx: number) => (
                              <span key={idx} className="info-tag">
                                {context}
                              </span>
                            )
                          )}
                        </div>
                      )}
                  </div>
                );
              } catch (e) {
                return <div className="response-text">{response}</div>;
              }
            })()}
          </>
        )}

        <div className="settings-link">
          <button
            className="settings-btn"
            onClick={() => setShowSettings(true)}
          >
            Update API Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPanel;
