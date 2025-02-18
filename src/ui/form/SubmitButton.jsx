export default function SubmitButton({
  className = "",
  text,
  img,
  loading = false,
}) {
  return (
    <button
      className={`form-submit ${className}`}
      disabled={loading}
      type="submit"
      style={{ opacity: loading ? 0.7 : 1 }}
    >
      {loading ? (
        <i className="fa-solid fa-spinner fa-spin"></i>
      ) : (
        <>
          {img && <img className="to_white" src={img} alt={text} />}
          {text}
        </>
      )}
    </button>
  );
}
