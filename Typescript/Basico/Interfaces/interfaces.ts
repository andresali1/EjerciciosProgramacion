interface IUsuario {
    nombreUsuario: string;
    password: string;
    confirmarPassword?: string;
}

let usuario1: IUsuario = { nombreUsuario: "Juan", password: "1234" };

console.log(usuario1.nombreUsuario);

interface IAbordar {
    abordarTransporte(): void;
}

let avion: IAbordar = {
    abordarTransporte: function () {
        console.log("Abordando");
    }
};

avion.abordarTransporte();