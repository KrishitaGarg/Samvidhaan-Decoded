import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React, { useState } from "react";
import "./treeGraph.css";

const edges = [
  { id: "1-2", source: "1", target: "2" },
  { id: "1-3", source: "1", target: "3" },
  { id: "1-4", source: "1", target: "4" },
  { id: "1-5", source: "1", target: "5" },
];

const nodes = [
  {
    id: "1",
    data: { label: "State" },
    position: { x: -200, y: 0},
  },
  // {
  //   id: "6",
  //   data: { label: "Union" },
  //   position: { x: 200, y: 0 },
  // },
  {
    id: "2",
    data: { label: "Executive" },
    position: { x: -400, y: 80 },
  },
  {
    id: "3",
    data: { label: "Judiciary" },
    position: { x: -300, y: 150 },
  },
  {
    id: "4",
    data: { label: "Parliament" },
    position: { x: -100, y: 150 },
  },
  {
    id: "5",
    data: { label: "President" },
    position: { x: 0, y: 80 },

  },
];

function Flow() {
  const [disabled, setDisabled] = useState(true);




  return (
    <div style={{ height: 400 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        draggable={false}
        fitView
        edgesUpdatable={!disabled}
        edgesFocusable={!disabled}
        nodesDraggable={!disabled}
        nodesConnectable={!disabled}
        // nodesFocusable={!disabled}/
        panOnDrag={!disabled}
        // elementsSelectable={!disablesd}
        // Optional if you also want to lock zooming
        zoomOnDoubleClick={!disabled}
        minZoom={disabled ? 1 : 0.5}
        maxZoom={disabled ? 1 : 3}
        onNodeClick={(event, node) => {
          console.log("click", node);
        }
        }
      >
        {/* <Background /> */}
        {/* <Controls /> */}
      </ReactFlow>
    </div>
  );
}

export default Flow;
