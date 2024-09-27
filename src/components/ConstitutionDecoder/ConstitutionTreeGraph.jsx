import {
  addEdge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import ELK from "elkjs/lib/elk.bundled.js";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { initialEdges, initialNodes } from "./nodes-edges.js";
import { useNavigate } from "react-router-dom";
import "@xyflow/react/dist/style.css";
import "./treeGraph.css";
import useWindowSize from "react-use/lib/useWindowSize";



const disabled = true;
const elk = new ELK();

const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLa  yers": "100",
  "elk.spacing.nodeNode": "80",
};

const getLayoutedElements = async (nodes, edges, options = {}) => {
  const isHorizontal = options?.["elk.direction"] === "RIGHT";
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  try {
    const layoutedGraph = await elk.layout(graph);
    return {
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        position: { x: node.x, y: node.y },
      })),
      edges: layoutedGraph.edges,
    };
  } catch (error) {
    console.error(error);
  }
};

let position = { x: 0, y: 0 };
const TopNode = [
  {
    id: "state",
    data: { label: "State" },
    position,
  },
  {
    id: "union",
    data: { label: "Union" },
    position,
  },
];

const TopEdges = [];

const StateNode = [
  {
    id: "state",
    data: { label: "State" , parentNode : TopNode, ParentEdge : TopEdges},
    position,
  },
  {
    id: "The-State-Executive",
    data: { label: "The Executive" },
    position,
  },
  {
    id: "The-State-Legislature",
    data: { label: "The State Legislature" },
    position,
  },
  {
    id: "The-State-Judiciary",
    data: { label: "The State Judiciary" },
    position,
  },
];

const StateEdges = [
  { id: "state-1", source: "state", target: "The-State-Executive" },
  { id: "state-2", source: "state", target: "The-State-Legislature" },
  { id: "state-3", source: "state", target: "The-State-Judiciary" },
];

const UnionNode = [
  {
    id: "union",
    data: { label: "Union" , parentNode : TopNode, ParentEdge : TopEdges},
    position,
  },
  {
    id: "The-Unions-Executive",
    data: { label: "The Executive" },
    position,
  },
  {
    id: "The-Parliament",
    data: { label: "The Parliament" },
    position,
  },
  {
    id: "The-Unions-Judiciary",
    data: { label: "The Union's Judiciary" , link : "c44f8217-eda5-40b4-9f64-3fc0d096e5e7"},
    position,
  },
  {
    id: "Control-of-Union",
    data: { label: "Comptroller and Auditor Genera of India" , link : "055c0166-6dc4-4e9e-87c6-a49effbc48b7"},
    position,
  },
];

const UnionEdges = [
  { id: "union-1", source: "union", target: "The-Unions-Executive" },
  { id: "union-2", source: "union", target: "The-Parliament" },
  { id: "union-3", source: "union", target: "The-Unions-Judiciary" },
  { id: "union-4", source: "union", target: "Control-of-Union" },
];

const TheUnionExecutiveNode = [
  {
    id: "The-Unions-Executive",
    data: { label: "The Executive" , parentNode : UnionNode, ParentEdge : UnionEdges},
    position,
  },
  {
    id: "The-President & Vice-President",
    data: { label: "The President & Vice-President" },
    position,
  },
  {
    id: "Council-of-Ministers",
    data: { label: "Council of Ministers" , link : "54129150-c732-42cc-bbd5-de308d271ada"},
    position,
  },
  {
    id: "The-Attorney-General",
    data: { label: "The Attorney-General" , link : "abf12335-74f7-46ef-99be-d7ca627afe8c"},
    position,
  },
];

const TheUnionExecutiveEdges = [
  {
    id: "The-Unions-Executive-1",
    source: "The-Unions-Executive",
    target: "The-President & Vice-President",
  },
  {
    id: "The-Unions-Executive-2",
    source: "The-Unions-Executive",
    target: "Council-of-Ministers",
  },
  {
    id: "The-Unions-Executive-3",
    source: "The-Unions-Executive",
    target: "The-Attorney-General",
  },
];

const PresidentVicePresidentNode = [
  {
    id: "The-President & Vice-President",
    data: { label: "The President & Vice-President" , parentNode : TheUnionExecutiveNode, ParentEdge : TheUnionExecutiveEdges},
    position,
  },
  {
    id: "The-President",
    data: { label: "The President" , link : "6cfcd5a2-28a1-4368-9511-a5b2b02b2d34"},
    position,
  },
  {
    id: "The-Vice-President",
    data: { label: "The Vice-President" , link:  "fe4109e2-050f-4ad6-b88d-3a069563a087"},
    position,
  },
];

const PresidentVicePresidentEdges = [
  {
    id: "The-President & Vice-President-1",
    source: "The-President & Vice-President",
    target: "The-President",
  },
  {
    id: "The-President & Vice-President-2",
    source: "The-President & Vice-President",
    target: "The-Vice-President",
  },
];


const TheStateExecutiveNode = [
  {
    id: "The-State-Executive",
    data: { label: "The Executive" , parentNode : StateNode, ParentEdge : StateEdges},
    position,
  },
  {
    id: "The-Governor",
    data: { label: "The Governor" , link : "18971506-ca2b-4992-85e1-c252be897b8c"},
    position,
  },
  {
    id: "The-Council-of-Ministers",
    data: { label: "The Council of Ministers" , link : "7caf688e-88ac-4b8b-9ff6-acaba8ab3ada"},
    position,
  },
  {
    id: "The-Attorney-General",
    data: { label: "The Attorney-General" , link : "abf12335-74f7-46ef-99be-d7ca627afe8c"},
    position,
  },
];

const TheStateExecutiveEdges = [
  {
    id: "The-State-Executive-1",
    source: "The-State-Executive",
    target: "The-Governor",
  },
  {
    id: "The-State-Executive-2",
    source: "The-State-Executive",
    target: "The-Council-of-Ministers",
  },
  {
    id: "The-State-Executive-3",
    source: "The-State-Executive",
    target: "The-Attorney-General",
  },
];

const TheStateLegislatureNode = [
  {
    id: "The-State-Legislature",
    data: { label: "The State Legislature" , parentNode : StateNode, ParentEdge : StateEdges},
    position, 
  },
  {
    id: "The-Officeo-of-state-legislature",
    data: { label: "The Office of State Legislature" , link : "e923b6c5-e402-4fcc-b5ee-0bda04ab0a9b"},
    position,
  },
  {
    id: "The-Powers-Privileges-and-Immunities",
    data: { label: "The Powers, Privileges and Immunities" , link : "59385e17-4eb2-4aad-a97d-62cb5974ab15"},  
    position,
  },
  {
    id: "The-Producres",
    data: { label: "The Procedures" },
    position,
  },
];

const TheStateJudiciaryNode = [
  {
    id: "The-State-Judiciary",
    data: { label: "The State Judiciary"  , parentNode : StateNode, ParentEdge : StateEdges},
    position
  },
  {
    id: "The-High-Courts",
    data: { label: "The High Courts" , link : "d32ec07c-2c86-40f1-9285-bd0a57bbb14d"},
    position,
  },
  {
    id: "The-Subordinate-Courts",
    data: { label: "The Subordinate Courts" , link : "7253e34a-2dfb-4de0-94d6-0b62bb5f7a43"},
    position,
  },
];

const TheStateJudiciaryEdges = [
  {
    id: "The-State-Judiciary-1",
    source: "The-State-Judiciary",
    target: "The-High-Courts",
  },
  {
    id: "The-State-Judiciary-2",
    source: "The-State-Judiciary",
    target: "The-Subordinate-Courts",
  },
];

const TheStateLegislatureEdges = [
  {
    id: "The-State-Legislature-1",
    source: "The-State-Legislature",
    target: "The-Officeo-of-state-legislature",
  },
  {
    id: "The-State-Legislature-2",
    source: "The-State-Legislature",
    target: "The-Powers-Privileges-and-Immunities",
  },
  {
    id: "The-State-Legislature-3",
    source: "The-State-Legislature",
    target: "The-Producres",
  },
];


const TheParliamentNode = [
  {
    id: "The-Parliament",
    data: { label: "The Parliament" , parentNode : UnionNode, ParentEdge : UnionEdges},
    position,
  },
  {
    id: "Officers-of-Parliament",
    data: { label: "Officers of Parliament" , link : "f7ee2e48-225f-4285-bb66-910295858c43"},
    position,
  },
  {
    id: "Power-Privileges-and-Immunities",
    data: { label: "Power, Privileges and Immunities" , link : "04f086ea-a40f-4f30-ac41-7ebdae914f4f"},
    position,
  },
  {
    id: "Procedures",
    data: { label: "Procedures" , link : "ce5d10ef-ae5d-48ec-85ca-c5c04fc6c90f"},
    position,
  },
];

const TheParliamentEdges = [
  {
    id: "The-Parliament-1",
    source: "The-Parliament",
    target: "Officers-of-Parliament",
  },
  {
    id: "The-Parliament-2",
    source: "The-Parliament",
    target: "Power-Privileges-and-Immunities",
  },
  {
    id: "The-Parliament-3",
    source: "The-Parliament",
    target: "Procedures",
  },
];

const ProducresNode = [
  {
    id: "Producres",
    data: { label: "Procedures" , parentNode : UnionNode, ParentEdge : UnionEdges},
    position,
  },
  {
    id: "The-Legislative-Procedure",
    data: { label: "The Legislative Procedure" , link : "5ca584f8-e62c-4690-a32b-df1432774219"},
    position,
  },
  {
    id: "The-Financial-Procedure",
    data: { label: "The Financial Procedure" , link : "f7ee2e48-225f-4285-bb66-910295858c43"},  
    position,
  },
  {
    id: "The-Procedures-Gerneral",
    data: { label: "The Procedures General" , link : "a099a5a5-599b-46e8-a931-64e680a4453e"},
    position,
  },
];

const ProducresEdges = [
  {
    id: "Producres-1",
    source: "Producres",
    target: "The-Legislative-Procedure",
  },
  {
    id: "Producres-2",
    source: "Producres",
    target: "The-Financial-Procedure",
  },
  {
    id: "Producres-3",
    source: "Producres",
    target: "The-Procedures-Gerneral",
  },
];




function LayoutFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(TopNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState(TopEdges);
  const [key, setKey] = useState(0);
  const { fitView } = useReactFlow();

  const navigate = useNavigate();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
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
    [nodes, edges, setNodes, setEdges, fitView]
  );
  const { width } = useWindowSize();

  useLayoutEffect(() => {
    onLayout({ direction: "DOWN", useInitialNodes: false });
    console.log("layout");
  }, [key, width]);

  const onNodeClick = (event, node) => {
    console.log("click", node);
    let nodeData = node.data
    if(nodeData?.link){
      console.log(nodeData.link)
      navigate(`/summary?category=${nodeData?.link}`)
    }
    console.log(nodeData.parentNode)
    if(nodeData?.parentNode){
      setNodes(nodeData.parentNode);
      setEdges(nodeData.ParentEdge);
      setKey((prev) => prev + 1);
      return;
    }


  
    
    if (node.id === "state") {
      setNodes(StateNode);
      setEdges(StateEdges);
    }
    if (node.id === "union") {
      setNodes(UnionNode);
      setEdges(UnionEdges);
    }
    if (node.id ===  "The-State-Executive") {
      setNodes(TheStateExecutiveNode);
      setEdges(TheStateExecutiveEdges);
    }
    if (node.id === "The-State-Legislature") {
      setNodes(TheStateLegislatureNode);
      setEdges(TheStateLegislatureEdges);
    }
    if (node.id === "The-State-Judiciary") {
      setNodes(TheStateJudiciaryNode);
      setEdges(TheStateJudiciaryEdges);
    }
    if (node.id === "The-Unions-Executive") {
      setNodes(TheUnionExecutiveNode);
      setEdges(TheUnionExecutiveEdges);
    }

    if (node.id === "The-President & Vice-President") {
      setNodes(PresidentVicePresidentNode);
      setEdges(PresidentVicePresidentEdges);
    }

    if (node.id === "The-Parliament") {
      setNodes(TheParliamentNode);
      setEdges(TheParliamentEdges);
    }

    if (node.id === "The-Producres") {
      setNodes(ProducresNode);
      setEdges(ProducresEdges);
    }
    setKey((prev) => prev + 1);
    /*navigate("/summary");*/
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
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
        onNodeClick={onNodeClick}
      ></ReactFlow>
    </div>
  );
}

export default LayoutFlow;
