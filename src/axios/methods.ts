import { AxiosResponse } from "axios";
import axiosInstance from "./axiosConfig";

export const getData = async <T>(
  endPoint: string,
  params?: Record<string, any>
): Promise<T> => {
  try {

    const response: AxiosResponse<T> = await axiosInstance.get(endPoint, {
      params, 
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
