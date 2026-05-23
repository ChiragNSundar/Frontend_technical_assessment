import React, { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const JSCodeNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [code, setCode] = useState(data?.code || '// Process inputs A and B\nconst result = inputA + " " + inputB;\nreturn result.toUpperCase();');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    updateNodeField(id, 'code', code);
  }, []);

  const handleCodeChange = (e) => {
    const value = e.target.value;
    setCode(value);
    updateNodeField(id, 'code', value);
  };

  const codeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="header-icon">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="JS Code Script"
      icon={codeIcon}
      className="node-js-code"
      inputs={[
        { id: `${id}-inputA`, label: 'Arg A' },
        { id: `${id}-inputB`, label: 'Arg B' },
      ]}
      outputs={[{ id: `${id}-result`, label: 'Result' }]}
      width={240}
    >
      <div className="node-control-group text-node-group">
        <label className="node-label">Script Logic</label>
        <textarea
          value={code}
          onChange={handleCodeChange}
          rows={5}
          className="node-textarea-field code-editor-font"
          placeholder="write javascript here..."
        />
      </div>
    </BaseNode>
  );
};
