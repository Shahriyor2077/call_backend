@echo off
REM Database backup script for Windows
REM Usage: scripts\backup.bat

REM Create backup directory
if not exist "backups" mkdir backups

REM Generate filename with timestamp
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set TIMESTAMP=%datetime:~0,8%_%datetime:~8,6%
set BACKUP_FILE=backups\educrmdb_backup_%TIMESTAMP%.sql

REM Load DATABASE_URL from .env
for /f "tokens=1,2 delims==" %%a in (.env) do (
    if "%%a"=="DATABASE_URL" set DB_URL=%%b
)

echo Starting backup...
pg_dump %DB_URL% > %BACKUP_FILE%

echo Backup completed: %BACKUP_FILE%
echo.
echo To restore: psql %DB_URL% < %BACKUP_FILE%
