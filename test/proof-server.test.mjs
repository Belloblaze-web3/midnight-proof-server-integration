const baseUrl = process.env.PROOF_SERVER_URL ?? 'http://127.0.0.1:6300';

const response = await fetch(`${baseUrl}/ready`);
const body = await response.text();

if (!response.ok) {
  throw new Error(`Proof server is not ready: HTTP ${response.status} ${body}`);
}

console.log(`Proof server is ready at ${baseUrl}/ready`);
