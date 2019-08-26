import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform, ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Usuario } from 'src/app/interfaces/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalFormUsuarioComponent } from '../components/modal-form-usuario/modal-form-usuario.component';

interface Credenciales {
  login: string;
  clave: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //rol_autenticado = new BehaviorSubject(null);
  credenciales = new BehaviorSubject<Credenciales>(null);

  REST_SERVICE_URI = 'http://192.168.43.33:8080/EventsToYou';
  //REST_SERVICE_URI = 'http://localhost:8080/EventsToYou';

  constructor(private storage: Storage,
    private plt: Platform,
    public http: HttpClient,
    private toastController: ToastController,
    private modalController: ModalController) {
    this.plt.ready().then(() => {
      this.getCredenciales();
    });
  }

  login_miembro(login_usuario, clave) {
    this.http.get<Usuario>(this.REST_SERVICE_URI+"/miembros/" + login_usuario,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(login_usuario + ':' + clave)
        })
      }).subscribe(
        async (usuario) => {
          const toast = await this.toastController.create({
            message: "Hola de nuevo " + usuario.nombre,
            duration: 2000
          });
          toast.present();

          var credenciales = {
            login: login_usuario,
            clave: clave,
            rol: "Miembro"
          };

          //Si recibimos nuestro usuario, podemos dar como verificadas las credenciales
          this.storage.set("credenciales", credenciales).then(res => {
            this.credenciales.next(credenciales);
            return true;
          });

        },
        async (error) => {
          //Si el servidor devuelve un error de autorización
          if (error.status == 401) {
            const toast = await this.toastController.create({
              message: "El Login y/o la Clave no son correctos",
              duration: 2000
            });
            toast.present();
          };

          console.log(error);
          return false;
        }
      );
  }

  login_organizador(login_usuario, clave) {
    this.http.get<Usuario>(this.REST_SERVICE_URI+"/organizadores/" + login_usuario,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(login_usuario + ':' + clave)
        })
      }).subscribe(
        async (usuario) => {
          const toast = await this.toastController.create({
            message: "Hola de nuevo " + usuario.nombre,
            duration: 2000
          });
          toast.present();

          var credenciales = {
            login: login_usuario,
            clave: clave,
            rol: "Organizador"
          };

          //Si recibimos nuestro usuario, podemos dar como verificadas las credenciales
          this.storage.set("credenciales", credenciales).then(res => {
            this.credenciales.next(credenciales);
            return true;
          });

        },
        async (error) => {
          //Si el servidor devuelve un error de autorización
          if (error.status == 401) {
            const toast = await this.toastController.create({
              message: "El Login y/o la Clave no son correctos",
              duration: 2000
            });
            toast.present();
          };

          console.log(error);
          return false;
        }
      );
  }

  registrar_miembro(usuario: Usuario) {
    this.http.post(this.REST_SERVICE_URI+"/miembros", usuario).subscribe(
      async (data) => {
        const toast = await this.toastController.create({
          message: "Bienvenido " + usuario.nombre,
          duration: 2000
        });
        toast.present();

        var credenciales = {
          login: usuario.login,
          clave: usuario.clave,
          rol: "Miembro"
        };

        console.log("a guardar:", usuario);
        this.storage.set("credenciales", credenciales).then(res => {
          console.log("guardado:", usuario);
          this.credenciales.next(credenciales);
          this.modalController.dismiss();
          return true;
        });

      },
      async (error) => {
        //Si el servidor devuelve un error de conflicto
        if (error.status == 409) {
          const toast = await this.toastController.create({
            message: "El Login ya existe y no está disponible",
            duration: 2000
          });
          toast.present();
        };

        console.log(error);
        return false;
      }
    );
  }

  registrar_organizador(usuario: Usuario) {
    this.http.post(this.REST_SERVICE_URI+"/organizadores", usuario).subscribe(
      async (data) => {
        const toast = await this.toastController.create({
          message: "Bienvenido " + usuario.nombre,
          duration: 2000
        });
        toast.present();

        var credenciales = {
          login: usuario.login,
          clave: usuario.clave,
          rol: "Organizador"
        };

        this.storage.set("credenciales", credenciales).then(res => {
          this.credenciales.next(credenciales);
          this.modalController.dismiss();
          return true;
        });

      },
      async (error) => {
        //Si el servidor devuelve un error de conflicto
        if (error.status == 409) {
          const toast = await this.toastController.create({
            message: "El Login ya existe y no está disponible",
            duration: 2000
          });
          toast.present();
        };

        console.log(error);
        return false;
      }
    );
  }

  logout() {
    return this.storage.remove("credenciales").then(res => {
      this.credenciales.next(null);
    });
  }

  estaAutenticado(rol): boolean {
    return (this.credenciales.value.rol == rol);
  }

  getCredenciales() {
    return this.storage.get("credenciales").then(value => {
      console.log("Ya autenticado: ", value);
      if (value) {
        this.credenciales.next(value);
      }
    });
  }

}