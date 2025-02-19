# Kong Deck Online

Kong Deck Online is a web-based interface for executing Kong Deck commands. It provides a simple and user-friendly way to interact with Kong Gateway using deck commands through a web browser.

## Features

- Web interface for executing deck commands
- Support for Kong Admin API endpoint configuration
- Admin token authentication support
- Easy-to-use command execution buttons
- Real-time command output display

## Local Development

### Prerequisites

- Node.js (v14 or later)
- npm
- deck CLI tool

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Open your browser and visit `http://localhost:3000`

## Docker Deployment

You can quickly deploy Kong Deck Online using Docker. The official image is available on Docker Hub:

```bash
docker pull wenhan/kong-deck-online
```

To run the container:

```bash
docker run -p 3000:80 wenhan/kong-deck-online
```

Then visit `http://localhost:3000` in your browser.

## Usage

1. Enter your Kong Admin API endpoint (e.g., `http://localhost:8001`)
2. If required, enter your Admin Token
3. Click either:
   - "Execute Deck Ping" to test the connection
   - "Execute Deck Dump" to export your Kong configuration
4. View the command output in the result area

## Docker Hub Repository

The Docker image is available at [wenhan/kong-deck-online](https://registry.hub.docker.com/r/wenhan/kong-deck-online). This image includes:

- Latest Ubuntu base image
- Node.js and npm
- deck CLI tool (v1.30.0)
- Kong Deck Online web application

## License

MIT
