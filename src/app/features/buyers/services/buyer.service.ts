import { Injectable, inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { DatabaseService, PaginatedResult, PaginationParams } from '../../../core/db/database.service';
import { Buyer } from '../../../data/models/buyer.model';

export interface BuyerFilter {
  name?: string;
  userId?: string;
  location?: string;
  minRanking?: number;
  maxRanking?: number;
}

@Injectable({ providedIn: 'root' })
export class BuyerService {
  private db = inject(DatabaseService);

  // Read (all with pagination and filter)
  findAll(params: PaginationParams, filter?: BuyerFilter): Observable<PaginatedResult<Buyer>> {
    const { page, limit } = params;
    const offset = (page - 1) * limit;
    
    let whereClauses: string[] = [];
    let queryParams: any[] = [];

    if (filter?.name) {
      whereClauses.push('name LIKE ?');
      queryParams.push(`%${filter.name}%`);
    }
    if (filter?.userId) {
      whereClauses.push('user_id = ?');
      queryParams.push(filter.userId);
    }
    if (filter?.location) {
      whereClauses.push('location LIKE ?');
      queryParams.push(`%${filter.location}%`);
    }
    if (filter?.minRanking !== undefined) {
      whereClauses.push('ranking >= ?');
      queryParams.push(filter.minRanking);
    }
    if (filter?.maxRanking !== undefined) {
      whereClauses.push('ranking <= ?');
      queryParams.push(filter.maxRanking);
    }

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
    
    const countSql = `SELECT COUNT(*) as total FROM buyers ${whereClause}`;
    const dataSql = `SELECT * FROM buyers ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`;

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

  // Estatísticas para dashboard
  getStats(): Observable<{ total: number; byRanking: { ranking: number; count: number }[] }> {
    return from(
      Promise.all([
        this.db.query<{ total: number }>('SELECT COUNT(*) as total FROM buyers'),
        this.db.query<{ ranking: number; count: number }>('SELECT ranking, COUNT(*) as count FROM buyers GROUP BY ranking ORDER BY ranking DESC')
      ])
    ).pipe(
      map(([totalResult, rankingResult]) => ({
        total: totalResult[0]?.total || 0,
        byRanking: rankingResult
      }))
    );
  }

  private mapRow(row: any): Buyer {
    return {
      id: row.id,
      userId: row.user_id,
      name: row.name,
      location: row.location,
      lastBuy: row.last_buy ? new Date(row.last_buy) : undefined,
      ranking: row.ranking,
      createdAt: row.created_at ? new Date(row.created_at) : undefined,
      updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
    };
  }
}
