
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Start from './components/join/Start.jsx';
import Chat from './components/chat/Chat.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/chat",
    element: <Chat />,
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
