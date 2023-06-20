function calculateMinCost() {
  const input = document.getElementById('ropes-input').value;
  const ropes = input.split(',').map(Number);

  // Function to calculate the minimum cost of connecting ropes
  function minimumCostOfRopes(ropes) {
    // Create a min heap using the ropes array
    const heap = new MinHeap(ropes);

    let totalCost = 0;

    // Keep connecting ropes until there is only one rope left in the heap
    while (heap.size() > 1) {
      const min1 = heap.extractMin();
      const min2 = heap.extractMin();

      const cost = min1 + min2;
      totalCost += cost;

      heap.insert(cost);
    }

    return totalCost;
  }

  // MinHeap class for creating a min heap data structure
  class MinHeap {
    constructor(arr = []) {
      this.heap = [];
      if (Array.isArray(arr)) {
        arr.forEach((item) => this.insert(item));
      }
    }

    size() {
      return this.heap.length;
    }

    insert(value) {
      this.heap.push(value);
      this.bubbleUp(this.heap.length - 1);
    }

    bubbleUp(index) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (parentIndex >= 0 && this.heap[parentIndex] > this.heap[index]) {
        [this.heap[parentIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[parentIndex],
        ];
        this.bubbleUp(parentIndex);
      }
    }

    extractMin() {
      const minValue = this.heap[0];
      const lastValue = this.heap.pop();

      if (this.heap.length > 0) {
        this.heap[0] = lastValue;
        this.sinkDown(0);
      }

      return minValue;
    }

    sinkDown(index) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestIndex = index;

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex !== index) {
        [this.heap[index], this.heap[smallestIndex]] = [
          this.heap[smallestIndex],
          this.heap[index],
        ];
        this.sinkDown(smallestIndex);
      }
    }
  }

  // Call the minimumCostOfRopes function and get the result
  const minCost = minimumCostOfRopes(ropes);

  // Display the result in the HTML element with id "result"
  const resultElement = document.getElementById('result');
  resultElement.textContent = minCost;
}
