import { Suspense, lazy } from "react"
import { Provider, positions } from "react-alert"
import AlertTemplate from "react-alert-template-basic"
import Loading from "components/Loading"

const Dashboard = lazy(() => import("containers/Dashboard"))

const options = {
  timeout: 3000,
  position: positions.TOP_LEFT,
}

const App = () => (
  <Suspense fallback={<Loading />}>
    <Provider template={AlertTemplate} {...options}>
      <Dashboard />
    </Provider>
  </Suspense>
)

export default App
