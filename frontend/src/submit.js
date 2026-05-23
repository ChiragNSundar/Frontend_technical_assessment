// submit.js

import React, { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error('Failed to parse pipeline on server.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while connecting to the backend.');
    } finally {
      setIsLoading(false);
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="submit-btn-container">
        <button 
          onClick={handleSubmit} 
          disabled={isLoading}
          className="action-submit-btn"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="12" cy="12" r="10" strokeDasharray="40 20" strokeLinecap="round" />
              </svg>
              Parsing Flow...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Run Pipeline
            </>
          )}
        </button>
      </div>

      {/* Result Modal Overlay */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Pipeline Analysis</h3>
              <button className="modal-close-btn" onClick={() => setIsOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              {error ? (
                <div className="result-status-indicator">
                  <div className="status-badge error">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <h4 className="status-heading" style={{ color: '#ef4444' }}>Analysis Failed</h4>
                  <p className="status-sub">{error}</p>
                </div>
              ) : result ? (
                <>
                  <div className="result-status-indicator">
                    {result.is_dag ? (
                      <>
                        <div className="status-badge success">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <h4 className="status-heading" style={{ color: '#10b981' }}>Pipeline Validated</h4>
                        <p className="status-sub">Your pipeline represents a valid Directed Acyclic Graph (DAG).</p>
                      </>
                    ) : (
                      <>
                        <div className="status-badge error">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M16 8L8 16" />
                            <path d="M8 8l8 8" />
                          </svg>
                        </div>
                        <h4 className="status-heading" style={{ color: '#f43f5e' }}>Invalid Structure</h4>
                        <p className="status-sub">A cycle was detected in your connections. Pipelines must be DAGs.</p>
                      </>
                    )}
                  </div>

                  <div className="stats-grid">
                    <div className="stat-item">
                      <span className="stat-val">{result.num_nodes}</span>
                      <span className="stat-lbl">Nodes Count</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-val">{result.num_edges}</span>
                      <span className="stat-lbl">Edges Count</span>
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading details...</p>
              )}
            </div>

            <div className="modal-footer">
              <button className="modal-done-btn" onClick={() => setIsOpen(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
