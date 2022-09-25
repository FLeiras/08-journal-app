export const fileUpload = async (file) => {
  if (!file) throw new Error('No hay Archivo a subir');
  const cloudURL = 'https://api.cloudinary.com/v1_1/darinhlfi/upload';
  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudURL, {
      method: 'POST',
      body: formData,
    });

    console.log(resp);
    if (!resp.ok) throw new Error('No se pudo cargar la imagen');

    const cloudResponse = await resp.json();
    console.log({ cloudResponse });

    return cloudResponse.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
