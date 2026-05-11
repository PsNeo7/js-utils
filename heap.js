/**
 * A max-heap based priority queue implementation.
 * Higher priority values are dequeued first.
 * Supports enqueue, dequeue, peek, and utility methods.
 * @example
 * const pq = new MaxPriorityQueue();
 * pq.enqueue('high priority', 10);
 * pq.enqueue('low priority', 1);
 * console.log(pq.front()); // {value: 'high priority', priority: 10}
 * pq.dequeue(); // removes 'high priority'
 */
class MaxPriorityQueue {
    constructor() {
        this.heap = [];
    }

    /**
     * Adds an item to the priority queue with the given priority.
     * @param {*} value - The value to store.
     * @param {number} priority - The priority of the item (higher values have higher priority).
     */
    enqueue(value, priority) {
        this.heap.push({ value, priority });
        this.heapifyUp();
    }

    /**
     * Moves the newly added node up the heap to maintain max-heap property.
     * @private
     */
    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);
            if (this.heap[index].priority <= this.heap[parent].priority) break;
            this.swap(index, parent);
            index = parent;
        }
    }

    /**
     * Removes and returns the highest-priority item from the queue.
     * @returns {{value: *, priority: number} | null} The highest-priority item or null if empty.
     */
    dequeue() {
        if (this.heap.length === 0) return null;
        const max = this.heap[0];
        const end = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.heapifyDown();
        }
        return max;
    }

    /**
     * Restores the heap property downwards from the root.
     * @private
     */
    heapifyDown() {
        let index = 0;
        let length = this.heap.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let largest = index;

            if (left < length && this.heap[left].priority > this.heap[largest].priority) {
                largest = left;
            }

            if (right < length && this.heap[right].priority > this.heap[largest].priority) {
                largest = right;
            }

            if (largest === index) break;
            this.swap(index, largest);
            index = largest;
        }
    }

    /**
     * Returns the highest-priority item without removing it.
     * @returns {{value: *, priority: number} | null} The highest-priority item or null if empty.
     */
    front() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    /**
     * Returns the number of items in the queue.
     * @returns {number} The size of the queue.
     */
    size() {
        return this.heap.length;
    }

    /**
     * Checks if the queue is empty.
     * @returns {boolean} True if the queue is empty, false otherwise.
     */
    isEmpty() {
        return this.heap.length === 0;
    }

    /**
     * Swaps two elements in the heap array.
     * @private
     * @param {number} i - Index of first element.
     * @param {number} j - Index of second element.
     */
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

/**
 * A min-heap based priority queue implementation.
 * Lower priority values are dequeued first.
 * Supports enqueue, dequeue, peek, and utility methods.
 * @example
 * const pq = new MinPriorityQueue();
 * pq.enqueue('urgent', 1);
 * pq.enqueue('normal', 10);
 * console.log(pq.front()); // {value: 'urgent', priority: 1}
 * pq.dequeue(); // removes 'urgent'
 */
class MinPriorityQueue {
    constructor() {
        this.heap = [];
    }

    /**
     * Adds an item to the priority queue with the given priority.
     * @param {*} value - The value to store.
     * @param {number} priority - The priority of the item (lower values have higher priority).
     */
    enqueue(value, priority) {
        this.heap.push({ value, priority });
        this.heapifyUp();
    }

    /**
     * Moves the newly added node up the heap to maintain min-heap property.
     * @private
     */
    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);
            if (this.heap[index].priority >= this.heap[parent].priority) break;
            this.swap(index, parent);
            index = parent;
        }
    }

    /**
     * Removes and returns the lowest-priority item from the queue.
     * @returns {{value: *, priority: number} | null} The lowest-priority item or null if empty.
     */
    dequeue() {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];
        const end = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.heapifyDown();
        }
        return min;
    }

    /**
     * Restores the heap property downwards from the root.
     * @private
     */
    heapifyDown() {
        let index = 0;
        let length = this.heap.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
                smallest = left;
            }

            if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
                smallest = right;
            }

            if (smallest === index) break;
            this.swap(index, smallest);
            index = smallest;
        }
    }

    /**
     * Returns the lowest-priority item without removing it.
     * @returns {{value: *, priority: number} | null} The lowest-priority item or null if empty.
     */
    front() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    /**
     * Returns the number of items in the queue.
     * @returns {number} The size of the queue.
     */
    size() {
        return this.heap.length;
    }

    /**
     * Checks if the queue is empty.
     * @returns {boolean} True if the queue is empty, false otherwise.
     */
    isEmpty() {
        return this.heap.length === 0;
    }

    /**
     * Swaps two elements in the heap array.
     * @private
     * @param {number} i - Index of first element.
     * @param {number} j - Index of second element.
     */
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

/**
 * Exports the priority queue classes for use in other modules.
 * @module heap
 * @exports {MaxPriorityQueue} MaxPriorityQueue - A max-heap priority queue.
 * @exports {MinPriorityQueue} MinPriorityQueue - A min-heap priority queue.
 * @example
 * const { MaxPriorityQueue, MinPriorityQueue } = require('./heap');
 * 
 * const maxPQ = new MaxPriorityQueue();
 * maxPQ.enqueue('A', 3);
 * maxPQ.enqueue('B', 1);
 * console.log(maxPQ.dequeue()); // {value: 'A', priority: 3}
 * 
 * const minPQ = new MinPriorityQueue();
 * minPQ.enqueue('X', 2);
 * minPQ.enqueue('Y', 4);
 * console.log(minPQ.dequeue()); // {value: 'X', priority: 2}
 */
module.exports = { MaxPriorityQueue, MinPriorityQueue };