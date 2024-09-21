import { Box, Cloud, Trash2 } from "lucide-react";
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
  {
    label: "Design",
    value: "design",
    component: "",
  },
  {
    label: "Share",
    value: "share",
    component: "",
  },
  {
    label: "Replies",
    value: "replies",
    component: "",
  },
];

const FormBuilder = () => {
  const [welcomeData, setWelcomeData] = useState({
    title: "Welcome to our form",
    description: "This is a description of the form",
    buttonText: "Start",
    image: null,
  });
  const [emailData, setEmailData] = useState({
    email: "Enter you email",
    description: "This will help you contact",
  });
  const [imageAlignment, setImageAlignment] = useState("right");
  const [activeComponent, setActiveComponent] = useState("Welcome");

  const { formName } = useParams();

  // Handler for changes to welcomeData
  const handleWelcomeDataChange = (data) => {
    setWelcomeData(data); // Keep the single source of truth
  };

  // Handler for changes to emailData
  const handleEmailDataChange = (data) => {
    setEmailData(data); // Update email data state
  };

  // Function to handle input change from the right side
  const handleInputChange = (field, value) => {
    if (activeComponent === "Welcome") {
      setWelcomeData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    } else if (activeComponent === "Email") {
      setEmailData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="w-full max-w-[320px] bg-white p-4 flex flex-col h-full">
        <Breadcrumbs separator=">" className="bg-transparent">
          <a href="/" className="opacity-60 flex items-center gap-1">
            <Box size={12} /> <p className="text-xs">Dashboard</p>
          </a>
          <a href="#" className="opacity-60">
            <span className="text-xs">{formName}</span>
          </a>
        </Breadcrumbs>

        <Tabs id="custom-animation" value="content" className="flex-1">
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
            {data.map(({ value }) => (
              <TabPanel key={value} value={value} className="p-0">
                <Content
                  onWelcomeDataChange={handleWelcomeDataChange}
                  onEmailDataChange={handleEmailDataChange}
                  welcomeData={welcomeData}
                  emailData={emailData}
                  imageAlignment={imageAlignment}
                  onAlignmentChange={setImageAlignment}
                  onComponentSelect={setActiveComponent}
                />
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>

        {/* Button section at the bottom */}
        <div className="mt-auto flex items-center w-full gap-2">
          <Button
            className="w-full flex items-center gap-2 p-3"
            style={{ textTransform: "none" }}
          >
            <Cloud size={12} /> <span className="text-xs">Save & Publish</span>
          </Button>
          <Button
            className="w-full bg-transparent hover:bg-red-100 flex items-center justify-center gap-2 p-3 text-red-500"
            style={{ textTransform: "none" }}
          >
            <Trash2 size={12} /> <span className="text-xs">Delete</span>
          </Button>
        </div>
      </div>

      {/* Right side*/}

      <div
        className="flex-1 bg-darkbg p-8 rounded-xl m-2 shadow-lg flex flex-col justify-center items-center"
        style={{ paddingLeft: "15%", paddingRight: "15%" }}
      >
        <div className="w-full">
          {activeComponent === "Welcome" ? (
            <>
              <h2 className="text-2xl font-bold mb-4">
                <textarea
                  value={welcomeData.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  rows={1}
                  className="border border-transparent rounded p-2 w-[400px] transition duration-300 hover:border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent text-white resize-none overflow-hidden"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />
              </h2>

              <p className="text-xl text-gray-600 mb-4">
                <textarea
                  value={welcomeData.description || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={1}
                  className="border border-transparent rounded p-2 w-[400px] transition duration-300 hover:border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent text-white resize-none overflow-hidden"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />
              </p>
              <div className="bg-white rounded-full h-10  w-auto max-w-[150px] flex items-center p-4">
                <input
                  type="text"
                  value={welcomeData.buttonText || ""}
                  onChange={(e) =>
                    handleInputChange("buttonText", e.target.value)
                  }
                  className="hover:border-transparent focus:border-transparent focus:outline-none bg-transparent text-black w-full"
                />
              </div>
              {/* alignment */}
              {welcomeData.image && (
                <div
                  className={`mt-4 flex ${
                    imageAlignment === "right" ? "justify-end" : "justify-start"
                  }`}
                >
                  <img
                    src={welcomeData.image}
                    alt="Uploaded"
                    className="w-[200px] h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </>
          ) : activeComponent === "Email" ? (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  value={emailData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="text-xl rounded p-2 w-full focus:outline-none bg-transparent text-white"
                />
              </div>
              <div className="mb-4">
                <input
                  value={emailData.description || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="text-xl rounded p-2 w-full focus:outline-none bg-transparent text-white"
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
//
