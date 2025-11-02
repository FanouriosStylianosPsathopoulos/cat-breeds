import "./App.css";
import Modal from "./Components/common/Modal";
import PageLayout from "./Components/Layout/PageLayout";
import HomePage from "./Components/Features/MainPage/MainPageContainer";
import { ModalProvider } from "./context/ModalContext";

const App = () => {
  return (
    <ModalProvider>
      <PageLayout>
        <HomePage />
        <Modal />
      </PageLayout>
    </ModalProvider>
  );
};

export default App;
