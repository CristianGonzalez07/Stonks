import { styled } from '@mui/system';
import { ReactNode } from 'react';
import waveSvg from '../assets/wave.svg';

const Container = styled('div')({
  height: '100vh',
  overflow:'hidden'
});

const BackgroundContainer = styled('div')({
  height: '40%',
});

const SvgContainer = styled('div')({
  height: '60%',
  background: `url(${waveSvg}) no-repeat center/cover`,
});

const Wave = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <BackgroundContainer>{children}</BackgroundContainer>
      <SvgContainer />
    </Container>
  );
};

export default Wave;
