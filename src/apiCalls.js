const userId = process.env.REACT_APP_USER_ID;
const productNumber = process.env.REACT_APP_PRODUCT_NUMBER;
const licenseApiKey = process.env.REACT_APP_LICENSES_API_KEY;
const organizationId = process.env.REACT_APP_ORGANIZATION_ID;
const licencesApiUrl = process.env.REACT_APP_LICENSES_API_URL;
const registerUserUrl = process.env.REACT_APP_REGISTER_USER_URL;
const redeemCouponUrl = process.env.REACT_APP_REDEEM_COUPON_URL;
const validateEmailUrl = process.env.REACT_APP_VALIDATE_EMAIL_URL;
const userEmailInfoUrl = process.env.REACT_APP_USER_EMAIL_INFO_URL;
const updateUserUsageUrl = process.env.REACT_APP_UPDATE_USER_USAGE_URL;
const recommendationScaleUrl = process.env.REACT_APP_RECOMMENDATION_SCALE_URL;

// Email global variables
const name = process.env.REACT_APP_EMAIL_NAME;
const fromName = process.env.REACT_APP_EMAIL_FROM_NAME;
const fromEmail = process.env.REACT_APP_EMAIL_FROM_EMAIL;
const subject = process.env.REACT_APP_EMAIL_SUBJECT;
const sendEmailUrl = process.env.REACT_APP_SEND_EMAIL_URL;

// Get all licenses from the API
export const getLicenses = async () => {
    try {
      const response = await fetch(licencesApiUrl, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + licenseApiKey
        }
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const jsonData = await response.json();
      const sortedData = jsonData.data.sort((a, b) => a.softwarelicense.license_name.localeCompare(b.softwarelicense.license_name));
      return sortedData;
    } catch (error) {
      console.log(error.message);
    }
};

// Validate user email from the API
export const validateEmail = async (email) => {
    try {
      const response = await fetch(validateEmailUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name : "",
          fromName : "",
          fromEmail : "",
          subject : "",
          body : ""
        }),
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log(error.message);
    }
};

// Get user email info from the API
export const getUserEmailInfo = async (email) => {
    try {
      const response = await fetch(userEmailInfoUrl + email, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log(error.message);
    }
};

// Register an user from the API
export const registerUser = async (email) => {
    try {
      const response = await fetch(registerUserUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_number : productNumber,
          email
        }),
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const jsonData = await response.json();
      if (response.status === 201) {
        console.log("User Registered");
      } else {
        console.log(jsonData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
};

// Check compatibility from the API
export const checkCompatibility = async (firstLicenseEventId, secondLicenseEventId) => {
    try {
      const response = await fetch(licencesApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + licenseApiKey
        },
        body: JSON.stringify({
          action_type: "check-compatibility",
          license_event_id_one: firstLicenseEventId,
          license_event_id_two: secondLicenseEventId,
          user_id: userId,                                            
          organization_id: organizationId
        })
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log(error.message);
    }
};

// Update user usage from the API
export const updateUserUsage = async (email, occurrences) => {
    try {
        const response = await fetch(updateUserUsageUrl + email + '&occurrences=' +  occurrences, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const jsonData = await response.json();
        console.log(jsonData);
    } catch (error) {
        console.log(error.message);
    }
};

// Send email from the API
export const sendEmail = async (email, emailBody) => {
  try {
    const response = await fetch(sendEmailUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
        fromName,
        fromEmail,
        subject,
        body : emailBody
      }),
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error.message);
  }
};

// Redeem coupon from the API
export const redeemCoupon = async (email, coupon) => {
    try {
        const response = await fetch(redeemCouponUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                coupon,
                product_number : productNumber
            }),
        });
        if (!response.ok && response.status !== 401) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.log(error.message);
    }
};

 // Scale API Call
export const scaleAPI = async (index) => {
  try {
    const response = await fetch(recommendationScaleUrl + index, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return true;
  } catch (error) {
    console.log(error.message);
  }
};
