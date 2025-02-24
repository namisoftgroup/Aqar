import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function RangeSlider({
  min,
  max,
  value,
  handleSlide,
  minType,
  maxType,
  steps,
}) {
  const marks = {
    [value[0]]: `${value[0]} ${minType}`,
    [value[1]]: `${value[1]} ${maxType}`,
  };


  return (
    <Slider
      range
      min={min}
      max={max}
      marks={marks}
      allowCross={false}
      value={value}
      reverse
      step={steps}
      onChange={handleSlide}
      styles={{
        rail: {
          backgroundColor: "#f2f2f2",
        },
        track: {
          backgroundColor: "var(--main)",
          opacity: 1,
        },
        handle: {
          borderColor: "var(--main)",
          backgroundColor: "var(--main)",
          opacity: 1,
          boxShadow: "none",
        },
      }}
    />
  );
}

export default RangeSlider;
