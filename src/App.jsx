import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/auth/Login.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Tasks from './pages/Tasks.jsx';
import Completed from './pages/Completed.jsx';
import Inprogress from './pages/Inprogress.jsx';
import Todo from './pages/Todo.jsx';
import Team from './pages/Team.jsx';
import Trash from './pages/Trash.jsx';
import Stats from './pages/Stats.jsx';
import TaskDetail from './pages/TaskDetail.jsx';
import VerifyUser from './pages/VerifyUser.jsx';

const App = () => {
  const userRole = 'admin' // admin - user
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" index element={< Login />} />
          <Route path="/verifyuser" index element={< VerifyUser />} />


          <Route path="/dashboard" element={<Dashboard role={userRole} />}>
            <Route index element={<Navigate to="stats" replace />} />
            <Route index path="stats" element={<Stats />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="taskdetail" element={<TaskDetail />} />
            <Route path="completed" element={< Completed />} />
            <Route path="inprogress" element={<Inprogress />} />
            <Route path="todo" element={< Todo />} />
            <Route path="team" element={< Team />} />
            <Route path="trash" element={< Trash />} />
          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App