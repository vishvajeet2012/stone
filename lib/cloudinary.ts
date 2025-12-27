import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with env variables
// User's env: CLOUND_NAME, CLOUD_API_KEY, CLOUD_SECRET
cloudinary.config({
  cloud_name: process.env.CLOUND_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY || process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUD_SECRET || process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Helper to upload buffer to Cloudinary
export async function uploadToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string;
    public_id?: string;
    resource_type?: 'image' | 'video' | 'raw' | 'auto';
  } = {}
): Promise<{
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'stone-app',
        public_id: options.public_id,
        resource_type: options.resource_type || 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            url: result.url,
            format: result.format,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
          });
        } else {
          reject(new Error('No result from Cloudinary'));
        }
      }
    ).end(buffer);
  });
}

// Helper to delete image from Cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}
