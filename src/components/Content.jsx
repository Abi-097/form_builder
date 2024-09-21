import { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Dot, X, GripVertical } from "lucide-react";
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
      onClick={onClick} // Attach onClick handler to open the drawer with respective component
      className={`flex items-center justify-around bg-gray-100 p-2 rounded-md w-full my-4 pl-3 hover:bg-gray-300 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      style={{ cursor: "pointer" }}
    >
      <GripVertical size={20} />
      <p className="w-full text-center text-xs">{text}</p>
      <X size={24} />
    </div>
  );
};
const Content = ({ onWelcomeDataChange, welcomeData }) => {
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

  // Add new draggable box based on type
  const addDraggableBox = (type) => {
    const newBox = {
      id: boxes.length + 1,
      text: type,
      component: type, // Store component type
    };
    setBoxes([...boxes, newBox]);
    toggleDialog(); // Close the dialog after adding
  };

  // Function to open drawer with the respective component
  const openComponent = (component) => {
    setActiveComponent(component); // Set active component to display in the drawer
    toggleDrawer();
  };
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Card
          onClick={() => openComponent("Welcome")}
          className="relative flex items-center bg-gray-100 p-3 rounded-md my-4 hover:bg-gray-300 cursor-pointer"
        >
          <Dot size={24} className="absolute" />
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
        <Button className="mt-4" onClick={toggleDialog}>
          Add Field
        </Button>
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
          />
        )}

        {activeComponent === "Email" && <Email />}

        {activeComponent === "Name" && <Name />}
      </Drawer>
      {/* Dialog for selecting draggable box type */}
      <Dialog open={dialogOpen} handler={toggleDialog}>
        <DialogBody>
          <p className="text-sm">Choose the field to add:</p>
          <div className="flex justify-around mt-4">
            <Button onClick={() => addDraggableBox("Name")} variant="outlined">
              Name
            </Button>
            <Button onClick={() => addDraggableBox("Email")} variant="outlined">
              Email
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
