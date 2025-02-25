function sum_to_n_a(n: number): number {
  // Big O: O(n) time complexity
  let result = 0;
	for (let val = 1; val <= n; val++) {
    result += val;
  }
	return result;
}

function sum_to_n_b(n: number): number {
  // Big O: O(n) space complexity
	if (n === 1) {
    return 1;
  }

	return n + sum_to_n_b(n - 1);
}

function sum_to_n_c(n: number): number {
  // Big O: O(1) time complexity
  return n * (n + 1) / 2;
}
