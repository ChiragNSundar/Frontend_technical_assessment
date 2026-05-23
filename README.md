# VectorShift Pipeline Flow Builder

This project is a modern, interactive, node-based workflow pipeline builder. It features a customizable node abstraction system, sleek dark-themed visual design, dynamic text-area resizing, double-curly-brace variable extraction, and a python backend validating pipeline DAG structure.

---

## 🛠️ Implemented Features

### Part 1: Reusable Node Abstraction & Custom Nodes
- **`BaseNode` Abstraction**: Created a unified React node wrapper managing container styling, header gradients, SVGs, handles alignment, and custom node deletions.
- **5 New Custom Nodes**:
  1. **API Request**: Configurable HTTP endpoint calls (`GET`/`POST`/`PUT`/`DELETE`).
  2. **JSON Parser**: Parses string data and extracts key path values.
  3. **JS Code Script**: Inline JavaScript text area script execution.
  4. **Conditional Router**: Router checking values against conditions (`==`, `!=`, `<`, `includes`).
  5. **Merge Text**: Combines text outputs with a delimiter.

### Part 2: Premium UI Styling
- Modern SaaS dark-mode interface with a glowing color-coded selection system.
- Organized drag-and-drop toolbar categorized with clean hover effects and transitions.
- Styled custom React Flow connection lines, handles, minimaps, and controls.

### Part 3: Dynamic Text Nodes
- **Auto-Resizing**: Node width and height adjust dynamically as user inputs text or breaks lines inside the template textarea.
- **Dynamic Variables**: Identifies variables formatted in `{{ varName }}` and creates left connection target handles dynamically, spacing them evenly.

### Part 4: Backend DAG Validator
- **FastAPI Endpoint**: Accepts graph datasets (`nodes` and `edges`) via a `POST /pipelines/parse` endpoint.
- **Cycle Detection**: Executes recursive Depth-First Search (DFS) traversal to detect loops and verify DAG structure.
- **Alert Results Modal**: Displays results inside a custom validation overlay with statistics cards and status badges.

---

## 🚀 Quick Start Guide

### 1. Run the Backend (Python/FastAPI)
Navigate to the `/backend` folder and run the following:
```bash
# Install dependencies
pip install fastapi uvicorn pydantic

# Start FastAPI server
uvicorn main:app --reload
```
The backend server runs at **http://localhost:8000** with hot reloading active.

### 2. Run the Frontend (React)
Navigate to the `/frontend` folder and run the following:
```bash
# Install packages
npm install

# Start development server
npm start
```
The frontend application will open automatically at **http://localhost:3000**.

---

## 🔍 How to Test Pipeline Validation

1. **Verify DAG Success**:
   - Drag **Input**, **LLM GPT**, and **Output** nodes onto the canvas.
   - Connect `Input (Value)` ➡️ `LLM GPT (Prompt)`.
   - Connect `LLM GPT (Response)` ➡️ `Output (Value)`.
   - Click the **Run Pipeline** button at the bottom center.
   - *Expected outcome*: Modal displays green success badge saying "Pipeline Validated" along with `Nodes: 3`, `Edges: 2`.

2. **Verify Cycle Detection**:
   - Add a connection backwards from `Output` ➡️ `LLM GPT (System)`.
   - Click **Run Pipeline** again.
   - *Expected outcome*: Modal displays red warning badge saying "Invalid Structure" indicating a cycle is detected.
