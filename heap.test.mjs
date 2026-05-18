import { MinPriorityQueue, MaxPriorityQueue, PriorityQueue } from "./heap.mjs";

// Test Runner Helper Function
function assert(condition, message) {
    if (!condition) {
        throw new Error(`❌ Test Failed: ${message}`);
    }
    console.log(`✅ Passed: ${message}`);
}

function runPriorityQueueTests() {
    console.log("--- Starting Priority Queue Test Suite ---\n");

    // =========================================================================
    // Test Case 1: Basic MinPriorityQueue Operations (Ascending Order)
    // =========================================================================
    try {
        const minQ = new MinPriorityQueue();
        assert(minQ.isEmpty() === true, "Initial queue should be empty");
        assert(minQ.size() === 0, "Initial queue size should be 0");
        assert(minQ.peek() === null, "Peek on empty queue should return null");
        assert(minQ.dequeue() === null, "Dequeue on empty queue should return null");

        // Enqueue out of order
        minQ.enqueue(10);
        minQ.enqueue(5);
        minQ.enqueue(15);
        minQ.enqueue(2);

        assert(minQ.size() === 4, "Size should be 4 after 4 insertions");
        assert(minQ.peek() === 2, "Peek should return the absolute minimum element (2)");

        // Dequeue sequentially and verify min-heap ordering
        assert(minQ.dequeue() === 2, "First dequeue should be 2");
        assert(minQ.dequeue() === 5, "Second dequeue should be 5");
        assert(minQ.dequeue() === 10, "Third dequeue should be 10");
        assert(minQ.dequeue() === 15, "Fourth dequeue should be 15");
        assert(minQ.isEmpty() === true, "Queue should be empty after dequeuing all elements");
    } catch (e) {
        console.error(e.message);
    }

    console.log("");

    // =========================================================================
    // Test Case 2: Basic MaxPriorityQueue Operations (Descending Order)
    // =========================================================================
    try {
        const maxQ = new MaxPriorityQueue();
        maxQ.enqueue(10);
        maxQ.enqueue(30);
        maxQ.enqueue(20);
        maxQ.enqueue(5);

        assert(maxQ.peek() === 30, "MaxPQ peek should return the absolute maximum element (30)");
        assert(maxQ.dequeue() === 30, "First dequeue should be 30");
        assert(maxQ.dequeue() === 20, "Second dequeue should be 20");
        assert(maxQ.dequeue() === 10, "Third dequeue should be 10");
        assert(maxQ.dequeue() === 5, "Fourth dequeue should be 5");
    } catch (e) {
        console.error(e.message);
    }

    console.log("");

    // =========================================================================
    // Test Case 3: Handling Duplicate Elements
    // =========================================================================
    try {
        const minQ = new MinPriorityQueue();
        minQ.enqueue(5);
        minQ.enqueue(5);
        minQ.enqueue(2);
        minQ.enqueue(5);

        assert(minQ.dequeue() === 2, "Should handle mixed duplicates, extracting 2 first");
        assert(minQ.dequeue() === 5, "Should extract remaining identical duplicates seamlessly");
        assert(minQ.dequeue() === 5, "Should extract remaining identical duplicates seamlessly");
        assert(minQ.dequeue() === 5, "Should extract remaining identical duplicates seamlessly");
        assert(minQ.isEmpty() === true, "Queue should clear out flawlessly");
    } catch (e) {
        console.error(e.message);
    }

    console.log("");

    // =========================================================================
    // Test Case 4: Complex Object Array Structure (e.g., Meeting Rooms III Scenario)
    // =========================================================================
    try {
        // Struct: [endTime, roomNumber]
        // Priority Condition: Lower endTime wins. Ties broken by lower roomNumber.
        const meetingRoomsHeap = new PriorityQueue((a, b) => {
            if (a[0] !== b[0]) return a[0] < b[0]; // Earlier end time
            return a[1] < b[1];                   // Lower room index
        });

        meetingRoomsHeap.enqueue([20, 2]); // Room 2 ends at 20
        meetingRoomsHeap.enqueue([10, 1]); // Room 1 ends at 10
        meetingRoomsHeap.enqueue([20, 0]); // Room 0 ends at 20 (Tie breaker test case)
        meetingRoomsHeap.enqueue([5, 3]);  // Room 3 ends at 5

        // First out should be earliest time
        let top = meetingRoomsHeap.dequeue();
        assert(top[0] === 5 && top[1] === 3, "Earliest room to finish should be [5, 3]");

        // Next out
        top = meetingRoomsHeap.dequeue();
        assert(top[0] === 10 && top[1] === 1, "Next room to finish should be [10, 1]");

        // Tie Breaker Verification! 
        // Both room 0 and room 2 finish at Time = 20. Room 0 must win because 0 < 2.
        top = meetingRoomsHeap.dequeue();
        assert(top[0] === 20 && top[1] === 0, "Tie breaker failed! Lower room number 0 should beat room 2");

        top = meetingRoomsHeap.dequeue();
        assert(top[0] === 20 && top[1] === 2, "Last room should be [20, 2]");
    } catch (e) {
        console.error(e.message);
    }

    console.log("\n--- Test Suite Execution Complete ---");
}

// Execute the tests
runPriorityQueueTests();