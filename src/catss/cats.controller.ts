import { Controller, Get, Post, Param, Body, Put, Delete, Res, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CreateCatDto } from './DTO/CreateCat.dto';
import { UpdateCatDto } from './DTO/UpdateCat.dto';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { Cat } from 'src/catss/interfactes/cat.interface';
import { v4 as uuid } from 'uuid';
import { ChangeAgeDto } from './DTO/ChangeAge.dto';

@Controller('cats')
export class CatsController {
  // allows for declaration and initialization in the same location
  constructor(private catsService: CatsService) {}

  // Can also use native express interfaces (for example, request/response)
  @Post('/transfer/:id')
  transferCat(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      success: true,
      data: {
        transfered: 'ok'
      }
    });
  }

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return JSON.stringify(this.catsService.findOne(id));
  }

  @Get('withError/:id')
  findWithError(): string {
    const ok = this.catsService.findWithError();
    return JSON.stringify(ok);
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    const {
      name,
      breed,
      age
    } = createCatDto

    return JSON.stringify(this.catsService.create({ name, breed, age, id: uuid() }));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto
  ): string {
    const {
      name,
      breed,
      age,
    } = updateCatDto;
    const cat = this.catsService.updateOne({ id, name, breed, age });
    return JSON.stringify(cat);
  }

  @Put('/change-age/:id')
  changeAge(
    @Param('id') id: string,
    @Body('age', ParseIntPipe) changeAgeDto: ChangeAgeDto
  ): string {
    const { age } = changeAgeDto;
    return JSON.stringify(this.catsService.changeAge(id, age))
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    console.log(`deleting cat with id ${id}`);
    const deletedId = this.catsService.deleteOne(id);
    return deletedId;
  }
}
