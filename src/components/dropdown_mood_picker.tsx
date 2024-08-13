import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";

interface MoodItem {
  id: number;
  moodStatus: string;
  moodCategory: "Happy" | "Unhappy";
}

const DropdownMoodPicker: React.FC = () => {
  const [selectMoodStatus, setSelectMoodStatus] = useState<number | null>(null);
  const [anchorEI, setAnchorEI] = useState<null | HTMLElement>(null);

  const moodItems: MoodItem[] = [
    {
      id: 1,
      moodStatus: "Excited",
      moodCategory: "Happy",
    },
    {
      id: 2,
      moodStatus: "Happy",
      moodCategory: "Happy",
    },
    {
      id: 3,
      moodStatus: "Sad",
      moodCategory: "Unhappy",
    },
    {
      id: 4,
      moodStatus: "Stress",
      moodCategory: "Unhappy",
    },
    {
      id: 5,
      moodStatus: "Angry",
      moodCategory: "Unhappy",
    },
    {
      id: 6,
      moodStatus: "Hungry",
      moodCategory: "Unhappy",
    },
    {
      id: 7,
      moodStatus: "Fun",
      moodCategory: "Happy",
    },
    {
      id: 8,
      moodStatus: "Grateful",
      moodCategory: "Happy",
    },
    {
      id: 9,
      moodStatus: "Anxious",
      moodCategory: "Unhappy",
    },
    {
      id: 10,
      moodStatus: "Hopefull",
      moodCategory: "Happy",
    },
  ];

  // logic for handleMood moodStatus menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEI(event.currentTarget);
  };
  const handleMenuCLose = () => {
    setAnchorEI(null);
  };
  const handleSelectMoodStatus = (id: number) => {
    setSelectMoodStatus(id);
    handleMenuCLose();
  };

  //   logic for moodCategory color
  const getColorMoodCategory = (moodCategory: "Happy" | "Unhappy"): string => {
    switch (moodCategory) {
      case "Happy":
        return "bg-green-400";
      case "Unhappy":
        return "bg-blue-400";
      default:
        return "bg-gray-200";
    }
  };
  //   logic for random positions of moodStatus
  const randomMoodStatusPosition = (): React.CSSProperties => {
    return {
      margin: "2px",
    };
  };
  return (
    <div className="visible lg:hidden md:hidden text-left">
      <IconButton onClick={handleMenuOpen}>
        <AddReactionOutlinedIcon className="w-10 h-10 text-green-900"></AddReactionOutlinedIcon>
      </IconButton>
      <Menu
        anchorEl={anchorEI}
        open={Boolean(anchorEI)}
        onClose={handleMenuCLose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#FFFFFF",
            boxShadow: "none",
          },
        }}
      >
        {moodItems.map((moodItem) => (
          <MenuItem
            key={moodItem.id}
            onClick={() => handleSelectMoodStatus(moodItem.id)}
            className={`p-3 w-30 rounded-lg text-black text-base ${getColorMoodCategory(
              moodItem.moodCategory
            )}`}
            style={{
              ...randomMoodStatusPosition(),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {moodItem.moodStatus}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownMoodPicker;
