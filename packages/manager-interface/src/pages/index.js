import dynamic from 'next/dynamic';

export default dynamic(import('../legacy/index'), {
  ssr: false,
});
