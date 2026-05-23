import React, { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const APIRequestNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [method, setMethod] = useState(data?.method || 'POST');
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/v1/data');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    updateNodeField(id, 'method', method);
    updateNodeField(id, 'url', url);
  }, []);

  const handleMethodChange = (e) => {
    const value = e.target.value;
    setMethod(value);
    updateNodeField(id, 'method', value);
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    updateNodeField(id, 'url', value);
  };

  const apiIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="header-icon">
      <path d="M10 13a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      <path d="M14 11a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.71 1.71" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon={apiIcon}
      className="node-api-request"
      inputs={[
        { id: `${id}-trigger`, label: 'Trigger' },
        { id: `${id}-payload`, label: 'Payload' },
      ]}
      outputs={[
        { id: `${id}-response`, label: 'Response' },
        { id: `${id}-error`, label: 'Error' },
      ]}
    >
      <div className="node-control-group">
        <label className="node-label">Method</label>
        <select value={method} onChange={handleMethodChange} className="node-select-field">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="node-control-group">
        <label className="node-label">Endpoint URL</label>
        <input 
          type="text" 
          value={url} 
          onChange={handleUrlChange} 
          className="node-input-field"
        />
      </div>
    </BaseNode>
  );
};
