import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/base/Home'
import Protected from './components/auth/Protected'
import Me from './pages/base/user/me'
import SignUp from './pages/base/user/register'
import SignIn from './pages/base/user/login'
import ForgotPass from './pages/base/user/forgotpass'
import New_Location from './pages/base/user/new_location'
import ResponsiveAppBar from './components/navigate/navigate'
import NotFoundPage from './pages/errors/notFound'
import Sign_out from './pages/base/user/sign-out'

function App() {
  return (
    <>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/me"
            element={
              <Protected needsAuth>
                <Me />
              </Protected>
            }
          />
          <Route
            path="/sign-out"
            element={
              <Protected needsAuth>
                <Sign_out />
              </Protected>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Protected redirectIfAuthenticated>
                <SignUp />
              </Protected>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Protected redirectIfAuthenticated>
                <SignIn />
              </Protected>
            }
          />
          <Route
            path="/forgot-pass"
            element={
              <Protected redirectIfAuthenticated>
                <ForgotPass />
              </Protected>
            }
          />
          <Route
            path="/new_location/:uid/:token"
            element={
              <Protected redirectIfAuthenticated>
                <New_Location />
              </Protected>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
