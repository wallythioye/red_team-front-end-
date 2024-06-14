// lib/api.js
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchData(endpoint) {
  const response = await fetch(`${apiUrl}${endpoint}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
}
