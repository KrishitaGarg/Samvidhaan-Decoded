// import { ReactFlow } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import React, { useState } from "react";

// const edges = [
//   { id: "1-2", source: "1", target: "2" },
//   { id: "1-3", source: "1", target: "3" },
//   { id: "1-4", source: "1", target: "4" },
//   { id: "1-5", source: "1", target: "5" },
// ];

// const nodes = [
//   {
//     id: "1",
//     data: { label: "State" },
//     position: { x: -200, y: 0},
//   },
//   // {
//   //   id: "6",
//   //   data: { label: "Union" },
//   //   position: { x: 200, y: 0 },
//   // },
//   {
//     id: "2",
//     data: { label: "Executive" },
//     position: { x: -400, y: 80 },
//   },
//   {
//     id: "3",
//     data: { label: "Judiciary" },
//     position: { x: -300, y: 150 },
//   },
//   {
//     id: "4",
//     data: { label: "Parliament" },
//     position: { x: -100, y: 150 },
//   },
//   {
//     id: "5",
//     data: { label: "President" },
//     position: { x: 0, y: 80 },

//   },
// ];

// function Flow() {
//   const [disabled, setDisabled] = useState(true);

//   return (
//     <div style={{ height: 400 }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         draggable={false}
//         fitView
//         edgesUpdatable={!disabled}
//         edgesFocusable={!disabled}
//         nodesDraggable={!disabled}
//         nodesConnectable={!disabled}
//         // nodesFocusable={!disabled}/
//         panOnDrag={!disabled}
//         // elementsSelectable={!disablesd}
//         // Optional if you also want to lock zooming
//         zoomOnDoubleClick={!disabled}
//         minZoom={disabled ? 1 : 0.5}
//         maxZoom={disabled ? 1 : 3}
//         onNodeClick={(event, node) => {
//           console.log("click", node);
//         }
//         }
//       >
//         {/* <Background /> */}
//         {/* <Controls /> */}
//       </ReactFlow>
//     </div>
//   );
// }

// export default Flow;

import { initialNodes, initialEdges } from "./nodes-edges.js";
import ELK from "elkjs/lib/elk.bundled.js";
import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "./treeGraph.css";

const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
};

const getLayoutedElements = (nodes, edges, options = {}) => {
  const isHorizontal = options?.["elk.direction"] === "RIGHT";
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

function LayoutFlow() {
  const [disabled, setDisabled] = useState(true);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { "elk.direction": direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;

      getLayoutedElements(ns, es, opts).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);

          window.requestAnimationFrame(() => fitView());
        }
      );
    },
    [nodes, edges]
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: "DOWN", useInitialNodes: true });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        draggable={false}
        edgesFocusable={!disabled}
        nodesDraggable={!disabled}
        nodesConnectable={!disabled}
        // nodesFocusable={!disabled}/
        panOnDrag={!disabled}
        // elementsSelectable={!disablesd}
        // Optional if you also want to lock zooming
        zoomOnScroll={!disabled}
        zoomOnDoubleClick={!disabled}
        onNodeClick={(event, node) => {
          console.log("click", node);
        }}
      >
        {/* <Panel position="top-right">
        <button onClick={() => onLayout({ direction: 'DOWN' })}>
          vertical layout
        </button>

        <button onClick={() => onLayout({ direction: 'RIGHT' })}>
          horizontal layout
        </button>
      </Panel> */}
      </ReactFlow>
    </div>
  );
}

export default LayoutFlow;
