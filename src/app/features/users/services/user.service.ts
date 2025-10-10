import { Injectable, inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { DatabaseService, PaginatedResult, PaginationParams } from '../../../core/db/database.service';
import { User } from '../../../data/models/user.model';

export interface UserFilter {
  nome?: string;
  username?: string;
  email?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private db = inject(DatabaseService);

  // Create
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Observable<User> {
    const id = crypto.randomUUID();
    const sql = `
      INSERT INTO users (id, nome, username, password, phone, email, profile_img)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    return from(
      this.db.run(sql, [id, user.nome, user.username, user.password, user.phone, user.email, user.profileImg || null])
    ).pipe(map(() => ({ ...user, id } as User)));
  }

  // Read (single)
  findById(id: string): Observable<User | null> {
    const sql = 'SELECT * FROM users WHERE id = ?';
    return from(this.db.query<any>(sql, [id])).pipe(
      map(rows => rows.length > 0 ? this.mapRow(rows[0]) : null)
    );
  }

  // Read (all with pagination and filter)
  findAll(params: PaginationParams, filter?: UserFilter): Observable<PaginatedResult<User>> {
    const { page, limit } = params;
    const offset = (page - 1) * limit;
    
    let whereClauses: string[] = [];
    let queryParams: any[] = [];

    if (filter?.nome) {
      whereClauses.push('nome LIKE ?');
      queryParams.push(`%${filter.nome}%`);
    }
    if (filter?.username) {
      whereClauses.push('username LIKE ?');
      queryParams.push(`%${filter.username}%`);
    }
    if (filter?.email) {
      whereClauses.push('email LIKE ?');
      queryParams.push(`%${filter.email}%`);
    }

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
    
    const countSql = `SELECT COUNT(*) as total FROM users ${whereClause}`;
    const dataSql = `SELECT * FROM users ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`;

    return from(
      Promise.all([
        this.db.query<any>(countSql, queryParams),
        this.db.query<any>(dataSql, [...queryParams, limit, offset])
      ])
    ).pipe(
      map(([countResult, dataResult]) => {
        const total = countResult[0]?.total || 0;
        return {
          data: dataResult.map((row: any) => this.mapRow(row)),
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        };
      })
    );
  }

  private mapRow(row: any): User {
    return {
      id: row.id,
      nome: row.nome,
      username: row.username,
      password: row.password,
      phone: row.phone,
      email: row.email,
      profileImg: row.profile_img,
      createdAt: row.created_at ? new Date(row.created_at) : undefined,
      updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
    };
  }
}
