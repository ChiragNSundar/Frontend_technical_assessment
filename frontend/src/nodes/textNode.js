import React, { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  // Sync initial values with store on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    updateNodeField(id, 'text', currText);
  }, []);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCurrText(value);
    updateNodeField(id, 'text', value);
  };

  // Parse variables enclosed in double curly brackets: {{ variable }}
  // Valid JS variable names: start with letter, $, or _, followed by letters, numbers, $, or _
  const getVariables = () => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const variables = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1];
      if (!variables.includes(varName)) {
        variables.push(varName);
      }
    }
    return variables;
  };

  const variables = getVariables();

  // Create left inputs dynamically for each variable
  const inputs = variables.map((varName) => ({
    id: `${id}-${varName}`,
    label: varName,
  }));

  // Dynamic width and height calculation based on text content
  const lines = currText.split('\n');
  const maxLineLength = Math.max(...lines.map((line) => line.length), 10);

  // Approximate width per char (8px) + padding
  const calculatedWidth = Math.max(220, Math.min(500, maxLineLength * 7.5 + 40));
  // Height = header (40px) + content + spacing for variables
  const calculatedHeight = Math.max(120, Math.min(450, lines.length * 19 + variables.length * 24 + 90));

  const textIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="header-icon">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="Text Template"
      icon={textIcon}
      className="node-text"
      inputs={inputs}
      outputs={[{ id: `${id}-output`, label: 'Output' }]}
      width={calculatedWidth}
      height={calculatedHeight}
    >
      <div className="node-control-group text-node-group">
        <label className="node-label">Template Text</label>
        <textarea
          value={currText}
          onChange={handleTextChange}
          rows={Math.max(2, Math.min(10, lines.length))}
          className="node-textarea-field"
          placeholder="Use {{var}} to add variables"
        />
      </div>
      {variables.length > 0 && (
        <div className="node-variables-list">
          <div className="variables-header">Detected Inputs:</div>
          <div className="variables-tags">
            {variables.map((v) => (
              <span key={v} className="variable-tag">{v}</span>
            ))}
          </div>
        </div>
      )}
    </BaseNode>
  );
};
