import React, { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const MergeNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [delimiter, setDelimiter] = useState(data?.delimiter || ', ');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    updateNodeField(id, 'delimiter', delimiter);
  }, []);

  const handleDelimiterChange = (e) => {
    const value = e.target.value;
    setDelimiter(value);
    updateNodeField(id, 'delimiter', value);
  };

  const mergeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="header-icon">
      <path d="M12 22V12" />
      <path d="M22 2H12v10" />
      <path d="M2 2h10v10" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="Merge Text"
      icon={mergeIcon}
      className="node-merge"
      inputs={[
        { id: `${id}-input1`, label: 'Text 1' },
        { id: `${id}-input2`, label: 'Text 2' },
      ]}
      outputs={[{ id: `${id}-mergedText`, label: 'Merged' }]}
    >
      <div className="node-control-group">
        <label className="node-label">Delimiter</label>
        <select value={delimiter} onChange={handleDelimiterChange} className="node-select-field">
          <option value=", ">Comma (, )</option>
          <option value=" ">Space ( )</option>
          <option value="\n">Newline (\n)</option>
          <option value=" - ">Hyphen ( - )</option>
          <option value="">None (Concatenate)</option>
        </select>
      </div>
    </BaseNode>
  );
};
