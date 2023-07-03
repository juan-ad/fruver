/**
 * Clase que permite almacenar constantes globales
 */
export class GlobalConstants{

    // Variables estáticas que definen un mensaje de error
    public static genericError: string = "Algo salió mal. Por favor intente más tarde";

    public static unauthorized: string = "Error, no se encuentra autorizado";

    // Variables estáticas que definen expresiones regulares
    public static nameRegex:string = "[a-zA-Z0-9 ]*";

    public static numRegex:string = "[0-9]*";

    public static emailRegex:string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"; 

    public static contactNumberRegex:string = "^[e0-9]{10,10}$"; 

    // Variable estática con el título de error
    public static error:string = "error";
}