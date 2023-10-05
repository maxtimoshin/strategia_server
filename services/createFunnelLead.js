import fetch from "node-fetch";
import { getCurrentDateAndTime } from "./getCurrentDataAndTime.js";
import { generateId } from "./generateId.js";

const token = process.env.TOKEN;
const url = process.env.URL;

export const createFunnelLead = ({
  company = "",
  name,
  jobTitle = "",
  phone,
  email,
  option = "",
  telegramId = 1,
  funnelId,
}) => {
  let requestBody = {
    source_id: 1,
    manager_comment: `
    Company: ${company}
Job title: ${jobTitle}
Service:  ${option}
    `,
    manager_id: 1,
    pipeline_id: funnelId,
    contact: {
      full_name: name,
      email: email,
      phone: phone,
      client_id: null,
    },
  };

  fetch(`${url}/pipelines/cards`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        // If the response status is not okay, reject the promise with the response status and status text
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
        });
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data here
      console.log("Response:", data);
    })
    .catch((error) => {
      // Handle errors here
      if (error.status && error.statusText) {
        // If the error object has status and statusText properties, it's a network error
        console.error(`Network error: ${error.status} - ${error.statusText}`);
      } else {
        // If it doesn't have those properties, it's some other type of error
        console.error("Error:", error);
      }
    });
};
