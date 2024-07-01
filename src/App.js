import React,{lazy} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
const Dashboard= lazy(()=> import('./pages/admin/Dashboard'))
const AdminLogin= lazy(()=> import('./pages/admin/AdminLogin')) 
const ChatManagement= lazy(()=> import('./pages/admin/ChatManagement')) 
const MessageManagement= lazy(()=> import('./pages/admin/MessageManagement')) 
const UserManagement= lazy(()=> import('./pages/admin/UserManagement')) 
const Home= lazy(()=> import("./pages/Home"))
const Login= lazy(()=> import("./pages/Login"))
const Register= lazy(()=> import('./pages/Register'))
const Chat= lazy(()=> import("./pages/Chat"))
const Groups= lazy(()=> import("./pages/Groups"))
const NotFound= lazy(()=> import("./pages/NotFound"))

let user= true;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectRoute user={user}/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/chat/:chatId' element={<Chat/>} />
          <Route path='/groups' element={<Groups/>} />
        </Route>
        <Route element={<ProtectRoute user={!user} redirect='/'/>}>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Route>
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/admin/users' element={<UserManagement/>}/>
        <Route path='/admin/chats' element={<ChatManagement/>}/>
        <Route path='/admin/messages' element={<MessageManagement/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  )
}

export default App
