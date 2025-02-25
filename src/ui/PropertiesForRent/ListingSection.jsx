import { useTranslation } from "react-i18next";
import { useGetAds } from "../../hooks/ads/useGetAds";
import EmptyData from "../EmptyData";
import CustomPagination from "../CustomPagination";
import PropertyCard from "../cards/PropertyCard";
import DataLoader from "../DataLoader";

export default function ListingSection({ setViewMap }) {
  const { t } = useTranslation();
  const { ads, isLoading } = useGetAds();

  return isLoading ? (
    <DataLoader />
  ) : (
    <section className="properties">
      <div className="container">
        <div className="row">
          {ads?.data && ads?.data.length > 0 ? (
            <>
              {ads?.data?.map((ad, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 p-2">
                  <PropertyCard ad={ad} className="bg_gray" />
                </div>
              ))}
              {ads && ads?.total > 10 && (
                <CustomPagination count={ads?.total} pageSize={10} />
              )}
            </>
          ) : (
            <EmptyData text={t("forRent.noDatafound")} />
          )}
        </div>
      </div>

      <button className="view_map" onClick={() => setViewMap(true)}>
        <div className="icon">
          <img src="/icons/map.svg" alt="map" />
        </div>
        {t("viewOnMap")}
      </button>
    </section>
  );
}
