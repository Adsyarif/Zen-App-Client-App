import React from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { Schedule } from '@/providers/AppContext';

interface AddScheduleModalProps {
  open: boolean;
  handleClose: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  newSchedule: { available_from: string; available_to: string };
  editingSchedule: Schedule | null;

}

const AddScheduleModal: React.FC<AddScheduleModalProps> = ({
  open,
  handleClose,
  handleInputChange,
  handleSave,
  newSchedule,
  editingSchedule,
  
}) => {
  return (
    
    <Modal open={open}  onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 3,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {editingSchedule ? "Edit Schedule" : "Create Schedule"}
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="available_from"
          label="Available From"
          type="datetime-local"
          name="available_from"
          value={newSchedule.available_from}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="available_to"
          label="Available To"
          type="datetime-local"
          name="available_to"
          value={newSchedule.available_to}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              mt: 2,
              bgcolor: '#22543D',
              '&:hover': {
                bgcolor: '#1a3d31', 
              },
            }}
          >
            {editingSchedule ? 'Save Changes' : 'Add Schedule'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddScheduleModal;
