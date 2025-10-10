export interface User {
  id?: string; // UUID
  nome: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  profileImg?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
