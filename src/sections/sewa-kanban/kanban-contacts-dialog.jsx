import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';

import { _contacts } from 'src/_mock';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import SearchNotFound from 'src/components/search-not-found';

// import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

export default function KanbanContactsDialog({ assignee = [], open, onClose }) {
  const [searchContact, setSearchContact] = useState('');
  // const [users, setUsers] = useState([]);
  // const [branches, setBranches] = useState([]);
  // const [areas, setAreas] = useState([]);

  const handleSearchContacts = useCallback((event) => {
    setSearchContact(event.target.value);
  }, []);

  const dataFiltered = applyFilter({
    inputData: _contacts,
    query: searchContact,
  });

  useEffect(async () => {
    // try {
    //   const usersPromise = await axios.get(`/${endpoints.users.byArea}/NRL-01`);
    //   const branchesPromise = await axios.get(`/${endpoints.branches.getBranches}`);
    //   const areaCodesPromise = await axios.get(`/${endpoints.branches.areaCodes}`);
    //   const [usersResponse, branchesResponse, areaCodesResponse] = await Promise.all([
    //     usersPromise,
    //     branchesPromise,
    //     areaCodesPromise,
    //   ]);
    //   // Update the states with the fetched data
    //   setUsers(usersResponse.data.data);
    //   setBranches(branchesResponse.data.data);
    //   setAreas(areaCodesResponse.data.data);
    //   console.table([
    //     usersResponse.data.data,
    //     branchesResponse.data.data,
    //     areaCodesResponse.data.data,
    //   ]);
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);

  const notFound = !dataFiltered.length && !!searchContact;

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle sx={{ pb: 0 }}>
        Sewadars <Typography component="span">({_contacts.length})</Typography>
      </DialogTitle>

      <Box sx={{ px: 3, py: 2.5 }}>
        <Grid container>
          {/* <Grid item xs={12} sm={6} lg={3}>
            <FormControl
              sx={{
                flexShrink: 0,
                width: { xs: 1, md: 200 },
              }}
            >
              <InputLabel>Zones</InputLabel>

              <Select
                input={<OutlinedInput label="Zones" />}
                MenuProps={{
                  PaperProps: {
                    sx: { maxHeight: 240 },
                  },
                }}
              >
                <MenuItem key="random" value={10}>
                  <Checkbox disableRipple size="small" />
                  Option 0
                </MenuItem>

                <MenuItem key="random" value={10}>
                  <Checkbox disableRipple size="small" />
                  Option 1
                </MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12} sm={6} lg={3}>
            <FormControl
              sx={{
                flexShrink: 0,
                width: { xs: 1, md: 200 },
              }}
            >
              <InputLabel>Branch</InputLabel>

              <Select
                input={<OutlinedInput label="Branch" />}
                MenuProps={{
                  PaperProps: {
                    sx: { maxHeight: 240 },
                  },
                }}
              >
                <MenuItem key="random" value={10}>
                  <Checkbox disableRipple size="small" />
                  Option 0
                </MenuItem>

                <MenuItem key="random" value={10}>
                  <Checkbox disableRipple size="small" />
                  Option 1
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} mb={2}>
            <FormControl
              sx={{
                flexShrink: 0,
                width: { xs: 1, md: 200 },
              }}
            >
              <InputLabel>Areas</InputLabel>

              <Select
                input={<OutlinedInput label="Areas" />}
                MenuProps={{
                  PaperProps: {
                    sx: { maxHeight: 240 },
                  },
                }}
              >
                <MenuItem key="random" value={10}>
                  <Checkbox disableRipple size="small" />
                  Option 0
                </MenuItem>

                <MenuItem key="random" value={10}>
                  <Checkbox disableRipple size="small" />
                  Option 1
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} mb={2}>
            <FormControl
              sx={{
                flexShrink: 0,
                width: { xs: 1, md: 200 },
              }}
            >
              <InputLabel>Groups</InputLabel>

              <Select
                input={<OutlinedInput label="Groups" />}
                MenuProps={{
                  PaperProps: {
                    sx: { maxHeight: 240 },
                  },
                }}
              >
                <MenuItem key="random" value={10}>
                  <Checkbox disableRipple size="small" />
                  Option 0
                </MenuItem>

                <MenuItem key="random" value={10}>
                  <Checkbox disableRipple size="small" />
                  Option 1
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              value={searchContact}
              onChange={handleSearchContacts}
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {notFound ? (
          <SearchNotFound query={searchContact} sx={{ mt: 3, mb: 10 }} />
        ) : (
          <Scrollbar
            sx={{
              px: 2.5,
              height: ITEM_HEIGHT * 6,
            }}
          >
            {dataFiltered.map((contact) => {
              const checked = assignee.map((person) => person.name).includes(contact.name);

              return (
                <ListItem key={contact.id} disableGutters sx={{ height: ITEM_HEIGHT }}>
                  <Checkbox sx={{ mr: 2 }} />
                  <ListItemAvatar>
                    <Avatar src={contact.avatarUrl} />
                  </ListItemAvatar>

                  <ListItemText
                    primaryTypographyProps={{
                      typography: 'subtitle2',
                      sx: { mb: 0.25 },
                    }}
                    secondaryTypographyProps={{ typography: 'caption' }}
                    primary={contact.name}
                    secondary={contact.email}
                  />
                </ListItem>
              );
            })}
          </Scrollbar>
        )}
      </DialogContent>
    </Dialog>
  );
}

KanbanContactsDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  assignee: PropTypes.array,
};

// ----------------------------------------------------------------------

function applyFilter({ inputData, query }) {
  if (query) {
    inputData = inputData.filter(
      (contact) =>
        contact.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        contact.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}
