import { Title, useMantineTheme } from '@mantine/core';

interface TenantLogoProps {
  title: string;
  width?: number;
  height?: number;
}

export const TenantLogo = ({ title }: TenantLogoProps) => {
//   const { colorScheme } = useMantineColorScheme();
//   const dark = colorScheme === 'dark';

  // Choose color based on dark/light mode
//   const logoColor = dark ? '#fff' : '#000';
  const theme = useMantineTheme();

  const primaryColor = theme.colors[theme.primaryColor][5];


  return (
          <Title order={3} style={{color: primaryColor}}>{title}</Title>

    // <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //   <svg
    //     width={width}
    //     height={height}
    //     fill={primaryColor}
    //     viewBox="0 0 200 50"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <text
    //       x="0"
    //       y="35"
    //       fontSize="18"
    //       fontFamily="Arial, sans-serif"
    //     >
    //         {title}
    //     </text>
    //   </svg>
    // </div>
  );
};
