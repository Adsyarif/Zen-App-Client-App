import React from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Schedule } from '@/providers/AppContext';

interface JoinMeetingModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  meetingFrom: string;
  meetingTo: string;
  meetingLink: string;
  schedule: Schedule;
}

const formatDateTime = (dateTimeString: string): string => {
  const dateTime = new Date(dateTimeString);
  const date = dateTime.toISOString().split('T')[0]; 
  const time = dateTime.toTimeString().split(' ')[0].slice(0, 5); 
  return `${date} ${time}`;
};

const formatMeetingTimes = (from: string, to: string): string => {
  const formattedFrom = formatDateTime(from);
  const formattedTo = formatDateTime(to);
  return `${formattedFrom.split(' ')[0]} ${formattedFrom.split(' ')[1]} - ${formattedTo.split(' ')[1]}`;
};

const JoinMeetingModal: React.FC<JoinMeetingModalProps> = ({ schedule, isOpen, onRequestClose, meetingFrom, meetingTo, meetingLink }) => {
  const formattedDateRange = formatMeetingTimes(meetingFrom, meetingTo);

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="join-meeting-modal-title"
      aria-describedby="join-meeting-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          
        }}
      >
        <IconButton
          onClick={onRequestClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="join-meeting-modal-title" variant="h6" component="h2" gutterBottom>
          Join Meeting
        </Typography>
        <Typography id="join-meeting-modal-description" variant="body2" gutterBottom>
          Date: {formattedDateRange}
        </Typography>
        <Button
          href={meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          
          sx={{ mt: 2, bgcolor:'#22543D' }}
        >
          Join Zoom Meeting
        </Button>
      </Box>
    </Modal>
  );
};

export default JoinMeetingModal;