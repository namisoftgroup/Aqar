export default function AboutSectionHeader({ title, subTitle, description }) {
  return (
    <div className="about-subtitle">
      <h1>{title}</h1>
      <p>
        <span>{subTitle}</span>
        <span>{description}</span>
      </p>
    </div>
  );
}
