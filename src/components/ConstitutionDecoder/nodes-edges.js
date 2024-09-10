const position = { x: 0, y: 0 };

// export const initialNodes = [
//   {
//     id: "1",
//     data: { label: "State" },
//     position,
//   },
//   {
//     id: "2",
//     data: { label: "Union" },
//     position,
//     hidden: true,
//   },
// ];

// export const initialEdges = [];

// export const initialNodes = [
//   {
//     id: "3",
//     data: { label: "Executive" },
//   },
//   {
//     id: "4",
//     data: { label: "Judiciary" },
//     position,
//   },
//   {
//     id: "5",
//     data: { label: "Parliament" },
//     position,
//   },
//   {
//     id: "6",
//     data: { label: "Union" },
//     position,
//   },
// ];

// export const initialEdges = [
//   { id: "6-3", source: "6", target: "3" },
//   { id: "6-4", source: "6", target: "4" },
//   { id: "6-5", source: "6", target: "5" },
// ];


// const initialNodes = [{
//   id: "State",
//   data: { label: "State" },

// }


const initialNodes = [
    {
        id: "1",
        data: { label: "State" },
        position,
    },
    {
        id: "2",
        data: { label: "Union" },
        position,
        hidden: true,
    },
    {
        id: "3",
        data: { label: "Executive" },
        position: { x: 0, y: 80 },
    },
    {
        id: "4",
        data: { label: "Judiciary" },
        position,
    },
    {
        id: "5",
        data: { label: "Parliament" },
        position,
        hidden : true,
    },
    {
        id: "6",
        data: { label: "Union" },
        position,
    },
    {
        id: "7",
        data: { label: "President" },
        position: { x: 0, y: 80 },
    },
    {
        id : "8",
        data : { label : "Prime Minister"},
        position : { x : 0, y : 80},
    },

];

const initialEdges = [
    { id: "6-3", source: "6", target: "3" },
    { id: "6-4", source: "6", target: "4" },
    { id: "6-5", source: "6", target: "5" },
    { id : "6-7", source : "6", target : "7"},
    { id : "6-8", source : "6", target : "8"},
];


export { initialNodes, initialEdges };