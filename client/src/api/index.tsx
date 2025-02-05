const getWeather = async (latitude: string, longitude: string) => {
  try {
    const response = await fetch(
      `/api/index?lat=${latitude}&lon=${longitude}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("error");
  }
};
