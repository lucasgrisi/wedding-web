#!/bin/bash

# Thresholds
MAX_CPU_LOAD=2.0     # avg load over 1 min
MAX_MEM_USAGE=90     # in percent
MAX_DISK_USAGE=90    # in percent

# Hostname for reference
HOST=$(hostname)

# Get metrics
CPU_LOAD=$(awk '{print $1}' /proc/loadavg)
MEM_USAGE=$(free | awk '/Mem/ { printf("%.0f"), $3/$2 * 100 }')
DISK_USAGE=$(df / | awk 'END { print $5 }' | tr -d '%')

# Check if critical
ALERTS=()

if (( $(echo "$CPU_LOAD > $MAX_CPU_LOAD" | bc -l) )); then
  ALERTS+=("HIGH CPU Load: $CPU_LOAD")
fi

if [ "$MEM_USAGE" -gt "$MAX_MEM_USAGE" ]; then
  ALERTS+=("HIGH Memory Usage: $MEM_USAGE%")
fi

if [ "$DISK_USAGE" -gt "$MAX_DISK_USAGE" ]; then
  ALERTS+=("HIGH Disk Usage: $DISK_USAGE%")
fi

# If any alerts, log and send email
if [ ${#ALERTS[@]} -gt 0 ]; then
  MESSAGE="[$(date)] ALERT on $HOST\n\n${ALERTS[*]}"
  echo -e "$MESSAGE" >> /var/log/resource_monitor.log
  
  # Optional: Send an email (requires mailx installed and configured)
  echo -e "$MESSAGE" | mail -s "⚠️ EC2 Resource Alert on $HOST" you@example.com
fi
