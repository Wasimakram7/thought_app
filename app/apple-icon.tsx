// Never use @iconify/react inside this file.
import { ImageResponse } from 'next/og';
import { APP_ICON_URL, BRAND_YELLOW } from '@/app/theme';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
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
          borderRadius: 32,
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