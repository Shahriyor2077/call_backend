#!/bin/bash

# Database backup script
# Usage: ./scripts/backup.sh

# Load environment variables
source .env

# Backup directory
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

# Generate filename with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/educrmdb_backup_$TIMESTAMP.sql"

# Extract database connection details from DATABASE_URL
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
DB_URL=$DATABASE_URL

# Perform backup
echo "Starting backup..."
pg_dump $DB_URL > $BACKUP_FILE

# Compress backup
gzip $BACKUP_FILE
echo "Backup completed: ${BACKUP_FILE}.gz"

# Keep only last 30 days of backups
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
echo "Old backups cleaned up"

# Optional: Upload to cloud storage (uncomment if needed)
# aws s3 cp ${BACKUP_FILE}.gz s3://your-bucket/backups/
