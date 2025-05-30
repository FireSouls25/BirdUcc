export class Queue<T> {
  private items: T[];
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.items = [];
    this.maxSize = maxSize;
  }

  enqueue(item: T): boolean {
    if (this.items.length >= this.maxSize) {
      return false;
    }
    this.items.push(item);
    return true;
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }
} 