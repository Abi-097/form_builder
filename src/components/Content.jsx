import { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { X, GripVertical, Menu, Plus, Mail } from "lucide-react";
import {
  Card,
  Button,
  Drawer,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

import Welcome from "./Welcome";
import Email from "./Email";
import Name from "./Name";

const ItemTypes = {
  BOX: "box",
};

const DraggableBox = ({ id, text, index, moveBox, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOX,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    hover(item) {
      if (item.index !== index) {
        moveBox(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={onClick}
      className={`flex items-center justify-around bg-gray-100 p-2 rounded-md w-full my-4 pl-3 hover:bg-gray-300 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      style={{ cursor: "pointer" }}
    >
      <GripVertical size={15} />
      <p className="w-full text-center text-xs">{text}</p>
      <X size={10} />
    </div>
  );
};
const Content = ({
  onWelcomeDataChange,
  onEmailDataChange,
  welcomeData,
  emailData,
  onAlignmentChange,
  onComponentSelect,
}) => {
  const [boxes, setBoxes] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Welcome");

  // Function to move the draggable box
  const moveBox = (fromIndex, toIndex) => {
    const updatedBoxes = [...boxes];
    const [movedBox] = updatedBoxes.splice(fromIndex, 1);
    updatedBoxes.splice(toIndex, 0, movedBox);
    setBoxes(updatedBoxes);
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const addDraggableBox = (type) => {
    const newBox = {
      id: boxes.length + 1,
      text: type,
      component: type,
    };
    setBoxes([...boxes, newBox]);
    toggleDialog();
  };

  const openComponent = (component) => {
    setActiveComponent(component);
    onComponentSelect(component);
    toggleDrawer();
  };
  return (
    <>
      <div className="flex items-center gap-2 mt-4">
        <Menu size={13} />{" "}
        <p className="text-[13px] text-black font-semibold">Steps</p>
      </div>
      <p className="text-xs mt-2 mb-4">
        The steps users will take to complete the form
      </p>
      <DndProvider backend={HTML5Backend}>
        <Card
          onClick={() => openComponent("Welcome")}
          className="relative flex items-center bg-gray-100 p-3 rounded-md my-4 hover:bg-gray-300 cursor-pointer"
        >
          <p className="w-full text-center text-xs">Welcome Screen</p>
        </Card>

        {/* Draggable Boxes */}
        {boxes.map((box, index) => (
          <DraggableBox
            key={box.id}
            className="cursor-pointer"
            id={box.id}
            index={index}
            text={box.text}
            moveBox={moveBox}
            onClick={() => openComponent(box.component)}
          />
        ))}
        <Button
          className="mt-4 border border-gray-500 bg-transparent text-black p-1 px-2"
          onClick={toggleDialog}
          style={{ textTransform: "none" }}
        >
          <span className="flex items-center gap-2">
            <Plus size={12} /> <span className="text-xs">Add Field</span>
          </span>
        </Button>
        <Card
          onClick={() => openComponent("End")}
          className="relative flex items-center bg-gray-100 p-3 rounded-md my-4 hover:bg-gray-300 cursor-pointer"
        >
          <p className="w-full text-center text-xs">End Screen</p>
        </Card>
      </DndProvider>
      <Drawer
        open={drawerOpen}
        // onClose={toggleDrawer}
        onClose={() => {}}
        className="p-6"
        size={320}
      >
        <div className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Settings
          </Typography>
          <X size={18} onClick={toggleDrawer} className="cursor-pointer" />
        </div>
        {activeComponent === "Welcome" && (
          <Welcome
            onSave={toggleDrawer}
            onDataChange={onWelcomeDataChange}
            welcomeData={welcomeData}
            onAlignmentChange={onAlignmentChange}
          />
        )}

        {activeComponent === "Email" && (
          <Email
            onSave={toggleDrawer}
            onDataChange={onEmailDataChange}
            emailData={emailData}
          />
        )}

        {activeComponent === "Name" && <Name />}
      </Drawer>
      {/* Dialog for selecting draggable box type */}
      <Dialog open={dialogOpen} handler={toggleDialog}>
        <DialogBody>
          <p className="text-lg text-black font-semibold">Add field</p>
          <div className="flex justify-left mt-4">
            {/* <Button onClick={() => addDraggableBox("Name")} variant="outlined">
              Name
            </Button> */}
            <Button
              onClick={() => addDraggableBox("Email")}
              variant="outlined"
              className="flex items-center justify-center gap-2 border-none"
            >
              <Mail size={14} /> <p className="text-sm">Email</p>
            </Button>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={toggleDialog}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Content;
