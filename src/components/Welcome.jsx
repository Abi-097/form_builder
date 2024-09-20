import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";

const Welcome = ({ onSave }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); // Set the uploaded image as base64 string
      };
      reader.readAsDataURL(file); // Read file as Data URL
    }
  };

  // Function to trigger the file input
  const triggerFileInput = () => {
    document.getElementById("image-upload").click(); // Trigger file input click
  };
  return (
    <div>
      <div className="my-4">
        <Input label="Title" className="mb-4" />
      </div>
      <div className="mb-4">
        <Input label="Description" className="mb-4" />
      </div>
      <div className="mb-4">
        <Input label="Button Text" className="mb-4" />
      </div>

      <div className="mb-4">
        <Button variant="outlined" className="mb-4" onClick={triggerFileInput}>
          Upload Image
        </Button>
        <input
          id="image-upload"
          type="file"
          className="hidden"
          onChange={handleUpload}
          accept="image/*"
        />
      </div>

      {/* Show the uploaded image preview */}
      {uploadedImage && (
        <div className="mb-4">
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="w-full h-32 object-cover rounded-md"
          />
        </div>
      )}
      <Button onClick={onSave} className="w-full">
        Save
      </Button>
    </div>
  );
};

export default Welcome;
