import { Injectable, ConflictException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from './user.entity'
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRespository: Repository<User>,
    private jwtService: JwtService, 
  ) {}

  async register(dto: AuthCredentialsDto): Promise<void> {
    const { username, password } = dto;
    const hashed = await bcrypt.hash(password, 10)
    
    const user = this.userRespository.create({
      username, 
      password: hashed,
    });

    try {
      await this.userRespository.save(user);
    } catch (error) {
      throw new ConflictException('El usuario ya existe')
    }
  }

  async login(dto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = dto;
    
    const user = await this.userRespository.findOneBy({ username })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas') 
    }
    const accessToken = this.jwtService.sign({ username })
    return { accessToken };
}


}