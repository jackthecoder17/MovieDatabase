// app/api/useRouterParams.js
import { useRouter } from 'next/router';

export default function useRouterParams() {
  const router = useRouter();
  return router.query;
}
