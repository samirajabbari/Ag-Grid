import Api from "./api";
export const fetchToken = async (data) => {
  const response = await Api.post("/Token", {
    UserName: data.username,
    Password: data.password,
  });
  return response.data.token;
};
export const changePassword = async (data) => {
  const res = await Api.post(
    "/api/v1.0-rc/users/changePassword",

    {
      currentPassword: data.password,
      newPassword: data.confirmPassword,
    }
  );
};
export const getServerList = async ({ queryKey }) => {
  const res = await Api.get("/api/v1.0-rc/servers", {
    params: {
      idArray: `[${queryKey[1]}]`,
    },
  });
  return res.data;
};
export const getTicketReport = async ({ queryKey }) => {
  try {
    const res = await Api.get("/api/v1.0-rc/reports/tickets", {
      params: {
        serverId: queryKey[1]?.serverId,
        startDepartureDate: `${queryKey[1]?.startDate}`,
        endDepartureDate: `${queryKey[1]?.endDate}`,
        companyCodesArray: `[${queryKey[1]?.companies}]`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const insuranceList = async ({ queryKey }) => {
  try {
    const res = await Api.get("api/v1.0-rc/insurances", {
      params: {
        serverId: `${queryKey[1].serverId}`,
        tripTypeCode: `${queryKey[1].tripTypeCode}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const deleteDetailInsurance = async (rateId, id) => {
  try {
    const res = await Api.delete(
      `/api/v1.0-rc/insurances/${id}/rates/${rateId}`
    );
    return res;
  } catch (error) {
    return error;
  }
};
