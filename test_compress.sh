#!/bin/bash

# Test compression on one video
cd "/home/phelix/Documents/dagi portfolio/assets/videos"

# Find the smallest video for quick test
smallest_video=$(find . -name "*.mp4" -o -name "*.mov" | xargs ls -la | sort -k5 -n | head -1 | awk '{print $NF}')

echo "Testing compression on: $smallest_video"

# Get original size
original_size=$(du -h "$smallest_video" | cut -f1)
echo "Original size: $original_size"

# Compress
ffmpeg -i "$smallest_video" \
  -c:v libx264 \
  -crf 28 \
  -preset medium \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -y "${smallest_video%.mp4}_compressed.mp4" 2>/dev/null

# Get compressed size
if [ -f "${smallest_video%.mp4}_compressed.mp4" ]; then
    compressed_size=$(du -h "${smallest_video%.mp4}_compressed.mp4" | cut -f1)
    echo "Compressed size: $compressed_size"
    echo "Test compression completed successfully!"
else
    echo "Compression failed"
fi