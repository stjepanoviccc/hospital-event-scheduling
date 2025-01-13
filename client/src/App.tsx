import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import ToastNotifications from "./components/ui/toastNotification";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastNotifications />
      </PersistGate>
    </Provider>
  );
}

export default App;
