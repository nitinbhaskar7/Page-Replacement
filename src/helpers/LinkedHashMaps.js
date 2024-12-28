export class LinkedHashSet {
    constructor() {
        this.map = new Map(); // Using Map to maintain order and uniqueness
    }

    // Add an element to the set
    add(element) {
        if (!this.map.has(element)) {
            this.map.set(element, true); // Store element with a placeholder value
        }
    }

    // Check if the set contains an element
    contains(element) {
        return this.map.has(element);
    }

    // Remove an element from the set
    remove(element) {
        this.map.delete(element);
    }

    // Delete the first element (based on insertion order)
    deleteFirst() {
        const firstKey = this.map.keys().next().value; // Get the first key
        if (firstKey !== undefined) {
            this.map.delete(firstKey);
        }
    }

    // Get the size of the set
    size() {
        return this.map.size;
    }

    // Check if the set is empty
    isEmpty() {
        return this.map.size === 0;
    }

    // Get all elements in insertion order
    elements() {
        return Array.from(this.map.keys());
    }

    // Clear all elements from the set
    clear() {
        this.map.clear();
    }

    // Iterate over elements
    forEach(callback) {
        for (const element of this.map.keys()) {
            callback(element);
        }
    }
}
