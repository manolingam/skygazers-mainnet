const Copyicon = ({
  width = '17',
  height = '18',
  fill = 'white',
  opacity = '1'
}) => (
  <svg
    viewBox='0 0 17 18'
    width={width}
    height={height}
    fill={fill}
    opacity={opacity}
  >
    <path
      d='M12.6 18H0V3.51001H12.6V18ZM1.8 16.2H10.8V5.31001H1.8V16.2Z'
      fill={fill}
    />
    <path
      d='M16.56 14.49H13.77V12.69H14.76V1.8H5.75996V2.52H3.95996V0H16.56V14.49Z'
      fill={fill}
    />
  </svg>
);

const Arrowprev = ({
  width = '10px',
  height = '10px',
  fill = 'black',
  opacity = '1'
}) => (
  <svg
    viewBox='0 0 10 10'
    width={width}
    height={height}
    fill={fill}
    opacity={opacity}
  >
    <path fill={fill} d='M2.2,5l5.1-5l1,1L4.2,5l4.2,4l-1,1L2.2,5z' />
  </svg>
);

const Arrownext = ({
  width = '10px',
  height = '10px',
  fill = 'black',
  opacity = '1'
}) => (
  <svg
    viewBox='0 0 10 10'
    width={width}
    height={height}
    fill={fill}
    opacity={opacity}
  >
    <path fill={fill} d='M3.2,10l-1-1l4.2-4L2.3,1l1-1l5.1,5L3.2,10z' />
  </svg>
);

const ArrowLeftNav = ({
  width = '51',
  height = '16',
  fill = '#59342B',
  opacity = '1'
}) => (
  <svg
    viewBox='0 0 51 16'
    width={width}
    height={height}
    fill={fill}
    opacity={opacity}
  >
    <path
      d='M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM51 7L1 7V9L51 9V7Z'
      fill={fill}
    />
  </svg>
);

const Vmark = ({
  width = '29',
  height = '23',
  fill = '#F9548E',
  opacity = '1'
}) => (
  <svg
    viewBox='0 0 29 23'
    width={width}
    height={height}
    fill={fill}
    opacity={opacity}
  >
    <path
      d='M11.199 22.2308L0.769226 11.5029L4.13885 8.03691L11.199 15.2989L25.3996 0.692383L28.7692 4.15834L11.199 22.2308Z'
      fill={fill}
    />
  </svg>
);

const Xmark = ({
  width = '22',
  height = '21',
  fill = '#59342B',
  opacity = '1'
}) => (
  <svg
    viewBox='0 0 22 21'
    width={width}
    height={height}
    fill={fill}
    opacity={opacity}
  >
    <line
      x1='19.2929'
      y1='19.7071'
      x2='0.908117'
      y2='1.32233'
      stroke={fill}
      strokeWidth='2'
    />
    <line
      x1='2.29289'
      y1='19.6777'
      x2='20.6777'
      y2='1.29288'
      stroke={fill}
      strokeWidth='2'
    />
  </svg>
);

export default { Copyicon, Arrownext, Arrowprev, Vmark, ArrowLeftNav };
