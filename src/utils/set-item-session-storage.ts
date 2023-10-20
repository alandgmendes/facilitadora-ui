export const updateSessionStorageItem =(name, data)=> {
  // Get existing data from session storage
  const existingData = JSON.parse(sessionStorage.getItem(name)) || {};

  // Merge existing data with new data
  const newData = { ...existingData, ...data };

  // Save the updated data to session storage
  sessionStorage.setItem(name, JSON.stringify(newData));
}
