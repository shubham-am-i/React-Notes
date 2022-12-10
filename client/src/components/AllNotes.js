// native imports
import React, { useEffect } from 'react'
// external imports
import { VscPinned } from 'react-icons/vsc'
import { RxDrawingPinFilled } from 'react-icons/rx'
import { Box, Paper, Stack, Typography } from '@mui/material'
// local imports
import { useAppContext } from '../context/appContext'
import PageBtnContainer from './PageBtnContainer'
import Wrapper from '../styles/AllNotes'
import EditNote from './EditNote'
import Loading from './Loading'
import Alert from './Alert'

const AllNotes = () => {
  const [open, setOpen] = React.useState(false)
  const {
    getNotes,
    editNote,
    notes,
    totalNotes,
    setEditNote,
    clearValues,
    numOfPages,
    page,
    search,
    isLoading,
    showAlert,
  } = useAppContext()

  // handle modal open
  const handleOpen = (id) => {
    setEditNote(id)
    setOpen(true)
  }
  // handle modal close
  const handleClose = (e) => {
    if (e.target.textContent === 'Save Changes') {
      console.log('first')
      editNote()
      setOpen(false)
    }
    if (e.target.parentElement.nodeName === 'DIV') return
    clearValues()
    setOpen(false)
  }

  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [page, search])

  // display message if there are no notes to display and return
  if (totalNotes === 0) {
    return (
      <Wrapper>
        <Typography variant='h5'>No Notes to display...</Typography>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      {/* heading */}
      <Typography variant='body1' className='heading-title'>
        Notes
      </Typography>
      {/* display loader while fetching */}
      {isLoading ? (
        <Loading center />
      ) : (
        <Stack className='notes-container'>
          {notes.map((note, index) => (
            <Paper key={index} className='paper' onClick={() => handleOpen(note._id)}>
              <Box className='pin-box'>
                {note.pinned ? <RxDrawingPinFilled size={20} /> : <VscPinned size={20} />}
              </Box>
              <Typography variant='subtitle2' component='h6' className='title'>
                {!note.title && !note.body ? 'Empty Note' : note.title}
              </Typography>
              <p className='body'>{note.body}</p>
            </Paper>
          ))}
        </Stack>
      )}

      {/* modal mounting */}
      {open && (
        <aside className='modal-container' onClick={handleClose}>
          <div className='modal'>
            <EditNote handleClose={handleClose} />
          </div>
        </aside>
      )}
      {/* display alert and pagination component */}
      {showAlert && <Alert />}
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}
export default AllNotes
