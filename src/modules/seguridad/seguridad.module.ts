import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PermisosModule } from './permisos/permisos.module';

@Module({
  imports: [UsuariosModule, AuthModule, RolesModule, PermisosModule],
})
export class SeguridadModule {}
