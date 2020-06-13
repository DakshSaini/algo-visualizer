export function implementDijkstra(gridArea, startNode, endNode) {
  const nodesVisitedInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getEveryNode(gridArea);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const nearestNode = unvisitedNodes.shift();
    if (nearestNode.isWall) continue;
    if (nearestNode.distance === Infinity) return nodesVisitedInOrder;
    nearestNode.isVisited = true;
    nodesVisitedInOrder.push(nearestNode);
    if (nearestNode === endNode) return nodesVisitedInOrder;
    updateUnvisitedNearestNeighbours(nearestNode, gridArea);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance);
}

function updateUnvisitedNearestNeighbours(node, gridArea) {
  const unvisitedNeighbours = getUnvisitedNeighbours(node, gridArea);
  for (const neighbourNode of unvisitedNeighbours) {
    neighbourNode.distance = node.distance + 1;
    neighbourNode.previousNode = node;
  }
}

function getUnvisitedNeighbours(node, gridArea) {
  const neighbours = [];
  const { col: column, row } = node;
  if (row > 0) neighbours.push(gridArea[row - 1][column]);
  if (row < gridArea.length - 1) neighbours.push(gridArea[row + 1][column]);
  if (column > 0) neighbours.push(gridArea[row][column - 1]);
  if (column < gridArea[0].length - 1)
    neighbours.push(gridArea[row][column + 1]);
  return neighbours.filter((neighbor) => !neighbor.isVisited);
}

function getEveryNode(gridArea) {
  const nodes = [];
  for (const row of gridArea) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function getNodesOrderedInShortestPath(endNode) {
  const nodesOrderedInShortestPath = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesOrderedInShortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesOrderedInShortestPath;
}
