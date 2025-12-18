import React, { useEffect, useRef, useState } from "react";
import {
  gridDensitySelector,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarQuickFilter,
  GridToolbarExport,
  useGridApiContext,
  useGridSelector
} from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Button,
  Stack,
  Tooltip,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@mui/material";
import styled from "@emotion/styled";
import { Add, Check, DeleteOutlined, FileDownload, Help, Settings } from "@mui/icons-material";
// import GridViewColumnIcon from "@mui/icons-material/GridViewColumn"; // Make sure to import this

const CustomToolbar = ({ title, description, showDownload, showAdd, onAddClick, showDelete, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const apiRef = useGridApiContext();
  const density = useGridSelector(apiRef, gridDensitySelector);
  const [densityMenuOpen, setDensityMenuOpen] = useState(false);
  const densityMenuTriggerRef = useRef(null);

  const densityOptions = [
    { label: 'Compact density', value: 'compact' },
    { label: 'Standard density', value: 'standard' },
    { label: 'Comfortable density', value: 'comfortable' },
  ];

  useEffect(() => {
    const savedDensity = localStorage.getItem("datagrid-density") || "compact";
    apiRef.current.setDensity(savedDensity);
  }, []);

  return (

    <GridToolbarContainer >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          // p: 1,
        }}
      >
        {/* Left side — title */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="title"
            // color='primary.light'
            fontWeight={700}
            sx={{
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>

          <Typography variant="body" color="text.secondary" mb={4} sx={{ display: 'block' }}>
            {description}
          </Typography>

          {/* {description && (
            <Tooltip
              title={description}
              arrow
              componentsProps={{
                tooltip: { sx: { whiteSpace: "pre-line" } },
              }}
            >
              <Help sx={{ ml: 1, fontSize: 21 }} />
            </Tooltip>
          )} */}
        </Box>

        {/* Right side — optional buttons */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* Conditionally render Add button */}
          {showAdd && (
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "primary.light",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.light" },
                whiteSpace: "nowrap",
              }}
              onClick={onAddClick}
            >
              <Add />
            </Button>
          )}

          {/* Conditionally render Delete button */}
          {showDelete && (
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "primary.light",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.light" },
                whiteSpace: "nowrap",
              }}
              onClick={onDelete}
            >
              <DeleteOutlined />
            </Button>
          )}

          {/* Columns Panel Button - Using built-in component */}
          {/* <GridToolbarColumnsButton size="small" /> */}

          {/* Quick Search - Using built-in component */}
          {/* <GridToolbarQuickFilter
            slotProps={{ textField: { variant: 'contained' } }}
            sx={{
              width: 400,
              '& .MuiInputBase-root': {
                px: 1,
                py: 0.5,
                borderRadius: 6,
                fontSize: 14,
                color: "primary.light",
                border: '1px solid #52ecd8ff',
                '&:hover': {
                  border: '1px solid #52ecd8ff',
                },
                '&.Mui-focused': {
                  border: '1px solid #52ecd8ff',
                },
                '& .MuiInputBase-input': {
                  fontSize: 14,
                  color: "primary.light",
                },
              }
            }}
          /> */}

          {/* Custom Density Selector */}
          {/* <Tooltip title="Density">
            <IconButton
              ref={densityMenuTriggerRef}
              size="small"
              onClick={() => setDensityMenuOpen(true)}
            >
              <Settings fontSize="small" />
            </IconButton>
          </Tooltip> */}

          <GridToolbarQuickFilter
            slotProps={{
              textField: {
                variant: 'contained',
                placeholder: 'Search...',
                // size: 'small',
              }
            }}
            sx={{
              width: 250,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                // fontSize: 14,
                backgroundColor: 'background.paper',
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.dark',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: 2,
                },
              },
              // '& .MuiInputBase-input': {
              //   fontSize: 14,
              // },
              '& .MuiSvgIcon-root': {
                color: 'action.active',
              }
            }}
          />

          <Menu
            anchorEl={densityMenuTriggerRef.current}
            open={densityMenuOpen}
            onClose={() => setDensityMenuOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {densityOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => {
                  apiRef.current.setDensity(option.value);
                  localStorage.setItem("datagrid-density", option.value);
                  setDensityMenuOpen(false);
                }}
              >
                <ListItemIcon>
                  {density === option.value && <Check fontSize="small" />}
                </ListItemIcon>
                <ListItemText>{option.label}</ListItemText>
              </MenuItem>
            ))}
          </Menu>

          {/* Export Button - Using built-in component */}
          {/* {showDownload && (
            <GridToolbarExport
              slotProps={{
                button: {
                  size: 'small',
                }
              }}
            />
          )} */}
        </Stack>
      </Box>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;