import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useGetAds } from "../hooks/ads/useGetAds";
import PropertyCard from "../ui/cards/PropertyCard";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import Owner from "../ui/PropertiesForRent/Owner";
import SectionHeader from "../ui/SectionHeader";

const UserAds = () => {
  const { ads, isLoading } = useGetAds();
  const { userId } = useParams();
  const { t } = useTranslation();

  if (isLoading) return <DataLoader />;

  // Ensure ads and ads.data are valid
  const userAds = Array.isArray(ads?.data)
    ? ads.data.filter((ad) => parseInt(ad.user_id, 10) === parseInt(userId, 10))
    : [];

  return (
    <>
      <SectionHeader link={"الملف الشخصي"} />
      <section className="container my-5">
        <div className="row ">
          <div className="col-12 col-lg-4 p-3">
            <Owner ad={userAds[0]} />
            {/* <img src="/images/empty-floor-front-modern.jpg" /> */}
          </div>
          <div className="col-12 col-lg-8">
            <div className="row">
              {userAds.length > 0 ? (
                userAds.map((ad) => (
                  <div key={ad.id} className="col-md-6 col-lg-6 p-2 ">
                    <PropertyCard ad={ad} className="bg_gray" />
                  </div>
                ))
              ) : (
                <EmptyData text={t("forRent.noDatafound")} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserAds;
