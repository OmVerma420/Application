import multer from "multer";
import path from "path";

// Use memoryStorage to store the file as a buffer
const storage = multer.memoryStorage();

// Filter to allow only specific image file types
const fileFilter = (req, file, cb) => {
  const allowed = [".jpg", ".jpeg", ".png", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (!allowed.includes(ext)) {
    // Reject the file
    return cb(new Error("Only image files (.jpg, .jpeg, .png, .webp) are allowed!"), false);
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter, 
});

