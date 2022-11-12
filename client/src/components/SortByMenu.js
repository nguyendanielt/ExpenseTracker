import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SortByMenu = ({ sortBy, setSortBy }) => {
    const handleChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 200, marginTop: 6 }}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortBy}
                    label="Sort By"
                    onChange={handleChange}
                >
                    <MenuItem value={"Date: Most Recent"}>Date: Most Recent</MenuItem>
                    <MenuItem value={"Date: Least Recent"}>Date: Least Recent</MenuItem>
                    <MenuItem value={"Amount ($): High to Low"}>Amount ($): High to Low</MenuItem>
                    <MenuItem value={"Amount ($): Low to High"}>Amount ($): Low to High</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default SortByMenu;