import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { GoTriangleDown } from "react-icons/go";

interface HeaderArticlesProps {
  onFilterChange: (filter: string) => void;
}

export default function HeaderArticles({ onFilterChange }: HeaderArticlesProps) {
  const [findArticles, setFindArticles] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setFindArticles(value);
    onFilterChange(value);
  };
  return (
    <div className=" flex justify-between items-center">
      <div className="font-bold text-xl">Recent article post</div>
      <Box sx={{ minWidth: 240, bgcolor: "#22543D", borderRadius: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="find-articles-select-label" sx={{ color: "white", fontWeight: "bold" }}>
            Find Articles
          </InputLabel>
          <Select
            labelId="find-articles-select-label"
            id="find-articles-select"
            value={findArticles}
            label="Find Articles"
            onChange={handleChange}
            sx={{
              color: "white",
              borderColor: "white",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
            }}
            IconComponent={() => <GoTriangleDown size={48} />}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Mental Health Disorders">Mental Health Disorders</MenuItem>
            <MenuItem value="Self-Development">Self-Development</MenuItem>
            <MenuItem value="Prevention and Maintenance">Prevention and Maintenance</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
