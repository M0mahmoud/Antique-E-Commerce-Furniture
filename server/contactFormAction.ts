"use server";
export async function contactFormAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyfA48CCo70BuMD3DYGQ_apBGKFuxFzbPG4mQFSuPJOkAIProck3zM0SXqHXMFS_nvT/exec",
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    return {
      message: data || "Form submitted successfully",
      success: true,
    };
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      message: "An error occurred while submitting the form",
      success: false,
    };
  }
}

type FormState = {
  message?: string;
  success?: boolean;
};
