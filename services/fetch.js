// fetch.js
const BASE_URL = "https://apiesup.pappplanner.com";
// const accessToken = getcookie("accessToken");

// console.log("accessToken", accessToken);
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}
const accessToken = getCookie("accessToken");
// window.location.href = "/login";
let defaultHeaders = {
  "Content-Type": "application/json",
};
let defaultHeadersfile = {};
if (accessToken) {
  defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    // คุณสามารถเพิ่ม header อื่น ๆ ได้ที่นี่ เช่น Authorization token
  };
  defaultHeadersfile = {
    Authorization: `Bearer ${accessToken}`,
    // คุณสามารถเพิ่ม header อื่น ๆ ได้ที่นี่ เช่น Authorization token
  };
}

// ฟังก์ชันช่วยสำหรับทำ GET request
export const fetchGet = async (endpoint, headers = {}) => {
  try {
    console.log("fetchGet", `${endpoint}`);

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        ...defaultHeaders,
        ...headers, // รวมกับ headers ที่ส่งเข้ามา
      },
    });

    if (!response.ok) {
      throw new Error(`GET request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch GET error:", error);
    throw error;
  }
};

// ฟังก์ชันช่วยสำหรับทำ POST request
export const fetchPost = async (endpoint, data, headers = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        ...defaultHeaders,
        ...headers, // รวมกับ headers ที่ส่งเข้ามา
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // ลองดึงข้อมูลข้อผิดพลาดจาก response
      const errorData = await response.json().catch(() => ({})); // กรณีที่ JSON parsing ล้มเหลว
      const error = new Error(
        `POST request failed with status ${response.status}`
      );
      error.response = errorData;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch POST error:", error);
    throw error; // ขว้างข้อผิดพลาดใหม่เพื่อให้ผู้เรียกใช้จัดการ
  }
};

export const fetchFile = async (endpoint, formData, headers = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        ...defaultHeadersfile,
        ...headers, // รวมกับ headers ที่ส่งเข้ามา
      },
      body: formData, // ส่ง FormData โดยตรง
    });

    if (!response.ok) {
      throw new Error(`File upload failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch file error:", error);
    throw error;
  }
};
// ฟังก์ชันช่วยสำหรับทำ DELETE request
export const fetchDelete = async (endpoint, headers = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        ...defaultHeaders,
        ...headers, // รวมกับ headers ที่ส่งเข้ามา
      },
    });

    if (!response.ok) {
      // ลองดึงข้อมูลข้อผิดพลาดจาก response
      const errorData = await response.json().catch(() => ({})); // กรณีที่ JSON parsing ล้มเหลว
      const error = new Error(
        `DELETE request failed with status ${response.status}`
      );
      error.response = errorData;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch DELETE error:", error);
    throw error; // ขว้างข้อผิดพลาดใหม่เพื่อให้ผู้เรียกใช้จัดการ
  }
};
