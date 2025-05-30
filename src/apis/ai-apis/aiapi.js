import axios from "axios";
import { BACKEND_HOST } from "../../config";

export async function createCreateNewAccessCode(phoneNumber) {
    const url = `${BACKEND_HOST}/api/CreateNewAccessCode/`;
    const body = {
        phoneNumber: phoneNumber,
    };
    try {
        const response = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error posting sheet:", error);
        throw error;
    }
}

export async function validateAccessCode(phoneNumber, accessCode) {
    const url = `${BACKEND_HOST}/api/ValidateAccessCode/`;
    const body = {
        phoneNumber: phoneNumber,
        accessCode: accessCode,
    };
    try {
        const response = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error posting sheet:", error);
        throw error;
    }
}

export async function createGeneratePostCaptions(socialNetwork, subject, tone) {
    const url = `${BACKEND_HOST}/api/GeneratePostCaptions/`;
    const body = {
        socialNetwork: socialNetwork,
        subject: subject,
        tone: tone,
    };

    try {
        const response = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error posting sheet:", error);
        throw error;
    }
}


export async function getPostIdeas(topic) {
  const url = `${BACKEND_HOST}/api/GetPostIdeas/`;
  const body = {
      topic: topic,
  };

  try {
      const response = await axios.post(url, body, {
          headers: {
              "Content-Type": "application/json",
          },
      });

      return response.data;
  } catch (error) {
      console.error("Error posting sheet:", error);
      throw error;
  }
}




export async function saveGeneratedContent(topic, data, phoneNumber) {
    const url = `${BACKEND_HOST}/api/SaveGeneratedContent/`;
    const body = {
        topic: topic,
        data: data,
        phoneNumber: phoneNumber,
    };

    try {
        const response = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error posting sheet:", error);
        throw error;
    }
}


export async function createCaptionsFromIdeas(idea) {
    const url = `${BACKEND_HOST}/api/CreateCaptionsFromIdeas/`;
    const body = {
        idea: idea,
    };

    try {
        const response = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error posting sheet:", error);
        throw error;
    }
}



export async function getUserGeneratedContents(phoneNumber) {
    const url = `${BACKEND_HOST}/api/GetUserGeneratedContents?phone_number=${phoneNumber}`;
    try {
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching user generated contents:", error);
        throw error;
    }
}


export async function UnSaveContent(captionId) {
  const url = `${BACKEND_HOST}/api/UnSaveContent/`;
  const body = {
      captionId: captionId,
  };

  try {
      const response = await axios.post(url, body, {
          headers: {
              "Content-Type": "application/json",
          },
      });

      return response.data;
  } catch (error) {
      console.error("Error posting sheet:", error);
      throw error;
  }
}