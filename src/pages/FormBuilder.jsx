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

const data = [
  {
    label: "Content",
    value: "content",
    component: <Content />,
  },
  {
    label: "Design",
    value: "design",
    component: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
  },

  {
    label: "Share",
    value: "share",
    component: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
  },

  {
    label: "Replies",
    value: "replies",
    component: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
  },
];

const FormBuilder = () => {
  const { formName } = useParams();
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
                {component}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
        <Button>Button</Button>
      </div>

      {/* Right side: 85% width with shadow and rounded corners */}
      <div className="flex-1 bg-darkbg p-8 rounded-xl m-2 shadow-lg">
        {/* Content for the right side */}
        <h2 className="text-2xl font-semibold">Form Builder</h2>
        <p>This is where the form will be built.</p>
      </div>
    </div>
  );
};

export default FormBuilder;
