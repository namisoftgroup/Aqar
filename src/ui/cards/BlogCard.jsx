import { Link } from "react-router";
import AnimatedButton from "../AnimatedButton";
import { useTranslation } from "react-i18next";

export default function BlogCard() {
  const { t } = useTranslation();
  return (
    <section className="blog-card-items">
      <div className="blog-image">
        <img src="/images/news-10.jpg" />
        <ul className="post">
          <li>
            <i className="fa-light fa-calendar"></i>
            <span>29 August, 2025</span>
          </li>
          <li>Title</li>
        </ul>
      </div>
      <div className="blog-content">
        <h3>
          <Link>
            The ultimate southwest USA road trip itinerary for your traveling
          </Link>
        </h3>
        <p>
          We offer carefully curated destinations and tours that capture the
          true essence.
        </p>
        <AnimatedButton text={t("read More")} />
      </div>
    </section>
  );
}
