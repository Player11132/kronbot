'use server';

import { db } from '@/db/db';
import { members } from '@/db/schema/members';
import { eq } from 'drizzle-orm';

export type Member = typeof members.$inferSelect;

export async function getMemberById(id: number): Promise<Member> {
  const memebrData = await db.select().from(members).where(eq(members.id, id));
  return memebrData[0];
}

export async function getMembers(): Promise<Array<Member>> {
  const membersData = await db.select().from(members);

  return membersData;
}

export async function editMember(member: Member) {
  await db
    .update(members)
    .set({
      name: member.name,
      role: member.role as
        | 'Mechanic'
        | '3D Modeler'
        | 'Programmer'
        | 'Public Relations',
      cathegory: member.cathegory as 'Mentor' | 'Member' | 'Volunteer',
      photoURL: member.photoURL,
      desc: member.desc
    })
    .where(eq(members.id, member.id));
}

export async function addMember(cathegory: string) {
  await db.insert(members).values({
    name: 'New ' + cathegory,
    role: 'Mechanic',
    cathegory: cathegory as 'Mentor' | 'Member' | 'Volunteer',
    photoURL: '/logo.svg',
    desc: ''
  });
}

export async function removeMember(id: number) {
  await db.delete(members).where(eq(members.id, id));
}
