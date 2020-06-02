import axios from "axios";

const url = "https://api.covid19api.com";

export const getSummaryData = async () => {
  let urlSummary = url + "/summary";
  try {
    const { data } = await axios.get(urlSummary);
    return data;
  } catch (error) {
    return error;
  }
};

export const getDailyData = async () => {
  let urlSummary = url + "/all";
  try {
    const { data } = await axios.get(urlSummary);
    return data;
  } catch (error) {
    return error;
  }
};

export const getDayOneCountry = async () => {
  let urlSummary = url + "/dayone/country/venezuela";
  try {
    const { data } = await axios.get(urlSummary);
    return data;
  } catch (error) {
    return error;
  }
};

export const getDayOneSpecific = async (pais) => {
  let urlSummary = url + `/dayone/country/${pais}`;
  try {
    const { data } = await axios.get(urlSummary);
    return data;
  } catch (error) {
    return error;
  }
};
