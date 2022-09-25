import { TurnedInNot } from '@mui/icons-material';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentNote } from '../../store/journal';

export const SideBarItem = ({ title = '', id, body, date, imageURLS = [] }) => {
  const dispatch = useDispatch();
  const onClickNote = () => {
    dispatch(setCurrentNote({ title, id, body, date, imageURLS }));
  };
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + '...' : title;
  });
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
