export default function ProgressBar({ status }) {
  return (
    <div className="status-bar">
      <div
        className="progress "
        style={{
          height: "6px",
          borderRadius: "8px",
        }}
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {" "}
        <div
          className={`progress-bar ${status}`}
          style={{ width: "100%" }}
        ></div>
      </div>
    </div>
  );
}
