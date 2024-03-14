import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormDto } from './dto/form.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiHeader, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('forms')
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  @ApiHeader({
    name: 'X-Real-IP', //
    required: false,
  })
  async create(@Body() createFormDto: FormDto, @Headers('X-Real-IP') ipAddress?: string) {
    return new FormDto(await this.formsService.create({ ...createFormDto, ipAddress }));
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiSecurity('API_KEY')
  findAll() {
    return this.formsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: FormDto) {
    return this.formsService.update(id, updateFormDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiSecurity('API_KEY')
  remove(@Param('id') id: string) {
    return this.formsService.remove(id);
  }
}
