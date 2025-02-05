'use server';

import { initAdmin } from '@/lib/firebase/firebase-admin.config';
import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { redirect } from 'next/navigation';

const expiresIn = 60 * 60 * 24 * 14 * 1000;

export async function authenticate(token: string, onSuccses: string) {
  await initAdmin();

  const sessionCookie = await getAuth().createSessionCookie(token, {
    expiresIn
  });

  (await cookies()).set('session', sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true
  });

  redirect(onSuccses);
}

export async function logout() {
  (await cookies()).delete('session');
  redirect('/admin');
}

export async function getSession(path?: string): Promise<string> {
  await initAdmin();
  if (
    (await cookies()).get('session') &&
    (await getAuth().verifySessionCookie(
      (await cookies()).get('session')?.value!,
      true
    ))
  ) {
    if (path) {
      redirect(path);
    }
    return '200';
  } else {
    redirect('/admin');
    return '401';
  }

  return '0';
}
