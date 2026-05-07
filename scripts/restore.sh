#!/bin/bash

# Database restore script
# Usage: ./scripts/restore.sh <backup_file.sql.gz>

if [ -z "$1" ]; then
    echo "Usage: ./scripts/restore.sh <backup_file.sql.gz>"
    echo "Available backups:"
    ls -lh ./backups/*.sql.gz
    exit 1
fi

BACKUP_FILE=$1

# Load environment variables
source .env

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "Error: Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Extract database connection details
DB_URL=$DATABASE_URL

# Confirm restore
echo "WARNING: This will overwrite the current database!"
echo "Backup file: $BACKUP_FILE"
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Restore cancelled"
    exit 0
fi

# Decompress and restore
echo "Starting restore..."
gunzip -c $BACKUP_FILE | psql $DB_URL

echo "Restore completed successfully!"
