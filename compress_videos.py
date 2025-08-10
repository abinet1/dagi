#!/usr/bin/env python3
"""
Video Compression Script for Portfolio
Compresses all videos to reduce file size while maintaining quality
"""

import os
import subprocess
import shutil
from pathlib import Path

def get_file_size(filepath):
    """Get file size in MB"""
    return os.path.getsize(filepath) / (1024 * 1024)

def compress_video(input_path, output_path, quality='28'):
    """
    Compress video using ffmpeg with H.264 codec
    Quality: 18-28 (lower = better quality, higher file size)
    """
    cmd = [
        'ffmpeg', '-i', input_path,
        '-c:v', 'libx264',           # Video codec
        '-crf', quality,             # Quality (28 = good balance)
        '-preset', 'medium',         # Encoding speed vs compression
        '-c:a', 'aac',              # Audio codec
        '-b:a', '128k',             # Audio bitrate
        '-movflags', '+faststart',   # Web optimization
        '-y',                       # Overwrite output
        output_path
    ]
    
    print(f"Compressing: {os.path.basename(input_path)}")
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error compressing {input_path}: {e}")
        return False

def process_videos():
    """Process all videos in the assets/videos directory"""
    videos_dir = Path("/home/phelix/Documents/dagi portfolio/assets/videos")
    
    if not videos_dir.exists():
        print("Videos directory not found!")
        return
    
    # Create backup directory
    backup_dir = Path("/home/phelix/Documents/dagi portfolio/assets/videos_original")
    backup_dir.mkdir(exist_ok=True)
    
    total_original_size = 0
    total_compressed_size = 0
    processed_count = 0
    
    # Find all video files
    video_extensions = ['.mp4', '.mov', '.MP4', '.MOV', '.avi', '.AVI']
    video_files = []
    
    for ext in video_extensions:
        video_files.extend(videos_dir.rglob(f'*{ext}'))
    
    print(f"Found {len(video_files)} video files to compress")
    
    for video_file in video_files:
        try:
            original_size = get_file_size(video_file)
            total_original_size += original_size
            
            # Create relative path for backup
            relative_path = video_file.relative_to(videos_dir)
            backup_path = backup_dir / relative_path
            backup_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Backup original
            print(f"Backing up: {video_file.name}")
            shutil.copy2(video_file, backup_path)
            
            # Create temporary compressed file
            temp_output = video_file.with_suffix(f'.compressed{video_file.suffix}')
            
            # Compress video
            if compress_video(str(video_file), str(temp_output)):
                compressed_size = get_file_size(temp_output)
                total_compressed_size += compressed_size
                
                # Replace original with compressed version
                shutil.move(temp_output, video_file)
                
                reduction = ((original_size - compressed_size) / original_size) * 100
                print(f"✅ {video_file.name}: {original_size:.1f}MB → {compressed_size:.1f}MB ({reduction:.1f}% reduction)")
                processed_count += 1
            else:
                print(f"❌ Failed to compress: {video_file.name}")
                # Remove temp file if it exists
                if temp_output.exists():
                    temp_output.unlink()
                    
        except Exception as e:
            print(f"Error processing {video_file}: {e}")
    
    # Summary
    total_reduction = ((total_original_size - total_compressed_size) / total_original_size) * 100 if total_original_size > 0 else 0
    
    print(f"\n🎬 COMPRESSION COMPLETE!")
    print(f"📊 Processed: {processed_count} videos")
    print(f"📉 Total size: {total_original_size:.1f}MB → {total_compressed_size:.1f}MB")
    print(f"💾 Space saved: {total_original_size - total_compressed_size:.1f}MB ({total_reduction:.1f}% reduction)")
    print(f"💿 Originals backed up to: {backup_dir}")

if __name__ == "__main__":
    print("🎬 Starting video compression for portfolio...")
    print("This may take several minutes depending on video sizes...")
    process_videos()