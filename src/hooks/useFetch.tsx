import { useCallback, useEffect, useRef, useState } from "react";
import axios, { AxiosError, Method } from "axios";

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
  const [errorMessage, setErrorMessage] = useState<AxiosError>();

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
      const { method, successMessage } = options;
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
            ...options.headers,
            ...requestOptions?.headers,
          },
        });

        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        const error = err as AxiosError;
        const errorResponse = err as ErrorType;
        if (
          errorResponse.response.data?.errors[0] &&
          errorResponse.response.data.errors[0].message !==
            "Una de las tarifas que intenta modificar ya posee un cambio realizado."
        ) {
          setData(undefined);
          setErrorMessage(error);
          setIsLoading(false);
          if (
            errorResponse.response?.data.errors &&
            errorResponse.response?.data.errors[0]
          ) {
            // Handle specific errors here if needed
          }
        }
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

  return { data, isLoading, errorMessage, makeRequest };
}
