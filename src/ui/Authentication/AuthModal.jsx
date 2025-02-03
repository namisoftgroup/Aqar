import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeAuthModal, resetModal } from "../../redux/slices/authModalSlice";
import AuthStep1 from "./AuthStep1";
import AuthStep2 from "./AuthStep2";
import { useState } from "react";
import AuthStep3 from "./AuthStep3";

export default function AuthModal() {
  const show = useSelector((state) => state.authModal.show);
  const currentStep = useSelector((state) => state.authModal.currentStep);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    phone: "",
    image: "",
    name: "",
    email: "",
  });
  const [otp, setOtp] = useState({
    code: "",
  });
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AuthStep1 formData={formData} setFormData={setFormData} />;
      case 2:
        return <AuthStep2 otp={otp} setOtp={setOtp} formData={formData} />;
      case 3:
        return <AuthStep3 formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      centered
      size="xl"
      show={show}
      backdrop="static"
      onHide={() => {
        dispatch(closeAuthModal());
        dispatch(resetModal());
      }}
    >
      <Modal.Header className="border-0" closeButton></Modal.Header>
      <Modal.Body>
        <section className="row">
          <div className="col-6 w-full">
            <img
              className="w-100"
              src={`${
                currentStep == "1"
                  ? "/images/loginImage.svg"
                  : currentStep == "2"
                  ? "/images/SentMessage.svg"
                  : "/images/loginImage.svg"
              }`}
            />
          </div>
          {renderStep()}
        </section>
      </Modal.Body>
    </Modal>
  );
}
