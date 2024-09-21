import { Input, Button, Switch, Tooltip } from "@material-tailwind/react";
import { useState } from "react";

const Email = ({ onDataChange, emailData, onSave }) => {
  const [isRequired, setIsRequired] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleInputChange = (field, value) => {
    onDataChange({ ...emailData, [field]: value });

    if (field === "email") {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setEmailError(emailValid ? "" : "Invalid email format");
    }

    if (field === "description") {
      setDescriptionError("");
    }
  };

  const handleSwitchChange = (checked) => {
    setIsRequired(checked);
    if (!checked) {
      setEmailError("");
      setDescriptionError("");
    }
  };

  const handleSave = () => {
    let valid = true;

    if (isRequired) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailData.email);
      const descriptionValid =
        emailData.description && emailData.description.trim() !== "";

      if (!emailValid) {
        setEmailError("Invalid email format");
        valid = false;
      }

      if (!descriptionValid) {
        setDescriptionError("Description is required");
        valid = false;
      }
    }

    if (valid) {
      onSave();
    }
  };
  return (
    <div>
      <div className="my-4">
        <Input
          label="Email"
          className="mb-4"
          value={emailData.email || ""}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required={isRequired}
          error={!!emailError}
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>

      <div className="mb-4">
        <Input
          label="Description"
          value={emailData.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="mb-4"
          required={isRequired}
          error={!!descriptionError} // Set error state for visual feedback
        />
        {descriptionError && (
          <p className="text-red-500 text-sm">{descriptionError}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Switch
          checked={isRequired}
          onChange={(e) => handleSwitchChange(e.target.checked)}
        />
        <p>Required</p>
      </div>
      <div className="flex items-center justify-center w-full gap-2">
        <Button
          onClick={handleSave}
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

export default Email;
