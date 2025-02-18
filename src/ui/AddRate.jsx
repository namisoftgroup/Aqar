import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SubmitButton from "./form/SubmitButton";
import TextareaField from "./form/TextareaField";
import useAddBookingRate from "../hooks/bookings/useAddBookingRate";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function AddRate({ booking }) {
  const { t } = useTranslation();
  const quryClient = useQueryClient();
  const [formData, setFormData] = useState({
    rate: 0,
    comment: "",
    booking_id: booking?.id,
  });

  const { addBookingRate, isLoading } = useAddBookingRate();
  const handleRatingChange = (value) => {
    setFormData({ ...formData, rate: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    addBookingRate(
      { ...formData },
      {
        onSuccess: () => {
          toast.success(t("rate.reviewAdded"));
          setFormData({ rate: 0, comment: "" });
          quryClient.invalidateQueries(["bookings", booking.id]);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h4>{t("rate.addReview")}</h4>
      <div className="stars">
        <label>{t("rate.rate")}</label>
        <div className="star-rating-service">
          {[5, 4, 3, 2, 1].map((star) => (
            <React.Fragment key={star}>
              <input
                type="radio"
                id={`star${star}`}
                name="rating"
                value={star}
                checked={formData.rate === star}
                onChange={() => handleRatingChange(star)}
              />
              <label
                htmlFor={`star${star}`}
                title={`${star} stars`}
                className={formData.rate >= star ? "active" : ""}
              >
                <i className="fa-sharp fa-solid fa-star"></i>
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <TextareaField
        label={t("rate.yourReview")}
        value={formData.comment}
        rows={5}
        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
      />
      <SubmitButton text={t("rate.submit")} loading={isLoading} />
    </form>
  );
}
