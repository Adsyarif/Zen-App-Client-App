import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button, { ButtonStyles } from "@/common/button/button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface DropdownTripleDotsMenuProps {
  onSave: () => void;
  onEdit: () => void;
  onDelete: () => void;
  diaryId: string;
}

const DropdownTripleDotsMenu: React.FC<DropdownTripleDotsMenuProps> = ({ onSave, onEdit, onDelete, diaryId  }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = (action: string) => {
    handleMenuClose();
    if (action === "Save") {
      if (diaryId) {
        onEdit(); 
      } else {
        onSave(); 
      }
    } else if (action === "Delete") {
      onDelete();
    } else if (action === "share") {

    } else {
      console.log(`${action} button clicked`);
    }
  };

  return (
    <div className="visible flex ">
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon className="w-10 h-10 text-green-900" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#FAF6E3",
            boxShadow: "none",
          },
        }}
      >
        <MenuItem
          onClick={handleMenuClose}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "1px",
            width: "100%",
          }}
        >
          <Button
            ButtonStyle={ButtonStyles.PrimaryButton}
            onClick={() => handleButtonClick("Save")}
          >
            Save
          </Button>
          <Button
            ButtonStyle={ButtonStyles.PrimaryButton}
            onClick={() => handleButtonClick("Delete")}
          >
            Delete
          </Button>
          <Button
            ButtonStyle={ButtonStyles.PrimaryButton}
            onClick={() => handleButtonClick("Share")}
          >
            Share
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownTripleDotsMenu;
