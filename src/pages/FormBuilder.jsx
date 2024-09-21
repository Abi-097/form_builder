// import React from "react";
import { Box } from "lucide-react";
import {
  Breadcrumbs,
  Button,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Content from "../components/Content";
import { useParams } from "react-router-dom";
import { useState } from "react";

const data = [
  {
    label: "Content",
    value: "content",
    component: <Content />,
  },
];

const FormBuilder = () => {
  const [welcomeData, setWelcomeData] = useState({
    title: "",
    description: "",
    buttonText: "",
    image: null,
  });
  const { formName } = useParams();

  // Handler for changes to welcomeData
  const handleWelcomeDataChange = (data) => {
    setWelcomeData(data); // Keep the single source of truth
  };

  // Function to handle input change from the right side
  const handleInputChange = (field, value) => {
    setWelcomeData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  return (
    <div className="flex h-screen">
      {/* Left side*/}
      <div className="w-full max-w-[320px] bg-white p-4">
        <Breadcrumbs separator=">" className="bg-transparent">
          <a href="/" className="opacity-60 flex items-center gap-1">
            <Box size={12} /> <p className="text-xs">Dashboard</p>
          </a>
          <a href="#" className="opacity-60">
            <span className="text-xs">{formName}</span>
          </a>
        </Breadcrumbs>
        <Tabs id="custom-animation" value="content" className="">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value} className="px-1 z-0">
                <p className="text-sm text-gray-600">{label}</p>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            {data.map(({ value, component }) => (
              <TabPanel key={value} value={value} className="p-0">
                {value === "content" ? (
                  <Content
                    onWelcomeDataChange={handleWelcomeDataChange}
                    welcomeData={welcomeData}
                  />
                ) : (
                  component
                )}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
        <Button>Button</Button>
      </div>

      {/* Right side*/}
      <div className="flex-1 bg-darkbg p-8 rounded-xl m-2 shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          <input
            type="text"
            value={welcomeData.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </h2>

        <p className="text-gray-600 mb-4">
          <textarea
            value={welcomeData.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </p>
        <Button>
          <input
            type="text"
            value={welcomeData.buttonText || ""}
            onChange={(e) => handleInputChange("buttonText", e.target.value)}
            className="border border-gray-300 rounded p-2 text-black"
          />
        </Button>
        {/* Show the uploaded image */}
        {welcomeData.image && (
          <div className="mt-4">
            <img
              src={welcomeData.image}
              alt="Uploaded"
              className="w-full h-32 object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
