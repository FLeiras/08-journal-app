import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers';
/* import { fileUpload } from '../../helpers/fileUpload'; */

cloudinary.config({
  cloud_name: 'darinhlfi',
  api_key: '365455945647213',
  api_secret: 'x4GHPIgh0HMv6hTY4nyQV8jpc_M',
  secure: true,
});

describe('Pruebas en fileUpload', () => {
  test('Debe subir el archivo a Cloudinary', async () => {
    const imgURL =
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
    const resp = await fetch(imgURL);
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');

    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    //console.log(url);
    const segments = url.split('/');

    const imageId = segments[segments.length - 1].replace('.png', '');

    await cloudinary.api.delete_resources(['journal/' + imageId]);
  });

  test('Debe retornar null', async () => {
    const file = new File([], 'foto.jpg');

    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
