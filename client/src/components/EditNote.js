import { VscPinned } from 'react-icons/vsc'
import { RxDrawingPinFilled } from 'react-icons/rx'
import { MdDelete } from 'react-icons/md'
import { Button, Box, Input, Stack, FormControl } from '@mui/material'
// local import
import Alert from './Alert'
import Wrapper from '../styles/CreateNote'
import { useAppContext } from '../context/appContext'

const EditNote = ({ handleClose }) => {
  const { editNote, deleteNote, handleChange, title, body, pinned } = useAppContext()

  const handlePinned = (e) => {
    // handle pinned note
    const name = 'pinned'
    const value = !pinned
    handleChange({ name, value })
  }

  const handleNoteInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editNote()
    handleClose()
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ boxShadow: 3 }} className='form form-modal'>
          <Stack direction='row'>
            <Input
              name='title'
              placeholder='Title'
              disableUnderline={true}
              multiline
              fullWidth
              value={title}
              onChange={handleNoteInput}
            />

            <Box className='pin-box'>
              {pinned ? (
                <RxDrawingPinFilled size={20} name='pinned' onClick={handlePinned} />
              ) : (
                <VscPinned size={20} name='pinned' onClick={handlePinned} />
              )}
            </Box>
          </Stack>
          <Input
            name='body'
            placeholder='Take a note...'
            disableUnderline={true}
            multiline
            value={body}
            onChange={handleNoteInput}
          />

          <Box className='button-container'>
            <Button type='submit'>Save Changes</Button>
            <MdDelete size={20} className='delete-icon' onClick={deleteNote} />
          </Box>
        </FormControl>
      </form>
    </Wrapper>
  )
}
export default EditNote