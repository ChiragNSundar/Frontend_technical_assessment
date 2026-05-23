import React, { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const JSONParserNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [propertyPath, setPropertyPath] = useState(data?.propertyPath || 'data.item');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    updateNodeField(id, 'propertyPath', propertyPath);
  }, []);

  const handlePropertyChange = (e) => {
    const value = e.target.value;
    setPropertyPath(value);
    updateNodeField(id, 'propertyPath', value);
  };

  const jsonIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="header-icon">
      <path d="M10 13a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      <rect x="14" y="3" width="8" height="8" rx="1" />
      <rect x="14" y="14" width="8" height="8" rx="1" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="JSON Parser"
      icon={jsonIcon}
      className="node-json-parser"
      inputs={[{ id: `${id}-jsonString`, label: 'JSON Str' }]}
      outputs={[
        { id: `${id}-parsedObject`, label: 'Success' },
        { id: `${id}-error`, label: 'Error' },
      ]}
    >
      <div className="node-static-desc">
        Parses incoming string format payloads into structured JSON objects.
      </div>
      <div className="node-control-group">
        <label className="node-label">Extract Path</label>
        <input 
          type="text" 
          value={propertyPath} 
          onChange={handlePropertyChange} 
          className="node-input-field"
          placeholder="e.g. results[0].text"
        />
      </div>
    </BaseNode>
  );
};
