import React, { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const ConditionalNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [operator, setOperator] = useState(data?.operator || '==');
  const [compareValue, setCompareValue] = useState(data?.compareValue || 'true');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    updateNodeField(id, 'operator', operator);
    updateNodeField(id, 'compareValue', compareValue);
  }, []);

  const handleOperatorChange = (e) => {
    const value = e.target.value;
    setOperator(value);
    updateNodeField(id, 'operator', value);
  };

  const handleCompareChange = (e) => {
    const value = e.target.value;
    setCompareValue(value);
    updateNodeField(id, 'compareValue', value);
  };

  const condIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="header-icon">
      <path d="M16 3h5v5" />
      <path d="M8 3H3v5" />
      <path d="M12 21v-8a4 4 0 0 0-4-4H3" />
      <path d="M12 13a4 4 0 0 1 4-4h5" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="Conditional Router"
      icon={condIcon}
      className="node-conditional"
      inputs={[{ id: `${id}-value`, label: 'Value' }]}
      outputs={[
        { id: `${id}-trueBranch`, label: 'True' },
        { id: `${id}-falseBranch`, label: 'False' },
      ]}
    >
      <div className="node-control-group">
        <label className="node-label">Condition</label>
        <select value={operator} onChange={handleOperatorChange} className="node-select-field">
          <option value="==">Equals (==)</option>
          <option value="!=">Not Equals (!=)</option>
          <option value=">">Greater Than (&gt;)</option>
          <option value="<">Less Than (&lt;)</option>
          <option value="includes">Includes / Contains</option>
        </select>
      </div>
      <div className="node-control-group">
        <label className="node-label">Compare With</label>
        <input 
          type="text" 
          value={compareValue} 
          onChange={handleCompareChange} 
          className="node-input-field"
        />
      </div>
    </BaseNode>
  );
};
