import { useEffect, useState } from "react";
import { Input, Button } from "@material-tailwind/react";

const Welcome = ({ onSave, onDataChange, welcomeData }) => {
  // const [uploadedImage, setUploadedImage] = useState(welcomeData.image || "");
  // const [title, setTitle] = useState(welcomeData.title || "");
  // const [description, setDescription] = useState(welcomeData.description || "");
  // const [buttonText, setButtonText] = useState(welcomeData.buttonText || "");

  const [localData, setLocalData] = useState({ ...welcomeData });

  // Synchronize local state with global state
  useEffect(() => {
    setLocalData(welcomeData);
  }, [welcomeData]);

  // Function to handle changes
  const handleChange = (field, value) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onDataChange(updatedData); // Update the main welcomeData
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleChange("image", reader.result); // Set the uploaded image as base64 string
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
        <Input
          label="Title"
          className="mb-4"
          value={localData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Description"
          className="mb-4"
          value={localData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Button Text"
          className="mb-4"
          value={localData.buttonText || ""}
          onChange={(e) => handleChange("buttonText", e.target.value)}
        />
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
      {localData.image && (
        <div className="mb-4">
          <img
            src={localData.image}
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
