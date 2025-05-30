export class CircularNode<T> {
  data: T;
  next: CircularNode<T>;
  prev: CircularNode<T>;

  constructor(data: T) {
    this.data = data;
    this.next = this;
    this.prev = this;
  }
}

export class CircularDoublyLinkedList<T> {
  private head: CircularNode<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(data: T): void {
    const newNode = new CircularNode(data);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      newNode.prev = this.head.prev;
      this.head.prev.next = newNode;
      this.head.prev = newNode;
    }
    this.size++;
  }

  remove(data: T): boolean {
    if (!this.head) return false;

    let current = this.head;
    do {
      if (current.data === data) {
        if (this.size === 1) {
          this.head = null;
        } else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
          if (current === this.head) {
            this.head = current.next;
          }
        }
        this.size--;
        return true;
      }
      current = current.next;
    } while (current !== this.head);

    return false;
  }

  rotate(): void {
    if (this.head) {
      this.head = this.head.next;
    }
  }

  getCurrent(): T | null {
    return this.head ? this.head.data : null;
  }

  getSize(): number {
    return this.size;
  }

  toArray(): T[] {
    const result: T[] = [];
    if (!this.head) return result;

    let current = this.head;
    do {
      result.push(current.data);
      current = current.next;
    } while (current !== this.head);

    return result;
  }
} 