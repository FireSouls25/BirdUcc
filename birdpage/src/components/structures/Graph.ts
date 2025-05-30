export class GraphNode<T> {
  data: T;
  edges: Map<GraphNode<T>, number>;

  constructor(data: T) {
    this.data = data;
    this.edges = new Map();
  }

  addEdge(node: GraphNode<T>, weight: number = 1): void {
    this.edges.set(node, weight);
  }

  removeEdge(node: GraphNode<T>): boolean {
    return this.edges.delete(node);
  }

  getEdges(): Map<GraphNode<T>, number> {
    return this.edges;
  }
}

export class Graph<T> {
  private nodes: Map<T, GraphNode<T>>;

  constructor() {
    this.nodes = new Map();
  }

  addNode(data: T): GraphNode<T> {
    if (!this.nodes.has(data)) {
      const node = new GraphNode(data);
      this.nodes.set(data, node);
      return node;
    }
    return this.nodes.get(data)!;
  }

  addEdge(from: T, to: T, weight: number = 1): void {
    const fromNode = this.addNode(from);
    const toNode = this.addNode(to);
    fromNode.addEdge(toNode, weight);
  }

  removeNode(data: T): boolean {
    const node = this.nodes.get(data);
    if (!node) return false;

    // Eliminar todas las referencias al nodo
    for (const otherNode of this.nodes.values()) {
      otherNode.removeEdge(node);
    }

    return this.nodes.delete(data);
  }

  getNode(data: T): GraphNode<T> | undefined {
    return this.nodes.get(data);
  }

  getAllNodes(): GraphNode<T>[] {
    return Array.from(this.nodes.values());
  }

  // Búsqueda en profundidad (DFS)
  dfs(start: T, callback: (node: T) => void): void {
    const visited = new Set<T>();
    const startNode = this.nodes.get(start);
    
    if (!startNode) return;

    const dfsVisit = (node: GraphNode<T>) => {
      visited.add(node.data);
      callback(node.data);

      for (const [neighbor] of node.edges) {
        if (!visited.has(neighbor.data)) {
          dfsVisit(neighbor);
        }
      }
    };

    dfsVisit(startNode);
  }

  // Búsqueda en anchura (BFS)
  bfs(start: T, callback: (node: T) => void): void {
    const visited = new Set<T>();
    const queue: GraphNode<T>[] = [];
    const startNode = this.nodes.get(start);

    if (!startNode) return;

    visited.add(start);
    queue.push(startNode);

    while (queue.length > 0) {
      const node = queue.shift()!;
      callback(node.data);

      for (const [neighbor] of node.edges) {
        if (!visited.has(neighbor.data)) {
          visited.add(neighbor.data);
          queue.push(neighbor);
        }
      }
    }
  }
} 