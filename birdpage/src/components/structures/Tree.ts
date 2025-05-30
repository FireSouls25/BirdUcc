export class TreeNode<T> {
  data: T;
  children: TreeNode<T>[];

  constructor(data: T) {
    this.data = data;
    this.children = [];
  }

  addChild(child: TreeNode<T>): void {
    this.children.push(child);
  }

  removeChild(child: TreeNode<T>): boolean {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      return true;
    }
    return false;
  }
}

export class Tree<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  setRoot(data: T): TreeNode<T> {
    this.root = new TreeNode(data);
    return this.root;
  }

  traverse(callback: (node: TreeNode<T>) => void): void {
    if (!this.root) return;

    const traverseNode = (node: TreeNode<T>) => {
      callback(node);
      node.children.forEach(traverseNode);
    };

    traverseNode(this.root);
  }

  find(predicate: (node: TreeNode<T>) => boolean): TreeNode<T> | null {
    if (!this.root) return null;

    const findNode = (node: TreeNode<T>): TreeNode<T> | null => {
      if (predicate(node)) return node;
      
      for (const child of node.children) {
        const found = findNode(child);
        if (found) return found;
      }
      
      return null;
    };

    return findNode(this.root);
  }
} 