# Midnight Proof Server Integration

A minimal, reproducible Node.js integration-test project for Midnight smart-contract applications. GitHub Actions starts the version-pinned Midnight proof server as a temporary service, waits for readiness, and runs the integration checks.

## What this project does

- Runs `midnightntwrk/proof-server:8.1.3` as a GitHub Actions service.
- Exposes the service to workflow steps at `http://127.0.0.1:6300`.
- Waits for the `/ready` endpoint before testing.
- Runs a Node.js smoke test against the proof server.

The proof server is temporary and exists only for the lifetime of the GitHub Actions job. It is not a public or persistent endpoint.

## Local development

The current sandbox cannot run Docker bridge networking because its kernel does not provide the required `iptables` `raw` table. Run the service on a full Ubuntu host or use the GitHub Actions workflow.

On a compatible Docker host:

```bash
sudo docker run --rm \
  --name midnight-proof-server \
  -p 127.0.0.1:6300:6300 \
  midnightntwrk/proof-server:8.1.3 \
  midnight-proof-server -v
```

In another terminal:

```bash
npm ci
npm test
```

## Version compatibility

The proof-server tag is pinned intentionally. Confirm the proof-server, Compact, Midnight.js, node, and network versions against the [Midnight compatibility matrix](https://docs.midnight.network/relnotes/support-matrix) before changing it. Do not use `latest` for reproducible CI.

## Security

Proof requests can contain private transaction data. Keep a proof server local or reachable only through a private, encrypted channel. Do not expose port 6300 directly to the public internet.
