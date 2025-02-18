import { useEffect, useState } from "react";

const OtpContainer = ({ formData, setFormData }) => {
  const [otpValue, setOtpValue] = useState("");

  useEffect(() => {
    const firstInput = document.getElementById("input0");
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  const handleInput = (index, event) => {
    const currentInput = event.target;
    const valueArray = otpValue.split("");
    valueArray[index] = currentInput.value;
    const newOtpValue = valueArray.join("");

    setOtpValue(newOtpValue);
    setFormData({ ...formData, code: newOtpValue });

    if (currentInput.value && index < 4) {
      const nextInput = document.getElementById(`input${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    const currentInput = event.target;

    if (event.key === "Backspace") {
      const valueArray = otpValue.split("");
      valueArray[index] = "";
      const newOtpValue = valueArray.join("");

      setOtpValue(newOtpValue);
      setFormData({ ...formData, code: newOtpValue });

      if (!currentInput.value && index > 0) {
        const previousInput = document.getElementById(`input${index - 1}`);
        if (previousInput) {
          previousInput.focus();
        }
      }
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text").slice(0, 5);

    if (/^\d+$/.test(pasteData)) {
      setOtpValue(pasteData);
      setFormData({ ...formData, code: pasteData });
      pasteData.split("").forEach((char, index) => {
        const input = document.getElementById(`input${index}`);
        if (input) {
          input.value = char;
        }
      });
    }
  };

  return (
    <div className="otp-container" onPaste={handlePaste}>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <input
            required
            key={index}
            type="number"
            maxLength="1"
            pattern="[0-9]*"
            inputMode="numeric"
            id={`input${index}`}
            className="otp-input"
            value={otpValue[index] || ""}
            onChange={(e) => handleInput(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
    </div>
  );
};

export default OtpContainer;
