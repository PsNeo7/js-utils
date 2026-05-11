/**
 * A Binary Heap-based Priority Queue.
 * Time Complexities:
 *   - Enqueue: O(log n)
 *   - Dequeue: O(log n)
 *   - Peek: O(1)
 */
class PriorityQueue {
    /**
     * @param {function} [compare] - Optional custom comparator.
     * Defaults to (a, b) => a < b (Min-Priority Queue).
     */
    constructor(compare) {
        this.heap = [];
        // If no comparator is provided, default to Min-Heap (ascending)
        this.compare = compare || ((a, b) => a < b);
    }

    /** @returns {number} The current size of the queue. */
    size() {
        return this.heap.length;
    }

    /** @returns {boolean} True if the queue is empty. */
    isEmpty() {
        return this.heap.length === 0;
    }

    /** @returns {*} The element with the highest priority without removing it. */
    peek() {
        return this.isEmpty() ? null : this.heap[0];
    }

    /**
     * Adds an element to the queue.
     * @param {*} value
     */
    enqueue(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    /**
     * Removes and returns the element with the highest priority.
     * @returns {*}
     */
    dequeue() {
        if (this.isEmpty()) return null;
        if (this.size() === 1) return this.heap.pop();

        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return top;
    }

    /** @private */
    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            // If the current element should be above its parent...
            if (this.compare(this.heap[index], this.heap[parentIndex])) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    /** @private */
    heapifyDown() {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let targetIndex = null;

            // Check if left child has higher priority than current
            if (left < length) {
                if (this.compare(this.heap[left], this.heap[index])) {
                    targetIndex = left;
                }
            }

            // Check if right child has higher priority than current (or current target)
            if (right < length) {
                if (
                    (targetIndex === null && this.compare(this.heap[right], this.heap[index])) ||
                    (targetIndex !== null && this.compare(this.heap[right], this.heap[left]))
                ) {
                    targetIndex = right;
                }
            }

            if (targetIndex === null) break;
            this.swap(index, targetIndex);
            index = targetIndex;
        }
    }

    /** @private */
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

/**
 * Convenience class for Max-Priority Queue
 */
class MaxPriorityQueue extends PriorityQueue {
    constructor(compare = (a, b) => a > b) {
        super(compare);
    }
}

/**
 * Convenience class for Min-Priority Queue
 */
class MinPriorityQueue extends PriorityQueue {
    constructor(compare = (a, b) => a < b) {
        super(compare);
    }
}