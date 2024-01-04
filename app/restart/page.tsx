'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import classes from '../shutdown/shutdown.module.css';

export default function Shutdown() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classes.screenCRT}>
      <div className={classes.shutdownCRT} />
    </div>
  );
}
