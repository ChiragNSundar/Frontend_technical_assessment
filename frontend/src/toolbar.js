import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  // SVGs for the nodes
  const inputIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );

  const outputIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  const llmIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );

  const textIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );

  const apiIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      <path d="M14 11a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.71 1.71" />
    </svg>
  );

  const jsonIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="3" width="7" height="7" rx="1" />
    </svg>
  );

  const codeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );

  const condIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3h5v5" />
      <path d="M8 3H3v5" />
      <path d="M12 21v-8a4 4 0 0 0-4-4H3" />
      <path d="M12 13a4 4 0 0 1 4-4h5" />
    </svg>
  );

  const mergeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M22 2H12v10" />
      <path d="M2 2h10v10" />
    </svg>
  );

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <div className="brand-text">
          <span className="brand-name">VectorShift</span>
          <span className="brand-tag">Flow Builder</span>
        </div>
      </div>

      <div className="toolbar-section">
        {/* Connectors Category */}
        <div className="toolbar-group">
          <span className="group-label">Connectors</span>
          <div className="group-cards">
            <DraggableNode type="customInput" label="Input" icon={inputIcon} />
            <DraggableNode type="customOutput" label="Output" icon={outputIcon} />
          </div>
        </div>

        {/* AI & Text Category */}
        <div className="toolbar-group">
          <span className="group-label">AI & Prompt</span>
          <div className="group-cards">
            <DraggableNode type="llm" label="LLM GPT" icon={llmIcon} />
            <DraggableNode type="text" label="Text Template" icon={textIcon} />
          </div>
        </div>

        {/* Data Operations */}
        <div className="toolbar-group">
          <span className="group-label">Data Ops</span>
          <div className="group-cards">
            <DraggableNode type="apiRequest" label="API Request" icon={apiIcon} />
            <DraggableNode type="jsonParser" label="JSON Parser" icon={jsonIcon} />
            <DraggableNode type="merge" label="Merge Text" icon={mergeIcon} />
          </div>
        </div>

        {/* Logic Category */}
        <div className="toolbar-group">
          <span className="group-label">Logic & Code</span>
          <div className="group-cards">
            <DraggableNode type="jsCode" label="JS Code" icon={codeIcon} />
            <DraggableNode type="conditional" label="Conditional" icon={condIcon} />
          </div>
        </div>
      </div>
    </header>
  );
};
