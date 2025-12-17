import Header from "../components/Header";
import Footer from "../components/Footer";
import SubmitHostelForm from "../components/SubmitHostelForm";
import { useNavigate } from "react-router-dom";

function SubmitHostel() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/hostels");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <SubmitHostelForm onSuccess={handleSuccess} />
      </div>
      <Footer />
    </>
  );
}

export default SubmitHostel;
