import React from 'react';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const llmIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="header-icon">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="LLM (GPT-4)"
      icon={llmIcon}
      className="node-llm"
      inputs={[
        { id: `${id}-system`, label: 'System' },
        { id: `${id}-prompt`, label: 'Prompt' },
      ]}
      outputs={[{ id: `${id}-response`, label: 'Response' }]}
    >
      <div className="node-static-desc">
        Integrates a generative AI language model to process system instructions and prompt variables.
      </div>
    </BaseNode>
  );
};
