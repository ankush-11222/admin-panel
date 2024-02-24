import { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';

export default function ProjectForm({ title, onEditProject }) {
  const [formData, setFormData] = useState({
    title: title,
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProject({ ...formData });
  };
  return (
    <Grid container justify="center" style={{ marginTop: '2rem' }}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Name"
            fullWidth
            margin="normal"
            name="title" // corrected name attribute
            value={formData.title}
            placeholder="Enter Project Title"
            onChange={handleChange} // changed from onKeyUp to onChange
          />

          <TextField
            variant="outlined"
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            name="description" // corrected name attribute
            value={formData.description}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="warning" // changed from "warning" to "primary" for a default color
            fullWidth
            style={{ marginTop: '1rem' }}
          >
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
