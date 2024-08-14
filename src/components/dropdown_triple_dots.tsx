import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button, { ButtonStyles } from "@/common/button/button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const DropdownTripleDotsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = (action: string) => {
    console.log(`${action} button clicked`);
    handleMenuClose();
  };

  return (
    <div className="visible text-right">
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon className="w-10 h-10 text-green-900" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#FFFFFF",
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
            gap: "2px",
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
            onClick={() => handleButtonClick("Edit")}
          >
            Edit
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
