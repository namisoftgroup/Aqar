import { useNavigate } from "react-router";
import { useGetSettings } from "../hooks/settings/useGetSettings";
import DataLoader from "../ui/DataLoader";
import { useEffect } from "react";

export default function PreVeiwPage({ pageType }) {
  const { settings, isLoading } = useGetSettings();

  if (isLoading) return <DataLoader />;
  return <></>;
}
