#!/bin/bash

# Create backup directory
BACKUP_DIR="./image_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "Starting image compression..."
echo "Backing up images to: $BACKUP_DIR"

# Process JPG/JPEG files
for img in ./assets/images/**/*.{jpg,jpeg,JPG,JPEG}; do
    if [ -f "$img" ]; then
        # Get relative path for backup structure
        REL_PATH="${img#./}"
        BACKUP_PATH="$BACKUP_DIR/$REL_PATH"
        
        # Create backup directory structure
        mkdir -p "$(dirname "$BACKUP_PATH")"
        
        # Backup original
        cp "$img" "$BACKUP_PATH"
        
        # Get original size
        ORIG_SIZE=$(stat -c%s "$img")
        
        # Compress image (quality 85%, strip metadata)
        convert "$img" -quality 85 -strip "$img"
        
        # Get new size
        NEW_SIZE=$(stat -c%s "$img")
        
        # Calculate savings
        if [ $ORIG_SIZE -gt 0 ]; then
            SAVINGS=$((100 - (NEW_SIZE * 100 / ORIG_SIZE)))
            echo "Compressed: $img (${SAVINGS}% reduction)"
        fi
    fi
done

# Process PNG files
for img in ./assets/images/**/*.{png,PNG}; do
    if [ -f "$img" ]; then
        # Get relative path for backup structure
        REL_PATH="${img#./}"
        BACKUP_PATH="$BACKUP_DIR/$REL_PATH"
        
        # Create backup directory structure
        mkdir -p "$(dirname "$BACKUP_PATH")"
        
        # Backup original
        cp "$img" "$BACKUP_PATH"
        
        # Get original size
        ORIG_SIZE=$(stat -c%s "$img")
        
        # Compress PNG (convert to 8-bit if possible, strip metadata)
        convert "$img" -strip -depth 8 "$img"
        
        # Get new size
        NEW_SIZE=$(stat -c%s "$img")
        
        # Calculate savings
        if [ $ORIG_SIZE -gt 0 ]; then
            SAVINGS=$((100 - (NEW_SIZE * 100 / ORIG_SIZE)))
            echo "Compressed: $img (${SAVINGS}% reduction)"
        fi
    fi
done

echo ""
echo "Compression complete!"
echo "Original images backed up to: $BACKUP_DIR"
echo ""
echo "Size comparison:"
du -sh "$BACKUP_DIR" 2>/dev/null | awk '{print "Original size: " $1}'
du -sh ./assets/images 2>/dev/null | awk '{print "Compressed size: " $1}'