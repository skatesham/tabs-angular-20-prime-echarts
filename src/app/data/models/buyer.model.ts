export interface Buyer {
  id?: number;
  userId: string; // UUID
  name: string;
  location?: string;
  lastBuy?: Date;
  ranking?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
