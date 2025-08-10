# Portfolio Media Assets Guide

## Folder Structure

Your portfolio media is organized as follows:

```
assets/
├── images/           # High-resolution photos and stills
│   ├── commercial/   # Commercial project photos
│   ├── events/       # Event photography
│   ├── film/         # Film production stills
│   ├── portraits/    # Portrait photography
│   ├── products/     # Product photography
│   └── realestate/   # Real estate photography
│
├── videos/           # Video files
│   ├── commercial/   # Commercial videos
│   ├── events/       # Event videos
│   ├── film/         # Film projects
│   └── realestate/   # Real estate videos
│
└── thumbnails/       # Preview images for portfolio grid
    ├── commercial/
    ├── events/
    ├── film/
    ├── portraits/
    └── realestate/
```

## Adding New Media

### For Images:
1. Place high-resolution images in the appropriate `images/[category]` folder
2. Recommended formats: JPG, PNG
3. Recommended resolution: 1920x1080 minimum for best quality

### For Videos:
1. Place video files in the appropriate `videos/[category]` folder
2. Supported formats: MP4, MOV
3. Recommended: MP4 with H.264 codec for best compatibility

### For Thumbnails:
1. Create a preview image (16:9 aspect ratio recommended)
2. Place in the corresponding `thumbnails/[category]` folder
3. Recommended size: 800x600px for faster loading

## Updating the Portfolio

To add new projects to your portfolio:

1. Add your media files to the appropriate folders
2. Edit `index.html` to add a new portfolio item:

```html
<div class="portfolio-item" data-category="[category]" data-type="video">
    <img src="assets/thumbnails/[category]/[thumbnail].jpg" alt="[Project Name]" class="portfolio-thumbnail">
    <div class="portfolio-overlay">
        <h3>[Project Title]</h3>
        <p>[Your Role]</p>
        <div class="portfolio-actions">
            <button class="play-btn" data-video="assets/videos/[category]/[video].mp4">▶ Play</button>
            <button class="view-btn" data-images="assets/images/[category]/[image1].jpg,assets/images/[category]/[image2].jpg">View Stills</button>
        </div>
    </div>
</div>
```

## Current Media Files

Your portfolio currently includes:

### Commercial
- Jewelry commercials
- Loft Hotel campaign
- Automotive showcases

### Events
- AmCham Business Forum
- ESX Corporate Events
- Wedding productions
- Health education series

### Film
- Lejenet Documentary

### Real Estate
- Reality Real Estate projects
- Global Bank properties

## Tips for Best Results

1. **Optimize file sizes**: Compress videos and images to balance quality and loading speed
2. **Consistent naming**: Use descriptive, lowercase filenames with hyphens (e.g., `wedding-teaser-2024.mp4`)
3. **Backup**: Keep original high-resolution files backed up separately
4. **Update regularly**: Add new projects as you complete them to keep your portfolio fresh

## Need Help?

If you need to modify the portfolio structure or add new features, edit the following files:
- `index.html` - Portfolio items and structure
- `styles.css` - Visual styling
- `script.js` - Interactive features and modal functionality