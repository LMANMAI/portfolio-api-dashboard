import { useCallback, useEffect, useRef, useState } from "react";
import axios, { AxiosError, Method } from "axios";
import { ToDo } from "../interfaces";

type AllowedMethods = "get" | "post" | "put" | "delete";
interface useFetchOptions {
  useInitialFetch?: boolean;
  method?: AllowedMethods;
  headers?: object;
  params?: object;
  api?: string;
  data?: any;
  body?: any;
  successMessage?: string;
}

interface ErrorType {
  response: any;
}

export default function useFetch<T>(
  url: string,
  options: useFetchOptions = {}
) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(
    options.useInitialFetch ?? false
  );
  const [errorMessage, setErrorMessage] = useState<ToDo>({
    msg: "",
    status: 0,
  });

  const cancelToken = useRef(false);

  // Sets default values in the options object
  options = {
    ...options,
    method: options.method || "get",
    successMessage: options.successMessage || "Success",
  };

  const makeRequest = useCallback(
    async (requestOptions?: Omit<useFetchOptions, "useInitialFetch">) => {
      setIsLoading(true);
      const { method } = options;
      let response;

      // Mapeo de métodos permitidos a los métodos de Axios
      const axiosMethods: Record<AllowedMethods, Method> = {
        get: "get",
        post: "post",
        put: "put",
        delete: "delete",
      };

      try {
        const httpMethod = axiosMethods[method as AllowedMethods];
        response = await axios.request({
          url: `${import.meta.env.VITE_URL_BACKEND}/${url}`,
          method: httpMethod,
          ...options,
          ...requestOptions,
          data: requestOptions?.data || options?.data,
          headers: {
            id_channel: "sucursal",
            "api-key": import.meta.env.VITE_API_KEY_BE as string,
            ...options.headers,
            ...requestOptions?.headers,
          },
        });

        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        const errorResponse = err as ErrorType;
        setErrorMessage({
          msg: errorResponse.response.data?.message,
          status: errorResponse.response.status,
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    },
    [options, url]
  );

  useEffect(() => {
    if (!cancelToken.current && options.useInitialFetch) {
      makeRequest();
    }
    return () => {
      cancelToken.current = true;
    };
  }, [makeRequest, options.useInitialFetch]);

  return { data, isLoading, errorMessage, makeRequest, setIsLoading };
}
