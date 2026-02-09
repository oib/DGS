#!/bin/bash

# DGS Learning Platform Service Manager
# A simple systemd-like service manager for the development server

SERVICE_NAME="dgs-platform"
SERVICE_DIR="/home/oib/windsurf/gebärdensprache"
PID_FILE="/tmp/dgs-platform.pid"
LOG_FILE="/tmp/dgs-platform.log"

case "$1" in
    start)
        if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
            echo "✓ $SERVICE_NAME is already running (PID: $(cat $PID_FILE))"
            exit 0
        fi
        
        echo "🚀 Starting $SERVICE_NAME..."
        cd "$SERVICE_DIR"
        nohup npm run dev > "$LOG_FILE" 2>&1 &
        echo $! > "$PID_FILE"
        
        sleep 3
        if kill -0 $(cat "$PID_FILE") 2>/dev/null; then
            echo "✓ $SERVICE_NAME started successfully (PID: $(cat $PID_FILE))"
            echo "📍 Access at: http://localhost:3100"
            echo "📋 Logs: $LOG_FILE"
        else
            echo "✗ Failed to start $SERVICE_NAME"
            rm -f "$PID_FILE"
            exit 1
        fi
        ;;
        
    stop)
        if [ ! -f "$PID_FILE" ]; then
            echo "✗ $SERVICE_NAME is not running"
            exit 1
        fi
        
        PID=$(cat "$PID_FILE")
        echo "🛑 Stopping $SERVICE_NAME (PID: $PID)..."
        kill $PID 2>/dev/null
        
        # Wait for graceful shutdown
        for i in {1..10}; do
            if ! kill -0 $PID 2>/dev/null; then
                break
            fi
            sleep 1
        done
        
        # Force kill if still running
        if kill -0 $PID 2>/dev/null; then
            echo "⚡ Force killing $SERVICE_NAME..."
            kill -9 $PID 2>/dev/null
        fi
        
        rm -f "$PID_FILE"
        echo "✓ $SERVICE_NAME stopped"
        ;;
        
    restart)
        echo "🔄 Restarting $SERVICE_NAME..."
        $0 stop
        sleep 2
        $0 start
        ;;
        
    status)
        if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
            PID=$(cat "$PID_FILE")
            echo "✓ $SERVICE_NAME is running (PID: $PID)"
            echo "📍 Access at: http://localhost:3100"
            echo "📋 Logs: $LOG_FILE"
            
            # Show recent logs
            echo ""
            echo "📝 Recent logs (last 10 lines):"
            tail -10 "$LOG_FILE" 2>/dev/null || echo "No logs available"
        else
            echo "✗ $SERVICE_NAME is not running"
            rm -f "$PID_FILE"
        fi
        ;;
        
    logs)
        if [ -f "$LOG_FILE" ]; then
            echo "📋 $SERVICE_NAME logs:"
            tail -f "$LOG_FILE"
        else
            echo "✗ No log file found"
        fi
        ;;
        
    *)
        echo "Usage: $0 {start|stop|restart|status|logs}"
        echo ""
        echo "Commands:"
        echo "  start   - Start the development server"
        echo "  stop    - Stop the development server"
        echo "  restart - Restart the development server"
        echo "  status  - Show service status and recent logs"
        echo "  logs    - Follow the log output"
        exit 1
        ;;
esac
