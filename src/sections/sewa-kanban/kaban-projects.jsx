import { useState, useRef } from 'react';
import { Box, Card, CardContent, Grid, Paper, Stack, Typography, useTheme } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { Droppable, DragDropContext, Draggable } from '@hello-pangea/dnd';

import ProjectWidget from './project-widget';
import uuidv4 from 'src/utils/uuidv4';

export function KanbanProjects() {
  const theme = useTheme();

  const [projects, setProjects] = useState([
    {
      name: 'Gurupurnima',
      isActive: true,
      id: 'b2beeb5a-bb7b-4c02-9fc8-30297ef7c62f',
    },
    {
      name: 'Gurupurnima band',
      isActive: true,
      id: '6cb4c915-3c58-489d-a8fb-1b9ab86dfed8',
    },
    {
      name: 'Sadhna',
      isActive: true,
      id: 'f2c2e10d-98c9-4dc5-8017-7d24eecc71c7',
    },
    {
      name: 'Project this ',
      isActive: true,
      id: '99e52cb3-1a34-462d-b8cb-1e5bb05d1f6d',
    },
    {
      name: 'Project that',
      isActive: true,
      id: '9164a63b-74a4-4892-b409-2a6dc870e23f',
    },
    {
      name: 'Project then',
      isActive: true,
      id: 'e090ef0c-66c2-47d0-b045-39a6aef9e2a5',
    },
    {
      name: 'Project now',
      isActive: true,
      id: '31fe28cc-7a32-4b5c-94de-63f5d4b32e53',
    },
  ]);

  const containerRef = useRef(null);

  const scrollToRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.width;
    }
  };

  const addProjects = () => {
    setProjects([...projects, { name: 'Unnamed Project', id: uuidv4, isEditable: true }]);
    scrollToRight();
  };

  const deleteProject = (id) => {
    //api call here if success...
    setProjects(projects.filter((project) => project.id != id));
  };

  const onDragEnd = (result) => {
    // Handle drag and drop logic here
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item lg={2} xs={12} sx={{ backgroundColor: 'transparent' }}>
        <Card
          component={Paper}
          style={{
            padding: 7,
            background: theme.palette.primary.dark,
            cursor: 'pointer',
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={1} textAlign="center">
              <Iconify icon="material-symbols:star" sx={{ color: theme.palette.warning }} />
              <Typography variant="subtitle2" sx={{ color: theme.palette.warning }}>
                Stared Projects
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid item lg={10} xs={12} ref={containerRef}>
          <Droppable droppableId="projects" direction="horizontal">
            {(provided) => (
              <Grid
                container
                spacing={2}
                flexWrap="nowrap"
                sx={{ overflowX: 'scroll' }}
                py={3}
                alignItems="center"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {projects.map((project, index) => (
                  <Draggable key={project.name} draggableId={project.name} index={index}>
                    {(provided, snapshot) => (
                      <Grid
                        item
                        lg={3}
                        sx={{
                          flexShrink: 0,
                          cursor: 'pointer',
                          boxShadow: snapshot.isDragging
                            ? '0px 4px 4px rgba(0, 0, 0, 0.1)'
                            : 'none',
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ProjectWidget
                          id={project.id}
                          title={project.name}
                          onDelete={deleteProject}
                          color="primary"
                          isDragging={snapshot.isDragging}
                          isEditable={project.isEditable}
                          showMenu={true}
                          chart={{
                            series: 48,
                          }}
                        />
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Grid item lg={2}>
                  <Card component={Paper} onClick={addProjects} sx={{ cursor: 'pointer' }}>
                    <CardContent>
                      <Stack direction="row" spacing={1}>
                        <Iconify icon="tabler:plus" sx={{ color: theme.palette.warning }} />
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Droppable>
        </Grid>
      </DragDropContext>
    </Grid>
  );
}
