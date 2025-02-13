import { useEffect, useRef, useState } from "react";
import InputField from "../ui/form/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SubmitButton from "../ui/form/SubmitButton";
import axiosInstance from "../utils/axios";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function EditProfile() {
  const [formData, setFormData] = useState({});
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState();
  const { t } = useTranslation();
  const imgView = useRef(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        image: user.image,
      });
    }
  }, [user]);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleUpload = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    imgView.current.src = imageUrl;
    setFormData({ ...formData, [e.target.name]: imageUrl });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const reqBody = formData;
    try {
      const res = await axiosInstance.post("user/update_profile", reqBody);
      if (res.data.code === 200) {
        dispatch(setUser(res.data.data));
        navigate("/profile");
        toast.success("Profile updated successfully");
      } else {
        toast.error(" Couldn't update profile");
      }
    } catch (e) {
      console.error(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="container my-5">
      <section className="auth-step w-50 mx-auto">
        <h1>{t("profile.editProfile")}</h1>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="image" className="image-uplaod">
            <img
              ref={imgView}
              src={user.image ? user.image : "images/registerImage.png"}
              alt="your avatar"
            />
            <input
              id="image"
              name="image"
              type="file"
              onChange={handleUpload}
            />
            <i className="fa-solid fa-plus"></i>
          </label>
          <InputField
            onChange={handleChange}
            value={user?.name}
            requried="true"
            type="text"
            name="name"
            placeholder={t("auth.name")}
          />
          <InputField
            onChange={handleChange}
            requried="true"
            value={user?.email}
            type="email"
            name="email"
            placeholder={t("auth.email")}
          />

          <SubmitButton
            style={{ width: "fit-content" }}
            text={t("profile.edit")}
            loading={loading}
          />
        </form>
      </section>
    </section>
  );
}
