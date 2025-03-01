# Kong Deck Online

Kong Deck Online is a web-based interface for executing Kong Deck commands. It provides a simple and user-friendly way to interact with Kong Gateway using deck commands through a web browser. The tool supports both Kong Enterprise and Konnect modes, making it versatile for different Kong deployment scenarios.

## Features

- Web interface for executing deck commands
- Support for both Kong Enterprise and Konnect modes
  - Kong Admin API endpoint configuration and admin token configuration
  - Konnect Control Plane name and Personal Access Token configuration
- Easy-to-use command execution buttons
  - Support ping and dump operations
- Real-time command output display
- Modern and responsive user interface

## Local Development

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)
- deck CLI tool (v1.30.0 or later)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/xibuka/kong-deck-online.git
cd kong-deck-online
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and visit `http://localhost:3000`

## Docker Deployment

Kong Deck Online is available as a Docker image for easy deployment. Pull the official image from Docker Hub:

```bash
docker pull wenhan/kong-deck-online
```

To run the container:

```bash
docker run -p 3000:80 wenhan/kong-deck-online
```

Then visit `http://localhost:3000` in your browser.

## Usage

### Kong Enterprise Mode

0. Select "Enterprise" mode
1. Enter your Kong Admin API endpoint (e.g., `http://my.konggateway.com:8001`)
2. If required, enter your Admin Token
3. Choose an operation:
   - "Ping" to test the connection
   - "Dump" to export your Kong configuration
4. View the command output in the result area

### Konnect Mode

0. Select "Konnect" mode
1. Enter your Konnect Control Plane name
2. Provide your Konnect Personal Access Token
3. Choose an operation:
   - "Ping" to verify connectivity
   - "Dump" to export your Konnect configuration
4. View the command output in the result area

## Docker Hub Repository

The Docker image is available at [wenhan/kong-deck-online](https://registry.hub.docker.com/r/wenhan/kong-deck-online). This image includes:

- Latest Ubuntu base image
- Node.js v16 and npm v8
- deck CLI tool (v1.30.0)
- Kong Deck Online web application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
