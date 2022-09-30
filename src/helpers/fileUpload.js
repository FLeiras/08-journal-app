export const fileUpload = async (file) => {
  //if (!file) throw new Error('No hay Archivo a subir');

  const cloudURL = 'https://api.cloudinary.com/v1_1/darinhlfi/upload';
  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudURL, {
      method: 'POST',
      body: formData,
    });

    if (resp.ok) {
      const cloudResponse = await resp.json();
      return cloudResponse.secure_url;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
