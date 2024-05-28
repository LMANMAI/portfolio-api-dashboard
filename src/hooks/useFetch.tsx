import { useCallback, useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";

type AllowedMethods = "get" | "post" | "put" | "del";
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

  let cancelToken = useRef(false);

  // Sets default values in the options object
  options = {
    ...options,
    api: options && (options.api || "bff"),
    method: options.method || "get",
    successMessage: options.successMessage || "Success",
  };

  const makeRequest = useCallback(
    async (requestOptions?: Omit<useFetchOptions, "useInitialFetch">) => {
      setIsLoading(true);
      const { method, successMessage } = options;
      let response = undefined;
      let tokenUser = sessionStorage.getItem("userLoginData_TOKENSILENT") || "";
      // Makes the http request
      try {
        const httpMethod = method as AllowedMethods; // Hacemos esto para aclarar que no van a existir valores undefined
        response = await axios[httpMethod](url, {
          ...options,
          ...requestOptions,
          data: requestOptions?.data || options?.data,
          headers: {
            id_channel: "sucursal",
            Token: tokenUser,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        const error = err as AxiosError;
        const errorResponse = err as ErrorType;
        // La siguiente exepcion no deberia mostrar una pantalla de error
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
          }
        }
      }
    },
    []
  );

  useEffect(() => {
    if (!cancelToken.current && options.useInitialFetch) {
      // va a llamar al makeRequest
      makeRequest();
    }
    return () => {
      cancelToken.current = true;
    };

    // eslint-disable-next-line
  }, [url, options.useInitialFetch]);

  return { data, isLoading, errorMessage, makeRequest };
}
