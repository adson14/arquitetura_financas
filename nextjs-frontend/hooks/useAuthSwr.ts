import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { SWRConfiguration } from "swr";
import { http } from "../src/utils/http";
import { getAccessTokenFromCookie } from "../src/utils/cookies";

const fetcher =  (url: string) =>
  http
    .get(url,{
      headers: {
        Authorization: `Bearer ${ getAccessTokenFromCookie()}`
      }
    })
    .then((res: any) => res.data);

export function useAuthSwr(url: string, config?: SWRConfiguration) {
  const { data, error } = useSWR<any, AxiosError>(url, fetcher, config);
  const { push } = useRouter();
console.log('aq')
  useEffect(() => {
    if (error?.response?.status === 401) {
      push("/logout");
    }
    if (error) {
      console.error(error);
    }else{}
  }, [data, error, push]);

  return { data, error };
}