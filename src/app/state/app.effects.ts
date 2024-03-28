import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { AppPageActions } from "./app.actions";
import { DarkModeService } from "../services/dark-mode.service";

@Injectable()
export class AppEffects {

    isDarkMode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppPageActions.setDarkMode),
            tap(x => this.darkModeService.isDarkMode = x.darkMode)
        ),
        { dispatch: false } //<-- oh no, don't leave this out!
    );

    constructor(
        private actions$: Actions, 
        private darkModeService: DarkModeService
    ) { }
}