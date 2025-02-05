import React from "react";

export default function GuestRateCard() {
  return (
    <section className="guest-rates-card">
      <div className="guest-info">
        <div className="image-wrapper">
          <img src="/images/avatar.png" alt="User" />
        </div>
        <div className="guest-data">
          <h4>سعد قحتاني</h4>
          <p className="rate">5 فبراير 2025</p>
          <p className="rate">rate</p>
        </div>
      </div>
      <p>الفيلا مرا ممتازه و كمام الانتر نت سريع</p>
    </section>
  );
}
