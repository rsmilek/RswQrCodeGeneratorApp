import { Injectable } from "@angular/core";
import { concatMap, map, tap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppPageActions, ApiActions } from "./app.actions";
import { DarkModeService } from "../services/dark-mode.service";
import { QrCodeGeneratorApiService } from "../services/qr-code-generator-api.service";
import { ImageService } from "../services/image.service";

@Injectable()
export class AppEffects {

    isDarkMode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppPageActions.setDarkMode),
            tap(x => this.darkModeService.isDarkMode = x.isDarkMode)
        ),
        { dispatch: false } //<-- Oh no, don't leave this out! Otherwise app frozen...
    );

    downloadQrCodeBlob$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AppPageActions.downloadQRCodeBlobBegin),
            // Creates QR code download link and trigger a click event
            tap(({ blob, fileName, element }) => 
                this.imageService.downloadBlobFromLink(blob, fileName, element)),
            // Simulation of QR code downloadig progress
            concatMap(({ period }) => 
                this.imageService.delay(period).pipe(
                    map(() => AppPageActions.downloadQRCodeBlobEnd())
                )
            )
        )
    );

    urlQrCodeBlob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ApiActions.generateUrlQRCodeBlob),
            concatMap(({ urlDto }) =>
                this.apiService.postQrCodeUrl(urlDto).pipe(
                    map((qrCodeBlob) => ApiActions.qRCodeBlobGenerationSuccess({ qrCodeBlob }))
                )
            )
        )
    );

    qrCodeData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ApiActions.qRCodeBlobGenerationSuccess),
            concatMap(({ qrCodeBlob }) =>
                this.imageService.blobToData(qrCodeBlob).pipe(
                    map((qrCodeData) => AppPageActions.qRCodeBlobToData({ qrCodeData }))
                )
            )
        )
    );

    constructor(
        private actions$: Actions, 
        private darkModeService: DarkModeService,
        private apiService: QrCodeGeneratorApiService,
        private imageService: ImageService
    ) { }
}