# DGS Learning Platform Service Manager

A simple systemd-like service manager for the Next.js development server.

## Usage

```bash
./service.sh {start|stop|restart|status|logs}
```

## Commands

- **start** - Start the development server
- **stop** - Stop the development server  
- **restart** - Restart the development server
- **status** - Show service status and recent logs
- **logs** - Follow the log output (tail -f)

## Examples

```bash
# Start the server
./service.sh start

# Check status
./service.sh status

# View logs
./service.sh logs

# Stop the server
./service.sh stop

# Restart the server
./service.sh restart
```

## Features

- Background process management with PID tracking
- Graceful shutdown with force kill fallback
- Log file management
- Status monitoring
- Easy restart functionality

The service will:
- Start on port 3100
- Log output to `/tmp/dgs-platform.log`
- Store PID in `/tmp/dgs-platform.pid`
- Provide systemd-like command interface
