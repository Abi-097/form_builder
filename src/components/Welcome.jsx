import { useEffect, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { AlignLeft, AlignRight, Upload } from "lucide-react";

const Welcome = ({ onSave, onDataChange, welcomeData, onAlignmentChange }) => {
  const [localData, setLocalData] = useState({ ...welcomeData });

  // Synchronize local state with global state
  useEffect(() => {
    setLocalData(welcomeData);
  }, [welcomeData]);

  // Function to handle changes
  const handleChange = (field, value) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onDataChange(updatedData);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleChange("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Function to trigger the file input
  const triggerFileInput = () => {
    document.getElementById("image-upload").click();
  };
  // Function to remove the uploaded image
  const handleRemoveImage = () => {
    handleChange("image", null);
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
        <Button
          variant="outlined"
          className="mb-4 flex items-center gap-2 p-2"
          onClick={triggerFileInput}
          style={{ textTransform: "none" }}
        >
          <Upload size={12} /> <span className="text-xs">Upload Image</span>
        </Button>
        <input
          id="image-upload"
          type="file"
          className="hidden"
          onChange={handleUpload}
          accept="image/*"
        />
      </div>

      {localData.image && (
        <div className="mb-4">
          <img
            src={localData.image}
            alt="Uploaded"
            className="w-full h-32 object-cover rounded-md"
          />
          <div className="flex items-center justify-center">
            <Button
              onClick={handleRemoveImage}
              variant="outlined"
              size="sm"
              className="mt-2 p-2"
              style={{ textTransform: "none" }}
            >
              Remove Image
            </Button>
          </div>{" "}
        </div>
      )}
      {/* Alignment buttons */}
      <div className="flex justify-around mb-4">
        <p className="my-auto text-sm text-black font-semibold">Placement</p>
        <Button
          onClick={() => onAlignmentChange("left")}
          variant="outlined"
          className="p-3"
        >
          <AlignLeft size={12} />
        </Button>
        <Button
          onClick={() => onAlignmentChange("right")}
          variant="outlined"
          className="p-3"
        >
          <AlignRight size={12} />
        </Button>
      </div>
      <div className="flex items-center justify-center w-full gap-2">
        <Button
          onClick={onSave}
          className="w-full gap-2 p-3"
          style={{ textTransform: "none" }}
        >
          Save
        </Button>
        <Button
          className="w-full bg-transparent hover:bg-red-100 gap-2 p-3 text-red-500"
          style={{ textTransform: "none" }}
        >
          Discard
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
