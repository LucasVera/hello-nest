import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cat } from 'src/catss/interfactes/cat.interface';
import * as moment from 'moment';

@Injectable()
export class CatsService {
  private cats: Cat[] = []

  create(cat: Cat): Cat {
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: string): Cat {
    return this.cats.find(c => c.id === id);
  }

  findWithError(): Cat {
    const cat = this.cats[5]
    if (!cat) {
      throw new HttpException({
        position: 5,
        id: 'some_id_here',
        happenedAt: moment().toString(),
        message: 'Cat not found in that position'
      }, HttpStatus.NOT_FOUND);
    }
    return cat
  }

  updateOne(cat: Cat): Cat {
    let dbCat: Cat;
    this.cats = this.cats.map(c => {
      if (c.id === cat.id) {
        dbCat = {
          ...c,
          ...cat
        };

        return dbCat;
      }

      return c;
    })

    return dbCat;
  }

  changeAge(id: string, age: number): Cat {
    let dbCat: Cat;
    this.cats = this.cats.map(c => {
      if (c.id === id) {
        dbCat = {
          ...c, age
        };
        return dbCat;
      }
      return c;
    });

    return dbCat;
  }

  deleteOne(id: string): string {
    this.cats = this.cats.filter(c => c.id !== id);
    return id;
  }
}
