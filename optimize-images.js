// optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertToWebP(inputPath, outputPath, quality = 80) {
    try {
        await sharp(inputPath)
            .webp({ quality })
            .toFile(outputPath);
        console.log(`✅ Converted: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    } catch (error) {
        console.error(`❌ Failed to convert ${inputPath}:`, error.message);
    }
}

async function optimizeAllImages() {
    console.log('🔄 Starting image optimization...\n');
    
    // Public assets folder
    const assetsDir = path.join(__dirname, 'public', 'assets');
    const photosDir = path.join(assetsDir, 'photos');
    
    // List of images to convert
    const images = [
        // Background images
        path.join(assetsDir, 'bio.jpg'),
        path.join(assetsDir, 'contact.jpg'), 
        path.join(assetsDir, 'home.jpg'),
        path.join(assetsDir, 'media1.jpg'),
        path.join(assetsDir, 'media2.jpg'),
        path.join(assetsDir, 'media.jpg'),
        
        // Photo gallery
        path.join(photosDir, 'photo1.jpg'),
        path.join(photosDir, 'photo2.jpg'),
        path.join(photosDir, 'photo3.jpg'),
        path.join(photosDir, 'photo4.jpg'),
        path.join(photosDir, 'photo5.jpg'),
        path.join(photosDir, 'photo6.jpg')
    ];
    
    // Filter only existing files
    const existingImages = images.filter(img => fs.existsSync(img));
    
    console.log(`Found ${existingImages.length} images to optimize:\n`);
    
    // Convert each image
    for (const imagePath of existingImages) {
        const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        await convertToWebP(imagePath, webpPath);
    }
    
    console.log('\n✨ Image optimization complete!');
    
    // Create optimized build folder structure
    console.log('\n📁 Creating optimized build structure...');
    
    const buildAssetsDir = path.join(__dirname, 'build', 'assets');
    const buildPhotosDir = path.join(buildAssetsDir, 'photos');
    
    // Copy WebP images to build folder
    for (const imagePath of existingImages) {
        const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const buildWebpPath = webpPath.replace('public', 'build');
        
        // Ensure build directory exists
        const buildDir = path.dirname(buildWebpPath);
        if (!fs.existsSync(buildDir)) {
            fs.mkdirSync(buildDir, { recursive: true });
        }
        
        // Copy WebP file to build folder
        if (fs.existsSync(webpPath)) {
            fs.copyFileSync(webpPath, buildWebpPath);
            console.log(`📦 Copied to build: ${path.basename(webpPath)}`);
        }
    }
    
    console.log('\n✅ All images optimized and ready for deployment!');
}

// Run optimization
optimizeAllImages().catch(console.error);