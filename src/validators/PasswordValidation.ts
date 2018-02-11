import {AbstractControl} from '@angular/forms';

/**
 * Notre classe de validation pour matcher les mots de passe
 */
export class PasswordValidation {


  static MatchPassword(AC: AbstractControl) {

    let password = AC.get('password').value;
    let confirmPassword = AC.get('confirmPass').value;

    //  On vérifie qu'ils ne sont pas égaux
    if(password != confirmPassword) {
      //  Si c'est le cas, le rapport d'erreur passe à true (il y a des erreurs)
      AC.get('confirmPass').setErrors({
        MatchPassword: true
      });
    } else {
      //  Pas d'erreur, false donc
      return null
    }
  }
}