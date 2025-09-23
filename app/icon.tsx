// Never use @iconify/react inside this file.
import { ImageResponse } from 'next/og';
import { APP_ICON_URL, BRAND_YELLOW } from '@/app/theme';

export const size = {
  width: 64,
  height: 64,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: BRAND_YELLOW,
          borderRadius: 16,
        }}
      >
        <img
          src={APP_ICON_URL}
          style={{
            width: '70%',
            height: '70%',
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      ...size, 
    }
  );
}