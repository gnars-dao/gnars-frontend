import { ToastProvider } from "react-toast-notifications"
import { Content } from "./components/Contents"

export const App = () => (
  <div className="App flex flex-col justify-center items-center">
    <ToastProvider>
      <Content />
    </ToastProvider>
  </div>
)
