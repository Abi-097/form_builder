import { useState } from "react";
import { ChevronRight } from "lucide-react";
import twoStars from "../assets/Images";
import {
  Button,
  Card,
  CardBody,
  // CardFooter,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formName, setFormName] = useState(""); // State for the input value
  const [forms, setForms] = useState([]);

  const handleOpen = () => setOpen(!open);

  const handleCreateForm = () => {
    if (formName.trim()) {
      setForms([...forms, formName]); // Add the new form to the list of forms
      setFormName(""); // Clear the input field
      setOpen(false); // Close the dialog
      navigate(`/form-builder/${formName}`); // Navigate to FormBuilder with form name
    }
  };

  const handleCardClick = (formName) => {
    navigate(`/form-builder/${formName}`); // Navigate to FormBuilder when card is clicked
  };

  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="w-full max-w-[320px] bg-white p-4">hello</div>

      {/* Right side */}
      <div className="flex-1 bg-white p-8 rounded-xl m-2 shadow-xl border">
        {/* Header with emoji and button */}
        <div className="flex justify-between items-center mb-8 lg:mb-0">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            Hey Buddy <span className="waving-hand">👋</span>
          </h1>
          {/* Button for lg and xl on same row, for smaller screens it will move */}
          <button className="hidden lg:block px-4 py-2 bg-blue-500 text-white rounded-lg">
            Small Button
          </button>
        </div>

        <p className="text-lg font-semibold mb-4">My Forms</p>

        {/* Button under "My Forms" for md, sm, and xs */}
        <button className="block w-full lg:hidden mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Small Button
        </button>

        {/* Boxes layout */}
        <div className="flex flex-wrap lg:flex-nowrap gap-3 h-[14rem]">
          {/* First bigger box */}
          <div className="w-full sm:w-full md:w-full lg:w-[65%] xl:w-[65%] p-6 rounded-lg border shadow-md h-[14rem]">
            <p className="text-[#71717a] text-lg">Form replies 0</p>
          </div>

          {/* Second smaller box */}
          <div
            className="w-full sm:w-full md:w-full lg:w-[35%] xl:w-[35%] p-6 rounded-lg border shadow-md h-[14rem]"
            style={{
              background:
                "linear-gradient(90deg, rgba(253,253,253,1) 0%, rgba(234,235,239,1) 77%)",
            }}
          >
            <div className="flex items-center bg-[#D1D5DB] p-1 gap-1 max-w-max rounded-lg">
              <img src={twoStars} alt="two-stars" width={15} height={15} />
              <p className="text-xs">New</p>
            </div>

            <p className="text-lg font-semibold">AI-powered form generation</p>
            <p className="text-sm">
              AI Forms understands your needs and generates tailored forms based
              on your specific requirements.
            </p>
            <div className="flex items-center text-blue-700 font-semibold">
              <p className="text-sm ">Try it now</p>
              <ChevronRight size={15} />
            </div>
          </div>
        </div>

        <p className="lg:pt-10 pt-[17rem] text-gray-600 text-sm">
          Recent forms
        </p>
        <div className="flex flex-wrap gap-3">
          <Card
            onClick={() => handleOpen()}
            className="w-[290px] h-[190px] border shadow-lg bg-white rounded-lg transition-transform duration-700 hover:scale-105 hover:bg-gray-200 flex items-center justify-center cursor-pointer mt-4"
          >
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-center text-sm"
              >
                Create a form
              </Typography>
            </CardBody>
          </Card>
          {/* Dynamically created forms */}

          {forms.map((form, index) => (
            <Card
              onClick={() => handleCardClick(form)}
              key={index}
              className="w-[290px] h-[190px] border shadow-lg bg-white rounded-lg flex items-center justify-center mt-auto"
            >
              <CardBody>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 text-center text-sm"
                >
                  {form}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>

        <Dialog open={open} handler={handleOpen} size="xs">
          <DialogHeader className="text-[20px] font-semibold">
            Create New Form
          </DialogHeader>
          <DialogBody>
            <Input
              color="blue"
              label="Form Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </DialogBody>
          <DialogFooter className="mt-6">
            <Button
              variant="text"
              color="black"
              onClick={() => handleOpen(null)}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="black" onClick={handleCreateForm}>
              <span>Create Form</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
