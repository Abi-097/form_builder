import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";

const Name = ({ onSave }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Input label="Title" className="my-4" />
      <Input label="Name Field 2" className="mb-4" />
      <Button variant="outlined" component="label" className="mb-4">
        Upload Image
        <input type="file" className="hidden" onChange={handleUpload} />
      </Button>
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

export default Name;
