import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { Room, RoommateProfile, VisitBooking } from '../types';
import { INITIAL_ROOMS, INITIAL_ROOMMATES } from '../data/mockData';

const ROOMS_COLLECTION = 'rooms';
const ROOMMATES_COLLECTION = 'roommates';
const BOOKINGS_COLLECTION = 'bookings';

export const roomService = {
  // --- Rooms ---
  async fetchRooms(): Promise<Room[]> {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, ROOMS_COLLECTION), limit(50));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const cloudRooms: Room[] = [];
          snapshot.forEach((doc) => {
            cloudRooms.push(doc.data() as Room);
          });
          // Cache locally
          localStorage.setItem('apnaroom_rooms', JSON.stringify(cloudRooms));
          return cloudRooms;
        }

        // If collection is empty, seed it with INITIAL_ROOMS
        console.log('Seeding initial student rooms into Firestore...');
        for (const room of INITIAL_ROOMS) {
          await setDoc(doc(db, ROOMS_COLLECTION, room.id), room);
        }
        localStorage.setItem('apnaroom_rooms', JSON.stringify(INITIAL_ROOMS));
        return INITIAL_ROOMS;
      } catch (err) {
        console.warn('Firestore fetch failed, falling back to local cache:', err);
      }
    }

    // LocalStorage Fallback
    const saved = localStorage.getItem('apnaroom_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  },

  async addRoom(newRoom: Room): Promise<void> {
    // 1. Save to Firestore if available
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, ROOMS_COLLECTION, newRoom.id), newRoom);
        console.log(`Saved room ${newRoom.id} to Cloud Firestore`);
      } catch (err) {
        console.error('Error saving room to Firestore:', err);
      }
    }

    // 2. Update local storage
    const saved = localStorage.getItem('apnaroom_rooms');
    const list: Room[] = saved ? JSON.parse(saved) : INITIAL_ROOMS;
    const updated = [newRoom, ...list.filter((r) => r.id !== newRoom.id)];
    localStorage.setItem('apnaroom_rooms', JSON.stringify(updated));
  },

  // --- Roommates ---
  async fetchRoommates(): Promise<RoommateProfile[]> {
    if (isFirebaseConfigured && db) {
      try {
        const snapshot = await getDocs(collection(db, ROOMMATES_COLLECTION));
        if (!snapshot.empty) {
          const list: RoommateProfile[] = [];
          snapshot.forEach((d) => list.push(d.data() as RoommateProfile));
          localStorage.setItem('apnaroom_roommates', JSON.stringify(list));
          return list;
        }

        // Seed initial roommates
        for (const mate of INITIAL_ROOMMATES) {
          await setDoc(doc(db, ROOMMATES_COLLECTION, mate.id), mate);
        }
        localStorage.setItem('apnaroom_roommates', JSON.stringify(INITIAL_ROOMMATES));
        return INITIAL_ROOMMATES;
      } catch (err) {
        console.warn('Firestore roommates fetch error:', err);
      }
    }

    const saved = localStorage.getItem('apnaroom_roommates');
    return saved ? JSON.parse(saved) : INITIAL_ROOMMATES;
  },

  async addRoommate(profile: RoommateProfile): Promise<void> {
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, ROOMMATES_COLLECTION, profile.id), profile);
      } catch (err) {
        console.error('Error saving roommate to Firestore:', err);
      }
    }

    const saved = localStorage.getItem('apnaroom_roommates');
    const list: RoommateProfile[] = saved ? JSON.parse(saved) : INITIAL_ROOMMATES;
    const updated = [profile, ...list.filter((m) => m.id !== profile.id)];
    localStorage.setItem('apnaroom_roommates', JSON.stringify(updated));
  },

  // --- Bookings ---
  async saveBooking(booking: VisitBooking): Promise<void> {
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, BOOKINGS_COLLECTION, booking.id), booking);
        console.log(`Saved visit booking ${booking.id} to Cloud Firestore`);
      } catch (err) {
        console.error('Error saving booking to Firestore:', err);
      }
    }

    const saved = localStorage.getItem('apnaroom_bookings');
    const list: VisitBooking[] = saved ? JSON.parse(saved) : [];
    const updated = [booking, ...list];
    localStorage.setItem('apnaroom_bookings', JSON.stringify(updated));
  }
};
