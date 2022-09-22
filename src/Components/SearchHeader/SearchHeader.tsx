import { Button, TextField } from "@mui/material";
import React from "react";

type searchHeader = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => Promise<void>
};

function SearchHeader(props: searchHeader) {
  const {searchTerm} = props
  return (
    <div className="search-container">
      <TextField
        className="search-input"
        placeholder=" what are you looking for..."
        value={searchTerm}
        onChange={(e)=>props?.setSearchTerm(e.target.value)}
      />
      <Button className="search-button" onClick={props?.onSubmit}>
        <i className="fa-solid fa-magnifying-glass"></i>&nbsp; Search
      </Button>
      <Button className="cancel-button" onClick={()=>props?.setSearchTerm("")}>Cancel</Button>
    </div>
  );
}

export default SearchHeader;
