import React from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const deleteSelector = (state) => state.deleteNode;

export const BaseNode = ({
  id,
  title,
  icon,
  inputs = [],
  outputs = [],
  children,
  width = 220,
  height,
  style = {},
  className = '',
}) => {
  const deleteNode = useStore(deleteSelector);

  return (
    <div
      className={`custom-node ${className}`}
      style={{
        width: width,
        height: height,
        ...style,
      }}
    >
      {/* Header */}
      <div className="custom-node-header">
        <div className="custom-node-header-title-container">
          {icon && <span className="custom-node-icon">{icon}</span>}
          <span className="custom-node-title">{title}</span>
        </div>
        <button
          className="custom-node-delete-btn"
          onClick={() => deleteNode(id)}
          title="Delete Node"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="custom-node-body">{children}</div>

      {/* Inputs (Left handles) */}
      {inputs.map((input, idx) => {
        const topPosition = input.style?.top || (inputs.length === 1 ? '50%' : `${((idx + 1) * 100) / (inputs.length + 1)}%`);
        return (
          <div key={input.id} className="custom-node-handle-wrapper left-handle">
            <Handle
              type="target"
              position={input.position || Position.Left}
              id={input.id}
              style={{
                top: topPosition,
                ...input.style,
              }}
              className="custom-flow-handle"
            />
            {input.label && (
              <span
                className="custom-node-handle-label left-label"
                style={{
                  top: topPosition,
                }}
              >
                {input.label}
              </span>
            )}
          </div>
        );
      })}

      {/* Outputs (Right handles) */}
      {outputs.map((output, idx) => {
        const topPosition = output.style?.top || (outputs.length === 1 ? '50%' : `${((idx + 1) * 100) / (outputs.length + 1)}%`);
        return (
          <div key={output.id} className="custom-node-handle-wrapper right-handle">
            <Handle
              type="source"
              position={output.position || Position.Right}
              id={output.id}
              style={{
                top: topPosition,
                ...output.style,
              }}
              className="custom-flow-handle"
            />
            {output.label && (
              <span
                className="custom-node-handle-label right-label"
                style={{
                  top: topPosition,
                }}
              >
                {output.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
