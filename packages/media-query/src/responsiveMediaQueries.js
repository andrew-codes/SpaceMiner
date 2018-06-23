import { css } from 'emotion';

export default function createResponsiveMQ(namedBreakPoints) {
  return Object.keys(namedBreakPoints).reduce(
    (prev, label) => {
      const prefix = typeof breakpoints[label] === 'string' ? '' : 'min-width:'
      const suffix = typeof breakpoints[label] === 'string' ? '' : 'px'
      prev[label] = cls =>
        css`
          @media (${prefix + breakpoints[label] + suffix}) {
            ${cls};
          }
        `
      return prev
    },
    {}
  );
};
