import React, { useState } from 'react'
import AddNewUserModal from '../components/AddNewUserModal.jsx'
import { IoMdAdd } from 'react-icons/io'
import TeamTable from '../components/TeamTable.jsx'

const Team = () => {
  const [openAddUser, setOpenAddUser] = useState(false)
  return (
    <>
      <AddNewUserModal
        openAddUser={openAddUser}
        onClose={() => setOpenAddUser(false)}
      />
      <div className="h-screen overflow-y-auto bg-gray-100 p-6 hide-scrolbar">

        <div className="w-full flex justify-between px-2">
          <p className="text-2xl">Team</p>
          <button
            onClick={() => setOpenAddUser(true)}
            type="button" className='bg-blue-800 text-white rounded-md flex justify-center items-center text-md px-2 py-2 gap-1'>
            <IoMdAdd className='text-white' />
            Create User
          </button>
        </div>

        <TeamTable />

      </div>
    </>
  )
}

export default Team