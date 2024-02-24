import React from 'react';
import PropTypes from 'prop-types';

import { useState } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';

import { fNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
import {
  IconButton,
  MenuList,
  Popover,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material';
import { ConfirmDialog } from 'src/components/custom-dialog';
import ProjectForm from './project-form';
import AlertDialog from '../_examples/mui/dialog-view/alert-dialog';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ProjectWidget({
  id,
  title,
  total,
  icon,
  color = 'primary',
  chart,
  sx,
  showMenu,
  isDragging,
  onDelete,
  isEditable,
  handleEditProject,
  ...other
}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [inEditingMode, setInEditingMode] = useState(isEditable);

  const open = Boolean(anchorEl);

  const confirmDialog = useBoolean();

  const archiveDialog = useBoolean();

  const { series, options } = chart;

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    legend: {
      show: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: theme.palette[color].light, opacity: 1 },
          { offset: 100, color: theme.palette[color].main, opacity: 1 },
        ],
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '78%',
        },
        track: {
          margin: 0,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 6,
            color: theme.palette.common.white,
            fontSize: theme.typography.subtitle2.fontSize,
          },
        },
      },
    },
    ...options,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: 2,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        color: 'common.white',
        bgcolor: isDragging ? 'rgba(0, 0, 0, 0.8)' : `${color}.dark`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(0.95)',
        },
        ...sx,
      }}
      {...other}
    >
      <Chart
        dir="ltr"
        type="radialBar"
        series={[series]}
        options={chartOptions}
        width={60}
        height={60}
      />
      <ListItemText
        sx={{ ml: 1 }}
        primary={fNumber(total)}
        secondary={title}
        primaryTypographyProps={{
          typography: 'subtitle1',
          component: 'span',
        }}
        secondaryTypographyProps={{
          color: 'inherit',
          component: 'span',
          sx: { opacity: 0.64 },
          typography: 'subtitle2',
        }}
      />
      <Iconify
        icon={icon}
        sx={{
          width: 112,
          right: -32,
          height: 112,
          opacity: 0.08,
          position: 'absolute',
        }}
      />
      <IconButton onClick={handleClick} sx={{ position: 'absolute', top: 5, right: 10, p: 0 }}>
        <Iconify icon="eva:more-horizontal-fill" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              handleClose();
              setInEditingMode(true);
            }}
          >
            {' '}
            <Iconify sx={{ mr: 1 }} icon="eva:edit-outline" />
            Edit{' '}
          </MenuItem>
          <MenuItem
            onClick={() => {
              archiveDialog.onTrue();
              handleClose();
            }}
          >
            {' '}
            <Iconify sx={{ mr: 1 }} icon="eva:archive-outline" />
            Archive
          </MenuItem>
          <MenuItem
            onClick={() => {
              confirmDialog.onTrue();
              handleClose();
            }}
          >
            <Iconify sx={{ mr: 1 }} icon="eva:trash-outline" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>

      <ConfirmDialog
        open={confirmDialog.value}
        onClose={confirmDialog.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {title} Project </strong>?
          </>
        }
        action={
          <Button variant="contained" color="error" onClick={() => onDelete(id)}>
            Delete
          </Button>
        }
      />

      <ConfirmDialog
        open={archiveDialog.value}
        onClose={archiveDialog.onFalse}
        title="Archive"
        content={
          <>
            Are you sure want to archive <strong> {title} Project </strong>?
          </>
        }
        action={
          <Button variant="contained" color="primary">
            Archive
          </Button>
        }
      />

      <Dialog
        open={inEditingMode}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setInEditingMode(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Projects Details'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <ProjectForm onEditProject={handleEditProject} title={title} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

ProjectWidget.propTypes = {
  id: PropTypes.string,
  chart: PropTypes.object,
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  showMenu: PropTypes.boolean,
  onDelete: PropTypes.function,
};
