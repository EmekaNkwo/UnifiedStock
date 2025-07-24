import { useParams } from "next/navigation";

const useGetTenant = () => {
  const query = useParams();
  const tenant = query.tenant;

  return { tenant };
};

export default useGetTenant;
