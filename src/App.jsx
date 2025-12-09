import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
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
import Profile from './pages/Profile.jsx';
import { UserProvider, useUser } from './context/UserContext.jsx';
import ProtectedRoute from './components/protect/ProtectedRoute.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import { Toaster } from 'react-hot-toast';
import { NotificationProvider } from './context/NotificationContext.jsx';

const App = () => {
  const [userRole, setUserRole] = useState(null)
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) setUserRole(role);
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <NotificationProvider>
          <UserProvider>
            <TaskProvider>

              <Routes>
                <Route path="/" element={< Login setUserRole={setUserRole} />} />
                <Route path="/login" element={< Login setUserRole={setUserRole} />} />
                <Route path="/verifyuser" element={< VerifyUser />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    < Profile />
                  </ProtectedRoute>
                } />


                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard role={userRole} />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="stats" replace />} />
                  <Route path="stats" element={<Stats role={userRole} />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="taskdetail/:id" element={<TaskDetail />} />
                  <Route path="completed" element={< Completed />} />
                  <Route path="inprogress" element={<Inprogress />} />
                  <Route path="todo" element={< Todo />} />
                  <Route path="team" element={< Team />} />
                  <Route path="trash" element={< Trash />} />
                </Route>
              </Routes>

            </TaskProvider>
          </UserProvider>
        </NotificationProvider>
      </Router >

    </>
  )
}

export default App