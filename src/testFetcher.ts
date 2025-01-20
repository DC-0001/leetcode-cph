import { fetchTestCases } from './fetcher';

async function testFetch() {
  const url = 'https://leetcode.com/problems/two-sum/'; // Example LeetCode problem URL
  const test_Cases = await fetchTestCases(url);
  console.log('Fetched Test Cases:', test_Cases);
}

testFetch();